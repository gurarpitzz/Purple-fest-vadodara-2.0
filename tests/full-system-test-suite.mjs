import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DB_PATH = path.join(ROOT_DIR, 'data', 'purplefest.sqlite');
const SCRATCH_DIR = 'C:/Users/HP/.gemini/antigravity/brain/68ab04fb-91d4-4780-b64c-98ac816aaa92/scratch';
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

fs.mkdirSync(SCRATCH_DIR, { recursive: true });

const results = [];
function recordTest(name, passed, details = '') {
  results.push({ name, passed, details });
  const badge = passed ? 'PASS' : 'FAIL';
  console.log(`[${badge}] ${name}${details ? ' — ' + details : ''}`);
}

async function apiJson(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  return { status: res.status, ok: res.ok, data, text, headers: res.headers };
}

async function captureVerificationScreenshots({ stallRegId, divyangjanRegId, customEventSlug }) {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  if (!fs.existsSync(chromePath)) {
    console.warn('Chrome binary not found at expected path, skipping screenshot capture.');
    return [];
  }

  const debugPort = 9421 + Math.floor(Math.random() * 300);
  const userDataDir = path.join(SCRATCH_DIR, `chrome_qa_suite_${Date.now()}`);
  fs.mkdirSync(userDataDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,980',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    `${BASE_URL}/admin`,
  ]);

  let wsUrl = null;
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 250));
    try {
      const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((r) => r.json());
      const pageTarget = targets.find((t) => t.type === 'page');
      if (pageTarget && pageTarget.webSocketDebuggerUrl) {
        wsUrl = pageTarget.webSocketDebuggerUrl;
        break;
      }
    } catch {}
  }

  if (!wsUrl) {
    proc.kill();
    throw new Error('Failed to connect to headless Chrome DevTools WebSocket');
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((res) => ws.addEventListener('open', res));
  let msgId = 1;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });

  const sendCdp = (method, params = {}) =>
    new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await sendCdp('Page.enable');
  await sendCdp('Network.enable');
  await sendCdp('Runtime.enable');
  await sendCdp('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1050,
    deviceScaleFactor: 1,
    mobile: false,
  });

  const targetsToCapture = [
    {
      name: 'final_admin_cms.png',
      url: `${BASE_URL}/admin`,
      waitMs: 1800,
    },
    {
      name: 'final_events_portal.png',
      url: `${BASE_URL}/events?event=${encodeURIComponent(customEventSlug)}`,
      waitMs: 1800,
    },
    {
      name: 'final_digital_pass.png',
      url: `${BASE_URL}/pass?id=${encodeURIComponent(stallRegId)}`,
      waitMs: 1800,
    },
    {
      name: 'final_checkin_terminal.png',
      url: `${BASE_URL}/check-in?id=${encodeURIComponent(divyangjanRegId)}`,
      waitMs: 2000,
      evalAfterLoad: `(() => {
        const btn = document.querySelector('#verify-form button[type="submit"], button[type="submit"]');
        if (btn) btn.click();
      })()`,
    },
    {
      name: 'final_resend_email_preview.png',
      url: `${BASE_URL}/api/registrations/${encodeURIComponent(stallRegId)}/email-preview`,
      waitMs: 1500,
    },
  ];

  const savedPaths = [];
  for (const item of targetsToCapture) {
    await sendCdp('Page.navigate', { url: item.url });
    await new Promise((r) => setTimeout(r, item.waitMs));
    if (item.evalAfterLoad) {
      await sendCdp('Runtime.evaluate', { expression: item.evalAfterLoad });
      await new Promise((r) => setTimeout(r, 1000));
    }
    const shot = await sendCdp('Page.captureScreenshot', { format: 'png' });
    const outPath = path.join(SCRATCH_DIR, item.name);
    fs.writeFileSync(outPath, Buffer.from(shot.result.data, 'base64'));
    savedPaths.push(outPath);
  }

  ws.close();
  proc.kill();
  return savedPaths;
}

