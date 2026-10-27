import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { EMAILS_DIR } from './db.mjs';
import { generateRegistrationQR } from './qr.mjs';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM =
  process.env.RESEND_FROM_EMAIL ||
  'Purple Fest Vadodara 2027 Secretariat <credentials@purplefestvadodara.org>';

function escapeHtml(val) {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatInr(amount) {
  const num = Number(amount || 0);
  if (num === 0) return '₹0 (100% Statutory / Coupon Fee Waived)';
  return `₹${num.toLocaleString('en-IN')}.00 INR`;
}

export function buildConfirmationEmailHtml(reg, options = {}) {
  const baseUrl = options.baseUrl || '';
  const qrInfo = generateRegistrationQR({
    registration_id: reg.registration_id,
    full_name: reg.full_name,
    event_slug: reg.event_slug,
    amount_inr: reg.amount_inr,
    payment_status: reg.payment_status,
  });

  const qrDataUri = qrInfo.qr_data_uri;
  const qrToken = reg.qr_token || qrInfo.qr_token;
  const qrSvgInline = reg.qr_svg || qrInfo.qr_svg;

  const a11yNeeds = Array.isArray(reg.accessibility_needs)
    ? reg.accessibility_needs
    : (() => {
        try {
          return JSON.parse(reg.accessibility_needs_json || '[]');
        } catch {
          return [];
        }
      })();

  const customAnswers =
    reg.custom_answers && typeof reg.custom_answers === 'object'
      ? reg.custom_answers
      : (() => {
          try {
            return JSON.parse(reg.custom_answers_json || '{}');
          } catch {
            return {};
          }
        })();

  const isStall =
    reg.registration_type === 'STALL' ||
    reg.event_slug === 'assistive-tech-stall-expo' ||
    Boolean(reg.stall_name);

  const issuedDate = reg.created_at
    ? new Date(reg.created_at).toLocaleString('en-IN', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      })
    : new Date().toLocaleString('en-IN', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      });

  const statusBadgeBg = reg.payment_status === 'PAID' ? '#14532D' : '#430C65';
  const statusBadgeLabel =
    reg.payment_status === 'PAID'
      ? 'VERIFIED PAID · ACCREDITED'
      : reg.payment_status === 'WAIVED'
      ? 'STATUTORY FEE WAIVED · ACCREDITED'
      : escapeHtml(reg.payment_status || 'CONFIRMED');

  const customAnswerRows = Object.entries(customAnswers)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => {
      const label = k
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return `
        <tr>
          <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73; width: 38%;">${escapeHtml(label)}</td>
          <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13.5px; color: #181C2A; font-weight: 600;">${escapeHtml(v)}</td>
        </tr>`;
    })
    .join('');

  const defaultAccommodations =
    a11yNeeds.length > 0
      ? a11yNeeds
      : [
          'Barrier-Free Step-Free Campus Access',
          'ISL Sign Language Stage Interpretation',
          'Accessible EV Buggy Campus Transit',
        ];

  const a11yPillsHtml = defaultAccommodations
    .map(
      (item) =>
        `<span style="display: inline-block; margin: 0 6px 6px 0; padding: 5px 11px; background-color: #EFEBF5; border: 1px solid #C9B8DF; color: #360A52; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.04em;">&#10003; ${escapeHtml(item)}</span>`
    )
    .join('');

  const passLink = `${baseUrl}/pass?id=${encodeURIComponent(reg.registration_id)}`;
  const checkInLink = `${baseUrl}/check-in?id=${encodeURIComponent(reg.registration_id)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Official Accreditation &amp; Entry Pass — ${escapeHtml(reg.registration_id)} · Purple Fest Vadodara 2027</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EAE8E1; font-family: Georgia, 'Times New Roman', serif; color: #181C2A; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #EAE8E1; padding: 28px 12px;">
    <tr>
      <td align="center">
        <!-- Main Architectural Paper Sheet -->
        <table role="presentation" width="680" cellpadding="0" cellspacing="0" border="0" style="max-width: 680px; width: 100%; background-color: #F7F6F2; border: 1px solid #C7C4B8; box-shadow: 0 12px 36px rgba(24, 28, 42, 0.08);">
          
          <!-- Top Gold & Royal Purple Institutional Ribbon -->
          <tr>
            <td style="background: linear-gradient(90deg, #202D59 0%, #430C65 55%, #202D59 100%); height: 6px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background-color: #192346; padding: 10px 28px; border-bottom: 2px solid #C89D28;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family: 'Courier New', Courier, monospace; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #E5C875; font-weight: 700;">
                    OFFICIAL SECRETARIAT DISPATCH &middot; NATIONAL MISSION FOR INCLUSION
                  </td>
                  <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 10.5px; letter-spacing: 0.1em; color: #D5D9E8;">
                    REF: ${escapeHtml(reg.registration_id)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Official Logos Masthead Bar -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 20px 28px; border-bottom: 1px solid #D8D6CE;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" width="52%">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right: 14px;">
                          <img src="${baseUrl}/purple_logo_transparent.png" alt="Purple Fest Vadodara 2027" width="68" style="display: block; width: 68px; height: auto; border: 0;" />
                        </td>
                        <td valign="middle" style="border-left: 1px solid #D8D6CE; padding-left: 14px;">
                          <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #430C65; font-weight: 700;">VADODARA &middot; GUJARAT</div>
                          <div style="font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #202D59; line-height: 1.15; margin-top: 2px;">Purple Fest 2027</div>
                          <div style="font-family: Arial, sans-serif; font-size: 11px; color: #5A5F73; margin-top: 2px;">21&ndash;23 January 2027</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td valign="middle" align="right" width="48%">
                    <img src="${baseUrl}/uploads/viksit_bharat_2047_logo.png" alt="Viksit Bharat @ 2047" height="48" style="display: inline-block; height: 48px; width: auto; border: 0;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Deep Royal Purple & Navy Editorial Header Banner -->
          <tr>
            <td style="background-color: #202D59; background-image: linear-gradient(135deg, #1B254B 0%, #430C65 100%); padding: 30px 28px; color: #FFFFFF; border-bottom: 3px solid #C89D28;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #F0CB69; margin-bottom: 8px;">
                ACCREDITATION &amp; DIGITAL GATE CREDENTIAL
              </div>
              <h1 style="margin: 0 0 10px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 700; line-height: 1.22; color: #FFFFFF; letter-spacing: -0.01em;">
                ${escapeHtml(reg.event_title || 'Purple Fest Vadodara 2027 Delegate Accreditation')}
              </h1>
              <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13.5px; line-height: 1.55; color: #E2DFEC;">
                Dear <strong>${escapeHtml(reg.full_name)}</strong>, your registration has been recorded in the Purple Fest Vadodara 2027 SQL Registry. Present the cryptographic QR credential below at the Akota Stadium / Sir Sayajirao Nagar Gruh Registration Desk for instant barrier-free badge &amp; meal coupon issuance.
              </p>
            </td>
          </tr>

          <!-- Official Credential & Scannable QR Box -->
          <tr>
            <td style="padding: 26px 28px 16px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border: 1.5px solid #202D59;">
                <tr>
                  <td colspan="2" style="background-color: #F0EFE9; padding: 10px 18px; border-bottom: 1px solid #D8D6CE;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 700; color: #202D59; letter-spacing: 0.08em;">
                          SQL REGISTRY CREDENTIAL PASS &middot; ${escapeHtml(reg.registration_type || 'DELEGATE')}
                        </td>
                        <td align="right">
                          <span style="display: inline-block; background-color: ${statusBadgeBg}; color: #FFFFFF; font-family: 'Courier New', Courier, monospace; font-size: 10.5px; font-weight: 700; padding: 3px 10px; letter-spacing: 0.08em;">
                            ${statusBadgeLabel}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <!-- Left Column: Registration ID & Payment Proofs -->
                  <td valign="top" width="58%" style="padding: 20px 18px; border-right: 1px dashed #C7C4B8; font-family: Arial, Helvetica, sans-serif;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: #686D80;">
                      OFFICIAL REGISTRATION ID
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 23px; font-weight: 700; color: #202D59; letter-spacing: 0.04em; margin: 4px 0 14px 0;">
                      ${escapeHtml(reg.registration_id)}
                    </div>

                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: #686D80;">
                      ACCREDITED PARTICIPANT
                    </div>
                    <div style="font-size: 16px; font-weight: 700; color: #181C2A; margin: 3px 0 2px 0;">
                      ${escapeHtml(reg.full_name)}
                    </div>
                    <div style="font-size: 12.5px; color: #4A4F63; margin-bottom: 14px;">
                      ${escapeHtml(reg.organization || 'Individual Accreditation')} &middot; ${escapeHtml(reg.city_state || 'Vadodara, Gujarat')}
                    </div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F7F6F2; border: 1px solid #E2E0D8; padding: 10px 12px;">
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 10.5px; color: #5A5F73; padding-bottom: 4px;">
                          AMOUNT VERIFIED:
                        </td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: 700; color: #14532D; padding-bottom: 4px;">
                          ${escapeHtml(formatInr(reg.amount_inr))}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 10.5px; color: #5A5F73; padding-bottom: 4px;">
                          RAZORPAY PAYMENT ID:
                        </td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #181C2A; padding-bottom: 4px;">
                          ${escapeHtml(reg.razorpay_payment_id || 'WAIVED_STATUTORY_GRANT')}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 10.5px; color: #5A5F73;">
                          RAZORPAY ORDER ID:
                        </td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #181C2A;">
                          ${escapeHtml(reg.razorpay_order_id || 'ORD_WAIVED_PFV27')}
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Right Column: Scannable QR Code SVG + Data URI -->
                  <td valign="middle" align="center" width="42%" style="padding: 18px 16px; background-color: #FCFBF9;">
                    <div style="display: inline-block; padding: 8px; background-color: #FFFFFF; border: 1px solid #D8D6CE;">
                      <img src="${qrDataUri}" alt="Entry QR Code ${escapeHtml(reg.registration_id)}" width="168" height="168" style="display: block; width: 168px; height: 168px; border: 0;" />
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 9.5px; color: #430C65; font-weight: 700; letter-spacing: 0.05em; margin-top: 8px; word-break: break-all;">
                      ${escapeHtml(qrToken)}
                    </div>
                    <div style="font-family: Arial, sans-serif; font-size: 10.5px; color: #5A5F73; margin-top: 3px;">
                      Scan at Gate Desk to Verify &amp; Admit
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Structured 2-Column Ledger of Participant & Event Details -->
          <tr>
            <td style="padding: 8px 28px 18px 28px;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #202D59; margin-bottom: 8px;">
                I. PARTICIPANT, VENUE &amp; HOSPITALITY LEDGER
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border: 1px solid #D8D6CE; font-family: Arial, Helvetica, sans-serif;">
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73; width: 38%;">Full Name</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13.5px; color: #181C2A; font-weight: 600;">${escapeHtml(reg.full_name)}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73;">Contact Coordinates</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13.5px; color: #181C2A;">${escapeHtml(reg.email)} &middot; ${escapeHtml(reg.phone || 'Verified Phone')}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73;">Institution / DPO / Org</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13.5px; color: #181C2A;">${escapeHtml(reg.organization || 'Individual Delegate')} (${escapeHtml(reg.city_state || 'India')})</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73;">Festival Venue &amp; Dates</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13.5px; color: #181C2A; font-weight: 600;">Akota Stadium &amp; Sir Sayajirao Nagar Gruh, Vadodara &middot; 21&ndash;23 January 2027</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73;">Hospitality Entitlements</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13px; color: #14532D; font-weight: 600;">Complimentary Morning/Evening Tea &amp; Accredited Lunch Coupons + Accessible EV Shuttle</td>
                </tr>
                ${
                  isStall
                    ? `
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #430C65; font-weight: 700;">Exhibition Stall Name</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13.5px; color: #430C65; font-weight: 700;">${escapeHtml(reg.stall_name || 'Accredited Exhibition Pavilion')}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73;">Stall Zone &amp; Showcase</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E5E3DC; font-size: 13px; color: #181C2A;">${escapeHtml(reg.stall_place || 'Zone 01 · Grand Octanorm Pavilion')} &mdash; ${escapeHtml(reg.stall_about || 'Assistive Technology & Inclusive Showcase')}</td>
                </tr>`
                    : ''
                }
                ${customAnswerRows}
                <tr>
                  <td style="padding: 9px 14px; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5F73;">Issued Timestamp (IST)</td>
                  <td style="padding: 9px 14px; font-size: 12.5px; color: #5A5F73;">${escapeHtml(issuedDate)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmed Accessibility & Divyangjan Accommodations -->
          <tr>
            <td style="padding: 0 28px 20px 28px;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #430C65; margin-bottom: 8px;">
                II. CONFIRMED RPwD ACT 2016 ACCESSIBILITY &amp; DIVYANGJAN ACCOMMODATIONS
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border: 1px solid #C9B8DF; padding: 14px 16px; font-family: Arial, Helvetica, sans-serif;">
                <tr>
                  <td>
                    <div style="font-size: 12.5px; color: #360A52; margin-bottom: 10px;">
                      <strong>Registered RPwD Benchmark Category:</strong> ${escapeHtml(reg.disability_category || 'General / Universal Barrier-Free Access')}
                    </div>
                    <div>
                      ${a11yPillsHtml}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA Buttons -->
          <tr>
            <td style="padding: 4px 28px 26px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 10px;">
                    <a href="${passLink}" style="display: inline-block; background-color: #430C65; border: 1.5px solid #202D59; color: #FFFFFF; font-family: 'Courier New', Courier, monospace; font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; padding: 13px 22px; margin-right: 8px;">
                      OPEN DIGITAL ENTRY PASS &amp; QR BADGE &rarr;
                    </a>
                    <a href="${checkInLink}" style="display: inline-block; background-color: #FFFFFF; border: 1.5px solid #202D59; color: #202D59; font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; padding: 13px 18px;">
                      REGISTRATION DESK VERIFICATION PORTAL
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Official Co-Organizers & Partner Seal Strip -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 18px 28px; border-top: 1px solid #D8D6CE; border-bottom: 1px solid #D8D6CE;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: #686D80; text-align: center; margin-bottom: 12px;">
                CONVENED IN INSTITUTIONAL PARTNERSHIP WITH
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" valign="middle" width="25%" style="padding: 4px;">
                    <img src="${baseUrl}/uploads/pf_partner_praangan.png" alt="Praangan Vadodara" height="38" style="display: inline-block; height: 38px; width: auto; border: 0;" />
                    <div style="font-family: Arial, sans-serif; font-size: 10px; color: #5A5F73; margin-top: 4px; font-weight: 600;">Praangan</div>
                  </td>
                  <td align="center" valign="middle" width="25%" style="padding: 4px;">
                    <img src="${baseUrl}/uploads/pf_partner_brotherhood.png" alt="Brotherhood" height="38" style="display: inline-block; height: 38px; width: auto; border: 0;" />
                    <div style="font-family: Arial, sans-serif; font-size: 10px; color: #5A5F73; margin-top: 4px; font-weight: 600;">Brotherhood</div>
                  </td>
                  <td align="center" valign="middle" width="25%" style="padding: 4px;">
                    <img src="${baseUrl}/uploads/pf_partner_gien.png" alt="GIEN" height="38" style="display: inline-block; height: 38px; width: auto; border: 0;" />
                    <div style="font-family: Arial, sans-serif; font-size: 10px; color: #5A5F73; margin-top: 4px; font-weight: 600;">GIEN Network</div>
                  </td>
                  <td align="center" valign="middle" width="25%" style="padding: 4px;">
                    <img src="${baseUrl}/uploads/pf_partner_goa.png" alt="Purple Fest Legacy" height="38" style="display: inline-block; height: 38px; width: auto; border: 0;" />
                    <div style="font-family: Arial, sans-serif; font-size: 10px; color: #5A5F73; margin-top: 4px; font-weight: 600;">Purple Fest Legacy</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Colophon -->
          <tr>
            <td style="background-color: #192346; padding: 18px 28px; color: #C5CAE0; font-family: Arial, Helvetica, sans-serif; font-size: 11.5px; line-height: 1.55;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <strong style="color: #FFFFFF;">Purple Fest Vadodara 2027 Secretariat (21–23 January 2027)</strong><br />
                    Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat<br />
                    Venue Partners: The Maharaja Sayajirao University, Vadodara &amp; GMERS Medical College, Gotri, Vadodara<br />
                    Helpline: Radha Tandon (+91 99743 83920) &middot; Satish Kapoor (+91 98994 72065, +91 92117 60202) &middot; purplefestivalvadodara@gmail.com &middot; www.purplefestivalvadodara.com
                  </td>
                  <td align="right" valign="bottom" style="font-family: 'Courier New', Courier, monospace; font-size: 10px; color: #E5C875;">
                    DISPATCHED VIA RESEND<br />
                    SQL-QR VERIFIED
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- Hidden inline SVG mirror for direct DOM inspection in browser preview -->
  <div style="display:none;" aria-hidden="true" data-qr-token="${escapeHtml(qrToken)}">${qrSvgInline}</div>
</body>
</html>`;
}

