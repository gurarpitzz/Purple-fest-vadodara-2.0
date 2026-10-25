import fs from 'node:fs/promises';
import path from 'node:path';
import {
  db,
  EMAILS_DIR,
  listEvents,
  getEventBySlug,
  upsertEvent,
  deleteEvent,
  listCoupons,
  getCoupon,
  upsertCoupon,
  getSettings,
  updateSettings,
  generateNextRegistrationId,
  getRegistration,
  listRegistrations,
  insertRegistration,
  recordPaymentAndIssueQR,
  recordEmailDispatch,
  performCheckIn,
  getAdminStats,
} from './db.mjs';
import { generateRegistrationQR, verifyQrTokenSignature } from './qr.mjs';
import {
  RAZORPAY_KEY_ID,
  createRazorpayOrder,
  verifyRazorpayPayment,
  signTestPayment,
} from './payment-razorpay.mjs';
import {
  buildConfirmationEmailHtml,
  dispatchConfirmationEmail,
} from './email-resend.mjs';

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body, 'utf8'),
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  });
  res.end(body);
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    // Support application/x-www-form-urlencoded fallback
    const params = new URLSearchParams(raw);
    const obj = {};
    for (const [k, v] of params.entries()) {
      obj[k] = v;
    }
    return obj;
  }
}

function enrichRegistrationWithQrDataUri(reg) {
  if (!reg) return null;
  const qr = generateRegistrationQR({
    registration_id: reg.registration_id,
    full_name: reg.full_name,
    event_slug: reg.event_slug,
    amount_inr: reg.amount_inr,
    payment_status: reg.payment_status,
  });
  return {
    ...reg,
    qr_token: reg.qr_token || qr.qr_token,
    qr_svg: reg.qr_svg || qr.qr_svg,
    qr_data_uri: qr.qr_data_uri,
  };
}

// Seed initial showcase registrations if table is empty so /admin, /pass, and /check-in have live records immediately
async function ensureInitialSeedRegistrations() {
  const countRow = db.prepare(`SELECT COUNT(*) AS count FROM registrations`).get();
  if (countRow && Number(countRow.count) > 0) return;

  const samples = [
    {
      registration_id: 'PFV27-1001-DEL',
      event_slug: 'purple-fest-delegate-2027',
      event_title: 'Purple Fest Vadodara 2027 · Full 3-Day Delegate Pass',
      registration_type: 'DELEGATE',
      full_name: 'Dr. Meera Deshmukh',
      email: 'meera.deshmukh@praanganvadodara.org',
      phone: '+91 98250 41207',
      organization: 'Praangan Inclusive Education Foundation',
      city_state: 'Vadodara, Gujarat',
      stall_name: '',
      stall_about: '',
      stall_place: '',
      disability_category: 'Low Vision (RPwD Benchmark Category)',
      accessibility_needs: [
        'Braille & Large-Print Delegate Dossier',
        'ISL Sign Language Stage Interpretation',
        'Accessible EV Buggy Campus Transit',
      ],
      custom_answers: {
        delegate_role: 'DPO / NGO Leadership',
        dietary_preference: 'Standard Gujarati Vegetarian Thali',
        udid_number: 'GJ061021988004512',
      },
      coupon_code: '',
      amount_inr: 2200,
      payment_status: 'PAID',
      razorpay_order_id: 'order_PFV27_seed1001del',
      razorpay_payment_id: 'pay_PFV27_seed1001del',
      checked_in: false,
    },
    {
      registration_id: 'PFV27-1002-STL',
      event_slug: 'assistive-tech-stall-expo',
      event_title: 'Assistive Technology & Inclusive Innovation Stall Expo',
      registration_type: 'STALL',
      full_name: 'Rohan Kulkarni',
      email: 'rohan@bionicmobility.in',
      phone: '+91 98982 77310',
      organization: 'Bionic Mobility & Tactile AI Labs',
      city_state: 'Ahmedabad, Gujarat',
      stall_name: 'TactileVision Smart Cane & Braille Pad Pavilion',
      stall_about: 'Indigenous ultrasonic smart cane and refreshable Braille display demo pod for visually impaired students.',
      stall_place: 'Zone 01 · Stall A-04 (Main Ramped Aisle, Akota Stadium)',
      disability_category: 'Locomotor Disability (Wheelchair User)',
      accessibility_needs: [
        'Lowered 760mm Accessible Demo Counter',
        'Wheelchair Escort & Ramp Bay',
        'On-Call ISL Interpreter for Exhibitor Demos',
      ],
      custom_answers: {
        stall_tier: 'Tier A · Standard 3m×3m Octanorm Pavilion (₹15,000)',
        power_requirement: '15A Heavy Assistive Hardware / Charging Bay',
        exhibitor_badges_count: '2 Exhibitor Badges (Included)',
      },
      coupon_code: '',
      amount_inr: 15000,
      payment_status: 'PAID',
      razorpay_order_id: 'order_PFV27_seed1002stl',
      razorpay_payment_id: 'pay_PFV27_seed1002stl',
      checked_in: true,
    },
  ];

  for (const s of samples) {
    const sig = signTestPayment(s.razorpay_order_id, s.razorpay_payment_id);
    const qr = generateRegistrationQR({
      registration_id: s.registration_id,
      full_name: s.full_name,
      event_slug: s.event_slug,
      amount_inr: s.amount_inr,
      payment_status: s.payment_status,
    });

    insertRegistration({
      ...s,
      razorpay_signature: sig,
      qr_token: qr.qr_token,
      qr_svg: qr.qr_svg,
      checked_in: s.checked_in,
      checked_in_at: s.checked_in ? new Date().toISOString() : null,
      checked_in_gate: s.checked_in ? 'Gate 01 · Main Akota Accessibility Desk' : null,
      checked_in_by: s.checked_in ? 'Desk Officer Kavita Patel' : null,
    });

    recordPaymentAndIssueQR({
      registration_id: s.registration_id,
      payment_status: 'PAID',
      razorpay_order_id: s.razorpay_order_id,
      razorpay_payment_id: s.razorpay_payment_id,
      razorpay_signature: sig,
      amount_paise: s.amount_inr * 100,
      method: 'upi',
      qr_token: qr.qr_token,
      qr_svg: qr.qr_svg,
    });

    const regRow = getRegistration(s.registration_id);
    const emailRes = await dispatchConfirmationEmail(regRow);
    recordEmailDispatch({
      registration_id: s.registration_id,
      recipient_email: s.email,
      subject: emailRes.subject,
      resend_id: emailRes.resend_id,
      status: emailRes.status,
      preview_url: emailRes.preview_url,
    });
  }
}