async function runFullSystemTestSuite() {
  console.log('================================================================================');
  console.log(' WARRIORBOT (AGENT 18) — PURPLE FEST VADODARA 2027 FULL-SYSTEM QA TEST SUITE');
  console.log('================================================================================');

  // ---------------------------------------------------------------------------
  // 1. SQLITE (node:sqlite) & CUSTOM EVENTS (GET / POST / PUT /api/events)
  // ---------------------------------------------------------------------------
  const eventsRes = await apiJson('/api/events');
  assert.equal(eventsRes.status, 200, 'GET /api/events should return HTTP 200');
  assert.equal(eventsRes.data.ok, true);
  assert.ok(Array.isArray(eventsRes.data.events) && eventsRes.data.events.length >= 6, 'Should return seeded events');
  recordTest(
    '1A. GET /api/events Catalog & Coupons',
    true,
    `${eventsRes.data.events.length} active events & ${eventsRes.data.coupons.length} coupons loaded`
  );

  const customEventSlug = 'assistive-bionics-masterclass-2027';
  const createEventRes = await apiJson('/api/events', {
    method: 'POST',
    body: JSON.stringify({
      slug: customEventSlug,
      title: 'Assistive Bionics & Tactile AI Masterclass 2027',
      subtitle: 'Hands-On Prosthetics, Smart Cane & Braille Robotics Lab at Akota Stadium',
      category: 'Workshop & Masterclass',
      venue: 'Zone 02 · Inclusive Innovation Lab, Akota Stadium, Vadodara',
      event_date: '22 January 2027',
      event_time: '02:00 PM – 05:30 PM IST',
      fee_inr: 1800,
      min_fee_inr: 1800,
      capacity: 180,
      description:
        'Custom event created via Independent Admin CMS with dynamic registration form fields for assistive robotics innovators and special educators.',
      accessibility_features: [
        'ISL Sign Language Lab Interpreter',
        'Braille Circuit Diagrams & Tactile Schematics',
        'Height-Adjustable Wheelchair Workbenches',
      ],
      custom_fields: [
        {
          id: 'lab_workbench_track',
          label: 'Preferred Assistive Robotics Workbench Track',
          type: 'select',
          required: true,
          options: [
            'Ultrasonic Smart Cane & Haptic Navigation',
            'Refreshable Piezo Braille Matrix Display',
            'Voice-to-ISL Avatar Edge Inference',
          ],
        },
        {
          id: 'hardware_kit_preference',
          label: 'Assistive Hardware Kit & Soldering Support',
          type: 'text',
          required: true,
          placeholder: 'e.g. Pre-Assembled Tactile Breadboard Kit',
        },
      ],
      is_active: true,
    }),
  });
  assert.equal(createEventRes.status, 200);
  assert.equal(createEventRes.data.ok, true);
  assert.equal(createEventRes.data.event.slug, customEventSlug);
  assert.equal(createEventRes.data.event.custom_fields.length, 2);

  // Update the custom event via PUT /api/events/:slug
  const updateEventRes = await apiJson(`/api/events/${customEventSlug}`, {
    method: 'PUT',
    body: JSON.stringify({
      capacity: 240,
      custom_fields: [
        ...createEventRes.data.event.custom_fields,
        {
          id: 'mentor_pairing',
          label: 'GIEN / Praangan Mentor Pairing Preference',
          type: 'select',
          required: false,
          options: ['Clinical Occupational Therapist', 'Embedded Firmware Engineer', 'DPO User-Testing Lead'],
        },
      ],
    }),
  });
  assert.equal(updateEventRes.status, 200);
  assert.equal(updateEventRes.data.event.capacity, 240);
  assert.equal(updateEventRes.data.event.custom_fields.length, 3);

  // Verify directly in purplefest.sqlite via node:sqlite
  const dbCheck = new DatabaseSync(DB_PATH, { readOnly: true });
  const sqlEventRow = dbCheck
    .prepare(`SELECT slug, title, fee_inr, capacity, custom_fields_json FROM events WHERE slug = ?`)
    .get(customEventSlug);
  assert.ok(sqlEventRow, 'Custom event must exist in SQLite events table');
  assert.equal(Number(sqlEventRow.capacity), 240);
  assert.equal(JSON.parse(sqlEventRow.custom_fields_json).length, 3);
  recordTest(
    '1B. POST & PUT /api/events Custom Event + Dynamic Form Fields in SQLite',
    true,
    `Slug "${sqlEventRow.slug}" persisted in purplefest.sqlite with 3 custom fields & capacity=${sqlEventRow.capacity}`
  );

  // ---------------------------------------------------------------------------
  // 2. STALL REGISTRATION (>= ₹8,500) + RAZORPAY ORDER & HMAC VERIFICATION
  // ---------------------------------------------------------------------------
  const stallInitRes = await apiJson('/api/registrations/initiate', {
    method: 'POST',
    body: JSON.stringify({
      event_slug: 'assistive-tech-stall-expo',
      registration_type: 'STALL',
      full_name: 'Vikramadityasinh Parmar',
      email: 'vikram.parmar@navjeevanbionics.in',
      phone: '+91 98251 88900',
      organization: 'Navjeevan Assistive Bionics Pvt. Ltd.',
      city_state: 'Vadodara, Gujarat',
      stall_name: 'Navjeevan Braille & Smart Mobility Pavilion',
      stall_about: 'Indigenous refreshable Braille display, tactile graphics embosser, and terrain wheelchair.',
      stall_place: 'Zone 01 · Stall A-12 (Main Ramped Aisle, Akota Stadium)',
      disability_category: 'Locomotor Disability (RPwD Benchmark Category)',
      accessibility_needs: ['ISL Interpreter', 'Braille Kit', 'Wheelchair Escort'],
      custom_amount_inr: 15000,
      custom_answers: {
        stall_tier: 'Tier A · Standard 3m×3m Octanorm Pavilion (₹15,000)',
        power_requirement: '15A Heavy Assistive Hardware / Charging Bay',
        exhibitor_badges_count: '3 Exhibitor Badges',
      },
    }),
  });

  assert.equal(stallInitRes.status, 200);
  assert.equal(stallInitRes.data.ok, true);
  assert.equal(stallInitRes.data.payment_required, true);
  assert.equal(stallInitRes.data.payment_status, 'PENDING');
  assert.equal(stallInitRes.data.registration.amount_inr, 15000);
  assert.ok(stallInitRes.data.registration.amount_inr >= 8500, 'Stall fee must be >= ₹8,500');
  assert.equal(stallInitRes.data.razorpay_order.amount, 1500000);

  const stallRegId = stallInitRes.data.registration.registration_id;
  const stallTestPayment = stallInitRes.data.prefill_test_payment;
  assert.ok(stallRegId.startsWith('PFV27-'), 'Registration ID must start with PFV27-');

  // Negative Test: Reject invalid/forged Razorpay HMAC signature
  const badSigRes = await apiJson('/api/registrations/verify-payment', {
    method: 'POST',
    body: JSON.stringify({
      registration_id: stallRegId,
      razorpay_order_id: stallTestPayment.razorpay_order_id,
      razorpay_payment_id: stallTestPayment.razorpay_payment_id,
      razorpay_signature: 'deadbeef0000invalidhmacsignature9999',
    }),
  });
  assert.equal(badSigRes.status, 400, 'Forged Razorpay signature must return HTTP 400');
  assert.equal(badSigRes.data.verified, false);
  recordTest(
    '2A. Razorpay Negative Security Check (Forged HMAC Rejected)',
    true,
    `HTTP 400 — ${badSigRes.data.error}`
  );

  // Positive Test: Verify authentic HMAC-SHA256 Razorpay signature
  const stallVerifyRes = await apiJson('/api/registrations/verify-payment', {
    method: 'POST',
    body: JSON.stringify({
      registration_id: stallRegId,
      razorpay_order_id: stallTestPayment.razorpay_order_id,
      razorpay_payment_id: stallTestPayment.razorpay_payment_id,
      razorpay_signature: stallTestPayment.razorpay_signature,
      method: 'upi',
    }),
  });
  assert.equal(stallVerifyRes.status, 200);
  assert.equal(stallVerifyRes.data.ok, true);
  assert.equal(stallVerifyRes.data.verified, true);
  assert.equal(stallVerifyRes.data.payment_status, 'PAID');
  assert.ok(stallVerifyRes.data.qr_token.startsWith(`PFV27.${stallRegId}.`));
  assert.ok(stallVerifyRes.data.qr_svg.includes('<svg'));

  const sqlStallRow = dbCheck
    .prepare(`SELECT registration_id, registration_type, stall_name, amount_inr, payment_status, qr_token, qr_svg FROM registrations WHERE registration_id = ?`)
    .get(stallRegId);
  assert.equal(sqlStallRow.payment_status, 'PAID');
  assert.equal(Number(sqlStallRow.amount_inr), 15000);
  assert.equal(sqlStallRow.stall_name, 'Navjeevan Braille & Smart Mobility Pavilion');
  recordTest(
    '2B. Stall Registration (₹15,000 >= ₹8,500) + Razorpay HMAC Verification + SQLite & QR',
    true,
    `ID=${stallRegId}, Amount=₹${sqlStallRow.amount_inr}, Order=${stallTestPayment.razorpay_order_id}, QR=${sqlStallRow.qr_token}`
  );

  // ---------------------------------------------------------------------------
  // 3. DELEGATE REGISTRATION (₹2,200) + RAZORPAY VERIFICATION
  // ---------------------------------------------------------------------------
  const delInitRes = await apiJson('/api/registrations/initiate', {
    method: 'POST',
    body: JSON.stringify({
      event_slug: 'purple-fest-delegate-2027',
      registration_type: 'DELEGATE',
      full_name: 'Prof. Nandini Bhatt',
      email: 'nandini.bhatt@msuvadodara.ac.in',
      phone: '+91 98240 11223',
      organization: 'Faculty of Social Work, MSU Vadodara',
      city_state: 'Vadodara, Gujarat',
      disability_category: 'Hard of Hearing (RPwD Benchmark Category)',
      accessibility_needs: ['ISL Interpreter', 'Induction Hearing Loop Headset'],
      custom_answers: {
        delegate_role: 'Academic / Special Educator / Researcher',
        dietary_preference: 'Standard Gujarati Vegetarian Thali',
        udid_number: 'GJ061021991008877',
      },
    }),
  });
  assert.equal(delInitRes.status, 200);
  assert.equal(delInitRes.data.registration.amount_inr, 2200);
  const delRegId = delInitRes.data.registration.registration_id;
  const delPayment = delInitRes.data.prefill_test_payment;

  const delVerifyRes = await apiJson('/api/registrations/verify-payment', {
    method: 'POST',
    body: JSON.stringify({
      registration_id: delRegId,
      razorpay_order_id: delPayment.razorpay_order_id,
      razorpay_payment_id: delPayment.razorpay_payment_id,
      razorpay_signature: delPayment.razorpay_signature,
      method: 'card',
    }),
  });
  assert.equal(delVerifyRes.status, 200);
  assert.equal(delVerifyRes.data.payment_status, 'PAID');

  const sqlDelRow = dbCheck
    .prepare(`SELECT registration_id, amount_inr, payment_status, razorpay_payment_id FROM registrations WHERE registration_id = ?`)
    .get(delRegId);
  assert.equal(sqlDelRow.payment_status, 'PAID');
  assert.equal(Number(sqlDelRow.amount_inr), 2200);
  recordTest(
    '3. Delegate Registration (₹2,200) + Razorpay Verification + SQLite Persistence',
    true,
    `ID=${delRegId}, Status=${sqlDelRow.payment_status}, Fee=₹${sqlDelRow.amount_inr}, PaymentID=${sqlDelRow.razorpay_payment_id}`
  );

  // ---------------------------------------------------------------------------
  // 4. DIVYANGJAN ACCESSIBILITY REGISTRATION + RPwD ACCOMMODATIONS + COUPON WAIVER
  // ---------------------------------------------------------------------------
  const couponValRes = await apiJson('/api/coupons/validate', {
    method: 'POST',
    body: JSON.stringify({ code: 'DIVYANGJAN100', amount_inr: 1800 }),
  });
  assert.equal(couponValRes.status, 200);
  assert.equal(couponValRes.data.valid, true);
  assert.equal(couponValRes.data.final_amount_inr, 0);

  const divInitRes = await apiJson('/api/registrations/initiate', {
    method: 'POST',
    body: JSON.stringify({
      event_slug: customEventSlug,
      registration_type: 'DELEGATE',
      full_name: 'Aarav Solanki',
      email: 'aarav.solanki@blindwelfarevadodara.org',
      phone: '+91 97250 66441',
      organization: 'Vadodara Divyangjan Self-Advocates Collective',
      city_state: 'Vadodara, Gujarat',
      disability_category: 'Blindness & Low Vision (RPwD Act 2016 Benchmark Disability)',
      accessibility_needs: ['ISL Interpreter', 'Braille Kit', 'Wheelchair Escort'],
      coupon_code: 'DIVYANGJAN100',
      custom_answers: {
        lab_workbench_track: 'Refreshable Piezo Braille Matrix Display',
        hardware_kit_preference: 'Pre-Assembled Tactile Breadboard Kit',
        mentor_pairing: 'DPO User-Testing Lead',
      },
    }),
  });
  assert.equal(divInitRes.status, 200);
  assert.equal(divInitRes.data.payment_required, false);
  assert.equal(divInitRes.data.payment_status, 'WAIVED');
  const divRegId = divInitRes.data.registration.registration_id;
  const divQrToken = divInitRes.data.qr_token;

  const sqlDivRow = dbCheck
    .prepare(`SELECT registration_id, disability_category, accessibility_needs_json, custom_answers_json, payment_status, amount_inr FROM registrations WHERE registration_id = ?`)
    .get(divRegId);
  const persistedNeeds = JSON.parse(sqlDivRow.accessibility_needs_json);
  assert.ok(persistedNeeds.includes('ISL Interpreter'));
  assert.ok(persistedNeeds.includes('Braille Kit'));
  assert.ok(persistedNeeds.includes('Wheelchair Escort'));
  recordTest(
    '4. Divyangjan Accessibility Registration (RPwD Benchmark + ISL/Braille/Wheelchair + Coupon Waiver)',
    true,
    `ID=${divRegId}, Status=${sqlDivRow.payment_status}, Accommodations=[${persistedNeeds.join(', ')}]`
  );

  // ---------------------------------------------------------------------------
  // 5. CRYPTOGRAPHIC QR CODE & DIGITAL PASS (/pass & /qr.svg)
  // ---------------------------------------------------------------------------
  const qrSvgRes = await fetch(`${BASE_URL}/api/registrations/${encodeURIComponent(stallRegId)}/qr.svg`);
  const qrSvgText = await qrSvgRes.text();
  assert.equal(qrSvgRes.status, 200);
  assert.ok(qrSvgText.includes('<svg') && qrSvgText.includes('viewBox='), 'QR SVG endpoint must return valid SVG');

  const passHtmlRes = await fetch(`${BASE_URL}/pass?id=${encodeURIComponent(stallRegId)}`);
  assert.equal(passHtmlRes.status, 200);
  recordTest(
    '5. Cryptographic QR SVG & Digital Pass Portal (/pass?id=...)',
    true,
    `QR SVG (${qrSvgText.length} bytes) & /pass HTML verified for ${stallRegId}`
  );

  // ---------------------------------------------------------------------------
  // 6. RESEND API EMAIL DISPATCH & LEGIT EDITORIAL HTML EMAIL PREVIEW
  // ---------------------------------------------------------------------------
  const emailPreviewRes = await fetch(`${BASE_URL}/api/registrations/${encodeURIComponent(stallRegId)}/email-preview`);
  const emailHtml = await emailPreviewRes.text();
  assert.equal(emailPreviewRes.status, 200);
  assert.ok(emailHtml.includes('purple_logo_transparent.png'), 'Email must include official Purple Fest logo');
  assert.ok(emailHtml.includes('viksit_bharat_2047_logo.png'), 'Email must include Viksit Bharat @ 2047 logo');
  assert.ok(emailHtml.includes('pf_partner_praangan.png'), 'Email must include Praangan partner logo');
  assert.ok(emailHtml.includes('data:image/svg+xml;base64,'), 'Email must embed scannable QR code data URI');
  assert.ok(emailHtml.includes(stallRegId), 'Email must include unique SQL registration ID');
  assert.ok(emailHtml.includes(stallTestPayment.razorpay_payment_id), 'Email must include Razorpay payment receipt ID');
  assert.ok(emailHtml.includes('ISL Interpreter') && emailHtml.includes('Braille Kit'), 'Email must list confirmed RPwD accommodations');

  const sqlEmailLog = dbCheck
    .prepare(`SELECT registration_id, recipient_email, resend_id, status FROM email_logs WHERE registration_id = ? ORDER BY id DESC LIMIT 1`)
    .get(stallRegId);
  assert.ok(sqlEmailLog, 'Email dispatch must be recorded in SQLite email_logs table');
  recordTest(
    '6. Resend Email Dispatch & Editorial HTML Email Preview (/email-preview)',
    true,
    `ResendID=${sqlEmailLog.resend_id}, Status=${sqlEmailLog.status}, Logos + Embedded QR + Receipt verified`
  );

  // ---------------------------------------------------------------------------
  // 7. DAY-OF-EVENT QR CHECK-IN DESK (POST /api/check-in/verify)
  // ---------------------------------------------------------------------------
  // 7A. First scan of valid paid stall registration -> VERIFIED_ADMITTED (VALID_ADMITTED)
  const firstScanRes = await apiJson('/api/check-in/verify', {
    method: 'POST',
    body: JSON.stringify({
      qr_token: stallVerifyRes.data.qr_token,
      gate_name: 'Gate 01 · Main Akota Accessibility Desk',
      operator_name: 'QA Overseer WarriorBot',
      commit_checkin: true,
    }),
  });
  assert.equal(firstScanRes.status, 200);
  assert.equal(firstScanRes.data.ok, true);
  assert.equal(firstScanRes.data.verified, true);
  assert.equal(firstScanRes.data.already_checked_in, false);
  assert.equal(firstScanRes.data.status, 'VERIFIED_ADMITTED');
  assert.equal(firstScanRes.data.signature_verified, true);
  assert.equal(firstScanRes.data.registration.registration_id, stallRegId);
  assert.ok(firstScanRes.data.registration.accessibility_needs.includes('ISL Interpreter'));
  recordTest(
    '7A. Gate QR Check-In Desk — First Scan (VALID / VERIFIED_ADMITTED)',
    true,
    `${stallRegId} admitted at ${firstScanRes.data.registration.checked_in_gate}`
  );

  // 7B. Second scan of same QR token -> ALREADY_CHECKED_IN
  const secondScanRes = await apiJson('/api/check-in/verify', {
    method: 'POST',
    body: JSON.stringify({
      qr_token: stallVerifyRes.data.qr_token,
      gate_name: 'Gate 01 · Main Akota Accessibility Desk',
      operator_name: 'QA Overseer WarriorBot',
      commit_checkin: true,
    }),
  });
  assert.equal(secondScanRes.status, 200);
  assert.equal(secondScanRes.data.already_checked_in, true);
  assert.equal(secondScanRes.data.status, 'ALREADY_CHECKED_IN');
  recordTest(
    '7B. Gate QR Check-In Desk — Duplicate Scan Prevention (ALREADY_CHECKED_IN)',
    true,
    secondScanRes.data.message
  );

  // 7C. Unpaid registration scan -> PAYMENT_PENDING (UNPAID_REJECTED)
  const unpaidInitRes = await apiJson('/api/registrations/initiate', {
    method: 'POST',
    body: JSON.stringify({
      event_slug: 'purple-fest-delegate-2027',
      full_name: 'Unpaid Test Walkin',
      email: 'walkin.unpaid@example.org',
      phone: '+91 90000 11111',
    }),
  });
  const unpaidRegId = unpaidInitRes.data.registration.registration_id;
  const unpaidScanRes = await apiJson('/api/check-in/verify', {
    method: 'POST',
    body: JSON.stringify({
      registration_id: unpaidRegId,
      gate_name: 'Gate 01 · Main Akota Accessibility Desk',
      operator_name: 'QA Overseer WarriorBot',
    }),
  });
  assert.equal(unpaidScanRes.status, 404);
  assert.equal(unpaidScanRes.data.verified, false);
  assert.equal(unpaidScanRes.data.status, 'PAYMENT_PENDING');

  // 7D. Tampered QR signature -> TAMPERED_QR_SIGNATURE (INVALID_QR)
  const tamperedScanRes = await apiJson('/api/check-in/verify', {
    method: 'POST',
    body: JSON.stringify({
      qr_token: `PFV27.${stallRegId}.FORGEDBADHMAC999`,
      gate_name: 'Gate 01 · Main Akota Accessibility Desk',
    }),
  });
  assert.equal(tamperedScanRes.status, 400);
  assert.equal(tamperedScanRes.data.verified, false);
  assert.equal(tamperedScanRes.data.status, 'TAMPERED_QR_SIGNATURE');
  recordTest(
    '7C/7D. Gate QR Check-In Desk — Unpaid & Forged Token Rejection',
    true,
    `Unpaid=${unpaidScanRes.data.status}, Tampered=${tamperedScanRes.data.status}`
  );

  // ---------------------------------------------------------------------------
  // 8. INDEPENDENT ADMIN CMS (/admin, /api/admin/stats, /api/settings)
  // ---------------------------------------------------------------------------
  const statsRes = await apiJson('/api/admin/stats');
  assert.equal(statsRes.status, 200);
  assert.equal(statsRes.data.ok, true);
  assert.ok(statsRes.data.stats.total_registrations >= 5);
  assert.ok(statsRes.data.stats.total_revenue_inr >= 34400);
  assert.ok(statsRes.data.stats.stalls_booked >= 2);

  const settingsUpdateRes = await apiJson('/api/settings', {
    method: 'POST',
    body: JSON.stringify({
      hospitality_note:
        'Complimentary Morning/Evening Tea & Accredited Lunch Coupons + Accessible EV Shuttle included for all registered delegates and stall exhibitors.',
    }),
  });
  assert.equal(settingsUpdateRes.status, 200);
  assert.equal(settingsUpdateRes.data.ok, true);

  const adminHtmlRes = await fetch(`${BASE_URL}/admin`);
  const adminHtml = await adminHtmlRes.text();
  assert.equal(adminHtmlRes.status, 200);
  assert.ok(adminHtml.includes('Secretariat CMS') && adminHtml.includes('admin-event-form'));
  recordTest(
    '8. Independent Admin CMS (/admin, /api/admin/stats, /api/settings)',
    true,
    `TotalRegs=${statsRes.data.stats.total_registrations}, Revenue=₹${statsRes.data.stats.total_revenue_inr}, Stalls=${statsRes.data.stats.stalls_booked}`
  );

  dbCheck.close();

  // ---------------------------------------------------------------------------
  // 9. CAPTURE VERIFICATION SCREENSHOTS IN SCRATCH DIRECTORY
  // ---------------------------------------------------------------------------
  console.log('\nCapturing headless Chrome verification screenshots...');
  const screenshots = await captureVerificationScreenshots({
    stallRegId,
    divyangjanRegId: divRegId,
    customEventSlug,
  });
  for (const s of screenshots) {
    const stat = fs.statSync(s);
    assert.ok(stat.size > 10000, `Screenshot ${path.basename(s)} should be non-empty`);
  }
  recordTest(
    '9. Visual Verification Screenshots Captured',
    true,
    screenshots.map((p) => path.basename(p)).join(', ')
  );

  console.log('\n================================================================================');
  console.log(` ALL ${results.length}/${results.length} END-TO-END QA CHECKS PASSED ZERO-ERROR VERIFICATION!`);
  console.log('================================================================================');
}

runFullSystemTestSuite().catch((err) => {
  console.error('FULL-SYSTEM QA SUITE FAILED:', err);
  process.exit(1);
});