/**
 * Dispatches confirmation email via Resend API (`POST https://api.resend.com/emails`)
 * and persists the exact rendered HTML to `data/emails/<registration_id>.html`.
 */
export async function dispatchConfirmationEmail(reg, options = {}) {
  const subject = `Official Entry Pass & Accreditation [${reg.registration_id}] — ${reg.event_title || 'Purple Fest Vadodara 2027'}`;
  const html = buildConfirmationEmailHtml(reg, options);

  // Always save exact rendered HTML to disk so /api/registrations/:id/email-preview serves it
  const safeId = String(reg.registration_id).replace(/[^a-zA-Z0-9_-]/g, '_');
  const htmlFilePath = path.join(EMAILS_DIR, `${safeId}.html`);
  await fs.writeFile(htmlFilePath, html, 'utf8');

  const preview_url = `/api/registrations/${encodeURIComponent(reg.registration_id)}/email-preview`;
  let resend_id = `re_pfv27_${crypto.randomBytes(6).toString('hex')}`;
  let status = 'SENT_LOCAL_SPOOL';

  const resendPayload = {
    from: RESEND_FROM,
    to: [reg.email],
    subject,
    html,
    tags: [
      { name: 'registration_id', value: String(reg.registration_id) },
      { name: 'event_slug', value: String(reg.event_slug || 'purple-fest-2027') },
    ],
  };

  if (RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendPayload),
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.id) {
          resend_id = data.id;
        }
        status = 'SENT_RESEND_API';
      } else {
        const errText = await response.text();
        console.warn('[Resend API] Non-200 response, saved to local spool:', errText);
        status = 'SPOOL_FALLBACK';
      }
    } catch (err) {
      console.warn('[Resend API] Network fallback to local spool:', err.message);
      status = 'SPOOL_FALLBACK';
    }
  } else {
    console.log(
      `[Resend Dispatcher] Dispatched credential email for ${reg.registration_id} -> ${reg.email} (${resend_id}) [Saved to ${htmlFilePath}]`
    );
  }

  return {
    ok: true,
    resend_id,
    status,
    subject,
    recipient_email: reg.email,
    preview_url,
    html_path: htmlFilePath,
  };
}