const seedPromise = ensureInitialSeedRegistrations().catch((err) =>
  console.error('[Seed Registrations Error]:', err)
);

export async function handleApiRequest(req, res, parsedUrl) {
  await seedPromise;

  const pathname = decodeURIComponent(parsedUrl.pathname).replace(/\/+$/, '') || '/';
  const method = req.method.toUpperCase();

  // -------------------------------------------------------------------------
  // 1. /api/events & /api/events/:slug
  // -------------------------------------------------------------------------
  if (pathname === '/api/events') {
    if (method === 'GET') {
      const includeInactive =
        parsedUrl.searchParams.get('all') === '1' ||
        parsedUrl.searchParams.get('include_inactive') === 'true';
      const events = listEvents({ includeInactive });
      const coupons = listCoupons();
      sendJson(res, 200, { ok: true, events, coupons });
      return true;
    }
    if (method === 'POST' || method === 'PUT') {
      const body = await readJsonBody(req);
      const event = upsertEvent(body);
      sendJson(res, 200, { ok: true, event });
      return true;
    }
    if (method === 'DELETE') {
      const body = await readJsonBody(req);
      const target = parsedUrl.searchParams.get('slug') || parsedUrl.searchParams.get('id') || body.slug || body.id;
      const deleted = deleteEvent(target);
      sendJson(res, deleted ? 200 : 404, { ok: deleted, deleted });
      return true;
    }
  }

  if (pathname.startsWith('/api/events/')) {
    const slugOrId = pathname.slice('/api/events/'.length);
    if (method === 'GET') {
      const event = getEventBySlug(slugOrId);
      if (!event) {
        sendJson(res, 404, { ok: false, error: 'Event not found' });
        return true;
      }
      sendJson(res, 200, { ok: true, event });
      return true;
    }
    if (method === 'PUT' || method === 'POST') {
      const body = await readJsonBody(req);
      const event = upsertEvent({ ...body, id: body.id || slugOrId, slug: body.slug || slugOrId });
      sendJson(res, 200, { ok: true, event });
      return true;
    }
    if (method === 'DELETE') {
      const deleted = deleteEvent(slugOrId);
      sendJson(res, deleted ? 200 : 404, { ok: deleted, deleted });
      return true;
    }
  }

  // -------------------------------------------------------------------------
  // 2. /api/coupons & /api/coupons/validate
  // -------------------------------------------------------------------------
  if (pathname === '/api/coupons/validate' && (method === 'POST' || method === 'GET')) {
    const body = method === 'POST' ? await readJsonBody(req) : {};
    const code = parsedUrl.searchParams.get('code') || body.code || '';
    const coupon = getCoupon(code);
    if (!coupon || !coupon.is_active || coupon.used_count >= coupon.max_uses) {
      sendJson(res, 404, {
        ok: false,
        valid: false,
        error: 'Invalid or expired coupon code',
      });
      return true;
    }
    const baseAmount = Number(parsedUrl.searchParams.get('amount_inr') || body.amount_inr || 0);
    const discountAmount = Math.round((baseAmount * coupon.discount_percent) / 100);
    const finalAmount = Math.max(0, baseAmount - discountAmount);
    sendJson(res, 200, {
      ok: true,
      valid: true,
      coupon,
      base_amount_inr: baseAmount,
      discount_amount_inr: discountAmount,
      final_amount_inr: finalAmount,
    });
    return true;
  }

  if (pathname === '/api/coupons') {
    if (method === 'GET') {
      sendJson(res, 200, { ok: true, coupons: listCoupons() });
      return true;
    }
    if (method === 'POST' || method === 'PUT') {
      const body = await readJsonBody(req);
      try {
        const coupon = upsertCoupon(body);
        sendJson(res, 200, { ok: true, coupon, coupons: listCoupons() });
      } catch (err) {
        sendJson(res, 400, { ok: false, error: err.message });
      }
      return true;
    }
  }

  // -------------------------------------------------------------------------
  // 3. /api/registrations/initiate (POST)
  // -------------------------------------------------------------------------
  if (pathname === '/api/registrations/initiate' && method === 'POST') {
    const body = await readJsonBody(req);
    const eventSlug = body.event_slug || 'purple-fest-delegate-2027';
    const event = getEventBySlug(eventSlug) || getEventBySlug('purple-fest-delegate-2027');

    const fullName = String(body.full_name || body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();

    if (!fullName || !email) {
      sendJson(res, 400, {
        ok: false,
        error: 'Full Name and Email Address are required for official accreditation.',
      });
      return true;
    }

    const isStallEvent =
      event.slug === 'assistive-tech-stall-expo' ||
      String(body.registration_type || '').toUpperCase() === 'STALL' ||
      Boolean(body.stall_name);

    const registration_type = isStallEvent ? 'STALL' : body.registration_type || 'DELEGATE';

    // Determine fee before coupon
    let baseFee = Number(event.fee_inr || 0);
    const requestedAmount =
      body.custom_amount_inr !== undefined
        ? Number(body.custom_amount_inr)
        : body.amount_inr !== undefined
        ? Number(body.amount_inr)
        : NaN;

    if (!Number.isNaN(requestedAmount) && requestedAmount >= Number(event.min_fee_inr || 0)) {
      baseFee = requestedAmount;
    }

    // Check custom_answers for stall_tier price override if applicable
    const customAnswers =
      body.custom_answers && typeof body.custom_answers === 'object' ? body.custom_answers : {};
    if (customAnswers.stall_tier && Number.isNaN(requestedAmount)) {
      const tierStr = String(customAnswers.stall_tier);
      if (tierStr.includes('8,500')) baseFee = 8500;
      else if (tierStr.includes('12,000')) baseFee = 12000;
      else if (tierStr.includes('15,000')) baseFee = 15000;
      else if (tierStr.includes('35,000')) baseFee = 35000;
    }

    // Apply coupon if present
    let appliedCouponCode = '';
    let discountPercent = 0;
    if (body.coupon_code) {
      const coupon = getCoupon(body.coupon_code);
      if (coupon && coupon.is_active && coupon.used_count < coupon.max_uses) {
        appliedCouponCode = coupon.code;
        discountPercent = Number(coupon.discount_percent || 0);
        db.prepare(`UPDATE coupons SET used_count = used_count + 1 WHERE code = ?`).run(coupon.code);
      }
    }

    const finalAmountInr = Math.max(0, Math.round((baseFee * (100 - discountPercent)) / 100));
    const registration_id = generateNextRegistrationId();

    const accessibility_needs = Array.isArray(body.accessibility_needs)
      ? body.accessibility_needs
      : typeof body.accessibility_needs === 'string' && body.accessibility_needs.trim()
      ? body.accessibility_needs.split(',').map((s) => s.trim())
      : [];

    // Case A: Fee is 0 (Waived Event or 100% Coupon) -> Instant Confirmed + QR + Resend Email
    if (finalAmountInr === 0) {
      const waivedOrderId = `order_WAIVED_${registration_id.replace(/[^a-zA-Z0-9]/g, '')}`;
      const waivedPaymentId = `pay_WAIVED_${registration_id.replace(/[^a-zA-Z0-9]/g, '')}`;
      const waivedSignature = signTestPayment(waivedOrderId, waivedPaymentId);

      const qr = generateRegistrationQR({
        registration_id,
        full_name: fullName,
        event_slug: event.slug,
        amount_inr: 0,
        payment_status: 'WAIVED',
      });

      insertRegistration({
        registration_id,
        event_slug: event.slug,
        event_title: event.title,
        registration_type,
        full_name: fullName,
        email,
        phone,
        organization: body.organization || '',
        city_state: body.city_state || '',
        stall_name: body.stall_name || '',
        stall_about: body.stall_about || '',
        stall_place: body.stall_place || '',
        disability_category: body.disability_category || 'None / Universal Barrier-Free Access',
        accessibility_needs,
        custom_answers: customAnswers,
        coupon_code: appliedCouponCode,
        amount_inr: 0,
        payment_status: 'WAIVED',
        razorpay_order_id: waivedOrderId,
        razorpay_payment_id: waivedPaymentId,
        razorpay_signature: waivedSignature,
        qr_token: qr.qr_token,
        qr_svg: qr.qr_svg,
      });

      recordPaymentAndIssueQR({
        registration_id,
        payment_status: 'WAIVED',
        razorpay_order_id: waivedOrderId,
        razorpay_payment_id: waivedPaymentId,
        razorpay_signature: waivedSignature,
        amount_paise: 0,
        method: appliedCouponCode ? `coupon_${appliedCouponCode}` : 'statutory_waiver',
        qr_token: qr.qr_token,
        qr_svg: qr.qr_svg,
      });

      const confirmedReg = getRegistration(registration_id);
      const emailResult = await dispatchConfirmationEmail(confirmedReg);
      const finalReg = recordEmailDispatch({
        registration_id,
        recipient_email: email,
        subject: emailResult.subject,
        resend_id: emailResult.resend_id,
        status: emailResult.status,
        preview_url: emailResult.preview_url,
      });

      sendJson(res, 200, {
        ok: true,
        payment_required: false,
        payment_status: 'WAIVED',
        registration: enrichRegistrationWithQrDataUri(finalReg),
        qr_token: qr.qr_token,
        qr_svg: qr.qr_svg,
        qr_data_uri: qr.qr_data_uri,
        email_dispatch: emailResult,
        email_preview_url: finalReg.email_preview_url,
      });
      return true;
    }

    // Case B: Paid Registration -> Create Razorpay Order + Pending SQL Record
    const order = await createRazorpayOrder({
      amount_inr: finalAmountInr,
      registration_id,
      event_slug: event.slug,
      full_name: fullName,
      email,
      phone,
    });

    const pendingReg = insertRegistration({
      registration_id,
      event_slug: event.slug,
      event_title: event.title,
      registration_type,
      full_name: fullName,
      email,
      phone,
      organization: body.organization || '',
      city_state: body.city_state || '',
      stall_name: body.stall_name || '',
      stall_about: body.stall_about || '',
      stall_place: body.stall_place || '',
      disability_category: body.disability_category || 'None / Universal Barrier-Free Access',
      accessibility_needs,
      custom_answers: customAnswers,
      coupon_code: appliedCouponCode,
      amount_inr: finalAmountInr,
      payment_status: 'PENDING',
      razorpay_order_id: order.id,
    });

    sendJson(res, 200, {
      ok: true,
      payment_required: true,
      payment_status: 'PENDING',
      registration: pendingReg,
      razorpay_key_id: RAZORPAY_KEY_ID,
      razorpay_order: order,
      prefill_test_payment: order.prefill_test_payment,
    });
    return true;
  }

  // -------------------------------------------------------------------------
  // 4. /api/registrations/verify-payment (POST)
  // -------------------------------------------------------------------------
  if (pathname === '/api/registrations/verify-payment' && method === 'POST') {
    const body = await readJsonBody(req);
    const regIdentifier = body.registration_id || body.razorpay_order_id;
    const reg = getRegistration(regIdentifier);

    if (!reg) {
      sendJson(res, 404, {
        ok: false,
        verified: false,
        error: 'Registration record not found for payment verification.',
      });
      return true;
    }

    const orderIdToVerify = body.razorpay_order_id || reg.razorpay_order_id;
    const verification = verifyRazorpayPayment({
      razorpay_order_id: orderIdToVerify,
      razorpay_payment_id: body.razorpay_payment_id,
      razorpay_signature: body.razorpay_signature,
    });

    if (!verification.verified) {
      sendJson(res, 400, {
        ok: false,
        verified: false,
        error: verification.error || 'Razorpay signature verification failed.',
      });
      return true;
    }

    const qr = generateRegistrationQR({
      registration_id: reg.registration_id,
      full_name: reg.full_name,
      event_slug: reg.event_slug,
      amount_inr: reg.amount_inr,
      payment_status: 'PAID',
    });

    const paidReg = recordPaymentAndIssueQR({
      registration_id: reg.registration_id,
      payment_status: 'PAID',
      razorpay_order_id: verification.razorpay_order_id,
      razorpay_payment_id: verification.razorpay_payment_id,
      razorpay_signature: verification.razorpay_signature,
      amount_paise: Number(reg.amount_inr || 0) * 100,
      method: body.method || 'razorpay_checkout',
      qr_token: qr.qr_token,
      qr_svg: qr.qr_svg,
    });

    const emailResult = await dispatchConfirmationEmail(paidReg);
    const finalReg = recordEmailDispatch({
      registration_id: reg.registration_id,
      recipient_email: paidReg.email,
      subject: emailResult.subject,
      resend_id: emailResult.resend_id,
      status: emailResult.status,
      preview_url: emailResult.preview_url,
    });

    sendJson(res, 200, {
      ok: true,
      verified: true,
      payment_status: 'PAID',
      registration: enrichRegistrationWithQrDataUri(finalReg),
      qr_token: qr.qr_token,
      qr_svg: qr.qr_svg,
      qr_data_uri: qr.qr_data_uri,
      email_dispatch: emailResult,
      email_preview_url: finalReg.email_preview_url,
    });
    return true;
  }

  // -------------------------------------------------------------------------
  // 5. /api/registrations (GET) & /api/registrations/:id/*
  // -------------------------------------------------------------------------
  if (pathname === '/api/registrations' && method === 'GET') {
    const filters = {
      event_slug: parsedUrl.searchParams.get('event_slug') || '',
      payment_status: parsedUrl.searchParams.get('payment_status') || '',
      checked_in: parsedUrl.searchParams.get('checked_in') ?? '',
      search: parsedUrl.searchParams.get('search') || parsedUrl.searchParams.get('q') || '',
      limit: parsedUrl.searchParams.get('limit') || 200,
    };
    const list = listRegistrations(filters);
    sendJson(res, 200, {
      ok: true,
      count: list.length,
      registrations: list,
    });
    return true;
  }

  // Match /api/registrations/:id/qr.svg
  const qrMatch = pathname.match(/^\/api\/registrations\/([^/]+)\/qr\.svg$/);
  if (qrMatch && method === 'GET') {
    const regId = decodeURIComponent(qrMatch[1]);
    const reg = getRegistration(regId);
    if (!reg) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('QR Not Found');
      return true;
    }
    const qrSvg =
      reg.qr_svg ||
      generateRegistrationQR({
        registration_id: reg.registration_id,
        full_name: reg.full_name,
        event_slug: reg.event_slug,
        amount_inr: reg.amount_inr,
        payment_status: reg.payment_status,
      }).qr_svg;

    const buf = Buffer.from(qrSvg, 'utf8');
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Content-Length': buf.length,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(buf);
    return true;
  }

  // Match /api/registrations/:id/email-preview
  const emailPreviewMatch = pathname.match(/^\/api\/registrations\/([^/]+)\/email-preview$/);
  if (emailPreviewMatch && method === 'GET') {
    const regId = decodeURIComponent(emailPreviewMatch[1]);
    const reg = getRegistration(regId);
    if (!reg) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Registration Email Preview Not Found');
      return true;
    }
    const safeId = String(reg.registration_id).replace(/[^a-zA-Z0-9_-]/g, '_');
    const htmlFilePath = path.join(EMAILS_DIR, `${safeId}.html`);
    let html = '';
    try {
      html = await fs.readFile(htmlFilePath, 'utf8');
    } catch {
      html = buildConfirmationEmailHtml(reg);
      await fs.writeFile(htmlFilePath, html, 'utf8');
    }
    const buf = Buffer.from(html, 'utf8');
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': buf.length,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(buf);
    return true;
  }

  // Match /api/registrations/:id/resend-email
  const resendMatch = pathname.match(/^\/api\/registrations\/([^/]+)\/resend-email$/);
  if (resendMatch && method === 'POST') {
    const regId = decodeURIComponent(resendMatch[1]);
    const reg = getRegistration(regId);
    if (!reg) {
      sendJson(res, 404, { ok: false, error: 'Registration not found' });
      return true;
    }
    const emailResult = await dispatchConfirmationEmail(reg);
    const updatedReg = recordEmailDispatch({
      registration_id: reg.registration_id,
      recipient_email: reg.email,
      subject: emailResult.subject,
      resend_id: emailResult.resend_id,
      status: emailResult.status,
      preview_url: emailResult.preview_url,
    });
    sendJson(res, 200, {
      ok: true,
      registration: enrichRegistrationWithQrDataUri(updatedReg),
      email_dispatch: emailResult,
      email_preview_url: updatedReg.email_preview_url,
    });
    return true;
  }

  // Match /api/registrations/:id
  const singleRegMatch = pathname.match(/^\/api\/registrations\/([^/]+)$/);
  if (singleRegMatch && method === 'GET') {
    const regId = decodeURIComponent(singleRegMatch[1]);
    const reg = getRegistration(regId);
    if (!reg) {
      sendJson(res, 404, { ok: false, error: 'Registration not found in SQL registry.' });
      return true;
    }
    sendJson(res, 200, {
      ok: true,
      registration: enrichRegistrationWithQrDataUri(reg),
    });
    return true;
  }

  // -------------------------------------------------------------------------
  // 6. /api/check-in/verify (POST & GET support)
  // -------------------------------------------------------------------------
  if (pathname === '/api/check-in/verify' && (method === 'POST' || method === 'GET')) {
    const body = method === 'POST' ? await readJsonBody(req) : {};
    const rawQrToken =
      body.qr_token || parsedUrl.searchParams.get('qr_token') || body.token || '';
    const rawRegId =
      body.registration_id || parsedUrl.searchParams.get('registration_id') || body.id || '';
    const gate_name =
      body.gate_name ||
      parsedUrl.searchParams.get('gate_name') ||
      'Gate 01 · Main Akota Accessibility Desk';
    const operator_name =
      body.operator_name ||
      parsedUrl.searchParams.get('operator_name') ||
      'Registration Desk Officer';
    const commit_checkin =
      body.commit_checkin !== undefined
        ? Boolean(body.commit_checkin)
        : parsedUrl.searchParams.get('commit_checkin') !== 'false';

    let tokenSignatureValid = null;
    if (rawQrToken && String(rawQrToken).startsWith('PFV27.')) {
      const sigCheck = verifyQrTokenSignature(rawQrToken);
      tokenSignatureValid = sigCheck.valid;
      if (!sigCheck.valid) {
        sendJson(res, 400, {
          ok: false,
          verified: false,
          status: 'TAMPERED_QR_SIGNATURE',
          message: 'QR Code cryptographic HMAC-SHA256 signature verification failed.',
        });
        return true;
      }
    }

    const result = performCheckIn({
      qr_token: rawQrToken,
      registration_id: rawRegId,
      gate_name,
      operator_name,
      commit_checkin,
    });

    if (result.registration) {
      result.registration = enrichRegistrationWithQrDataUri(result.registration);
    }
    result.signature_verified = tokenSignatureValid;

    sendJson(res, result.ok ? 200 : 404, result);
    return true;
  }

  // -------------------------------------------------------------------------
  // 7. /api/admin/stats (GET)
  // -------------------------------------------------------------------------
  if (pathname === '/api/admin/stats' && method === 'GET') {
    const stats = getAdminStats();
    const events = listEvents({ includeInactive: true });
    const coupons = listCoupons();
    const settings = getSettings();
    sendJson(res, 200, {
      ok: true,
      stats,
      events,
      coupons,
      settings,
    });
    return true;
  }

  // -------------------------------------------------------------------------
  // 8. /api/settings (GET, POST, PUT)
  // -------------------------------------------------------------------------
  if (pathname === '/api/settings') {
    if (method === 'GET') {
      sendJson(res, 200, { ok: true, settings: getSettings() });
      return true;
    }
    if (method === 'POST' || method === 'PUT') {
      const body = await readJsonBody(req);
      const settings = updateSettings(body);
      sendJson(res, 200, { ok: true, settings });
      return true;
    }
  }

  return false;
}
