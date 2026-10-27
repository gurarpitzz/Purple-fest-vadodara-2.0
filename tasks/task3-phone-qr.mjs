// Task 3: Phone Frame QR-to-ID-Card Animation Specialist
// Replaces the animation inside the vertical phone bezel (ComponentSectionsHomeTech)
// with a 3-stage interactive + keyframe-animated visualization:
//   Stage 1 (0s – 3.2s): Step 1 — Digital QR Pass Received on Phone (Aarav Patel · PFV-2027-0842 · ₹2,200 Verified)
//   Stage 2 (3.2s – 6.4s): Step 2 — Scanning QR at Event Reception Desk (Laser sweep + Praangan/MSU SQL DB Match HUD)
//   Stage 3 (6.4s – 10.0s): Step 3 — Official Accredited ID Card Issued at Desk (3D Lanyard ID Card + RPwD Access + Hologram)

export const HOME_TECH_CONTENT = {
  title: 'From Digital QR Pass to Official Reception Desk ID Card',
  description:
    'Every registered delegate receives an instant SQL-backed QR pass upon completing the mandatory ₹2,200 registration. Present this QR code on your phone at the Purple Fest Vadodara Reception Desk to verify your pass and collect your official accredited Delegate ID Card.',
  homeTechBlocks: [
    {
      id: '554',
      title: '01 · Register & Complete Secure Razorpay Payment (₹2,200)',
      description:
        'Complete your mandatory ₹2,200 3-Day Delegate Pass registration online, declare your RPwD Act 2016 accessibility accommodations across all 21 Benchmark Disabilities, and receive instant Razorpay payment confirmation.'
    },
    {
      id: '555',
      title: '02 · Receive Your Instant SQL-Backed Digital QR Pass by Email',
      description:
        'Your confirmed Delegate ID (e.g., PFV-2027-0842) and scannable ISO QR Pass are immediately persisted in the festival SQL database, displayed on your phone screen, and dispatched to your email inbox.'
    },
    {
      id: '556',
      title: '03 · Show Your QR Code at the Event Reception Desk',
      description:
        'Upon arriving at the Praangan / MSU Reception Desk in Vadodara (21–23 January 2027), present your phone screen at the check-in scanner for sub-second optical QR verification.'
    },
    {
      id: '557',
      title: '04 · Instant Verification & Official Accredited ID Card Handover',
      description:
        'Once the reception desk terminal confirms SQL DB Match and ₹2,200 payment verification, you are immediately handed your physical Purple Fest Vadodara 2027 Official Delegate ID Card with lanyard, Grade-1 Braille embossing, and all-zone access.'
    }
  ],
  button: {
    id: '1356',
    title: 'Register for Your QR Pass · ₹2,200',
    theme: 'primary',
    page: null,
    externalPage: '/apply',
    modal: false
  },
  mediaUrl: '/uploads/qr_checkin_idcard_flow.mp4',
  mediaAlt:
    'Purple Fest Vadodara 2027 — End-to-End QR Pass Receipt, Event Reception Desk Scan, and Official Delegate ID Card Issuance'
};

export const PHONE_QR_ANIMATION_HTML = `<div class="pf-phone-qr-idcard-stage" data-pf-auto="true" role="region" aria-label="Interactive 3-Step Delegate QR Pass to Reception Desk ID Card Issuance Flow">
  <video class="pf-phone-qr-bg-video" src="/uploads/qr_checkin_idcard_flow.mp4" muted loop playsinline autoplay preload="auto" aria-hidden="true"></video>

  <div class="pf-phone-qr-ui">
    <!-- Top Phone Status Bar & Speaker Notch -->
    <div class="pf-phone-status-bar" aria-hidden="true">
      <span class="pf-phone-time">09:41</span>
      <span class="pf-phone-notch"></span>
      <span class="pf-phone-signal">5G · 100%</span>
    </div>

    <!-- Dynamic Stage Header Pills -->
    <div class="pf-phone-pill-wrap">
      <div class="pf-stage-pill pf-stage-pill--1" data-pf-pill="1">
        <span class="pf-pill-dot"></span>
        <span>STEP 1 OF 3 · PASS ISSUED</span>
      </div>
      <div class="pf-stage-pill pf-stage-pill--2" data-pf-pill="2">
        <span class="pf-pill-dot pf-pill-dot--teal"></span>
        <span>STEP 2 OF 3 · RECEPTION DESK SCAN</span>
      </div>
      <div class="pf-stage-pill pf-stage-pill--3" data-pf-pill="3">
        <span class="pf-pill-dot pf-pill-dot--gold"></span>
        <span>STEP 3 OF 3 · ID CARD ISSUED</span>
      </div>
    </div>

    <!-- Stage Viewport -->
    <div class="pf-phone-stages-viewport">
      <!-- ================= STAGE 1: DIGITAL QR PASS RECEIVED ================= -->
      <div class="pf-phone-stage pf-phone-stage--1" data-pf-panel="1" role="tabpanel" aria-label="Step 1 of 3: Digital QR Pass Received on Phone">
        <div class="pf-pass-card">
          <div class="pf-pass-card__header">
            <div class="pf-pass-brand-row">
              <svg class="pf-pass-emblem-svg" viewBox="0 0 48 30" fill="none" aria-hidden="true">
                <path d="M8 19C6.3 26 9.5 29 10.6 28.5C11.7 28.1 9.7 22 10.6 21.7C11.5 21.4 14.4 28.3 15.5 27.9C16.6 27.5 15.1 18.5 9.1 14.9C3.2 11.4 0.5 15.2 2.1 17.5C3.9 19.9 8.6 17 11 12.7C14.7 6.2 21.4 6.2 25.9 13C28.9 17.7 27.8 28.5 26.2 29C24.7 29.4 23.3 20.6 22.2 20.6C21.1 20.6 19.8 29.4 18.4 29C17.1 28.5 16.6 17.7 20.3 13C24.8 7.3 32.6 7.6 37.4 12.7C40.1 15.7 44.6 18.8 46.1 16.6C47.5 14.7 44.6 11.6 39.3 14.9C34.1 18.1 31.8 27.1 33 27.9C34.1 28.5 37 21.4 37.9 21.7C38.8 22 36.8 28.1 37.9 28.5C39 29 41.6 26 40.1 19" stroke="#F3E8FF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="8" cy="6.2" r="2.3" fill="#FDE047"/>
                <circle cx="23.6" cy="3.8" r="2.7" fill="#2DD4BF"/>
                <circle cx="39.5" cy="6.2" r="2.3" fill="#FDE047"/>
              </svg>
              <div class="pf-pass-brand-text">
                <span class="pf-pass-brand-title">PURPLE FEST VADODARA 2027</span>
                <span class="pf-pass-brand-sub">21–23 JAN 2027 · PRAANGAN &amp; BROTHERHOOD</span>
              </div>
            </div>
            <div class="pf-verified-badge">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" fill="#10B981"/>
                <path d="M4.8 8.2L7 10.4L11.4 5.8" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>PAYMENT VERIFIED · ₹2,200</span>
            </div>
          </div>

          <div class="pf-pass-delegate-meta">
            <div class="pf-pass-delegate-name">Aarav Patel</div>
            <div class="pf-pass-delegate-id">ID: <strong>PFV-2027-0842</strong> · 3-DAY DELEGATE</div>
          </div>

          <!-- Crisp Scannable ISO QR Code -->
          <div class="pf-qr-box-wrap">
            <div class="pf-qr-box">
              <svg class="pf-qr-svg" viewBox="0 0 210 210" shape-rendering="crispEdges" role="img" aria-label="Confirmed Delegate QR Code PFV-2027-0842">
                <rect width="210" height="210" rx="12" fill="#FFFFFF"/>
                <!-- Top-Left Finder Pattern -->
                <path d="M10 10h70v70H10zM20 20v50h50V20zM30 30h30v30H30z" fill="#202D59" fill-rule="evenodd"/>
                <!-- Top-Right Finder Pattern -->
                <path d="M130 10h70v70h-70zM140 20v50h50V20zM150 30h30v30h-30z" fill="#202D59" fill-rule="evenodd"/>
                <!-- Bottom-Left Finder Pattern -->
                <path d="M10 130h70v70H10zM20 140v50h50v-50zM30 150h30v30H30z" fill="#202D59" fill-rule="evenodd"/>
                <!-- Timing & Data Modules -->
                <g fill="#202D59">
                  <rect x="90" y="10" width="10" height="10"/><rect x="110" y="10" width="10" height="10"/>
                  <rect x="100" y="20" width="10" height="20"/><rect x="90" y="40" width="20" height="10"/>
                  <rect x="110" y="50" width="10" height="20"/><rect x="90" y="60" width="10" height="10"/>
                  <rect x="10" y="90" width="20" height="10"/><rect x="40" y="90" width="10" height="20"/>
                  <rect x="60" y="90" width="10" height="10"/><rect x="20" y="110" width="20" height="10"/>
                  <rect x="50" y="110" width="20" height="10"/><rect x="80" y="80" width="10" height="10"/>
                  <rect x="120" y="80" width="10" height="10"/><rect x="140" y="90" width="20" height="10"/>
                  <rect x="170" y="90" width="10" height="20"/><rect x="190" y="90" width="10" height="10"/>
                  <rect x="130" y="110" width="20" height="10"/><rect x="160" y="110" width="10" height="20"/>
                  <rect x="180" y="110" width="20" height="10"/><rect x="90" y="130" width="10" height="20"/>
                  <rect x="110" y="130" width="20" height="10"/><rect x="140" y="130" width="10" height="10"/>
                  <rect x="170" y="130" width="20" height="10"/><rect x="100" y="150" width="20" height="10"/>
                  <rect x="130" y="140" width="30" height="30"/><rect x="140" y="150" width="10" height="10" fill="#FFFFFF"/>
                  <rect x="170" y="150" width="10" height="20"/><rect x="190" y="140" width="10" height="30"/>
                  <rect x="90" y="170" width="20" height="10"/><rect x="120" y="180" width="20" height="10"/>
                  <rect x="150" y="180" width="10" height="20"/><rect x="90" y="190" width="10" height="10"/>
                  <rect x="110" y="190" width="10" height="10"/><rect x="170" y="180" width="30" height="10"/>
                  <rect x="180" y="190" width="10" height="10"/>
                </g>
                <!-- Center PurpleFest Heart Badge -->
                <rect x="82" y="82" width="46" height="46" rx="10" fill="#FFFFFF" stroke="#6B21A8" stroke-width="4"/>
                <path d="M105 117C105 117 92 108 92 99.5C92 95 95.5 92 99.5 92C102.2 92 104.2 93.5 105 95.5C105.8 93.5 107.8 92 110.5 92C114.5 92 118 95 118 99.5C118 108 105 117 105 117Z" fill="#6B21A8"/>
              </svg>
            </div>
          </div>

          <div class="pf-present-prompt">
            <span class="pf-present-pulse-dot" aria-hidden="true"></span>
            <span>Present QR at Reception Desk</span>
          </div>

          <div class="pf-pass-footer-strip">
            <span>SQL DB: CONFIRMED</span>
            <span>·</span>
            <span>ISL · BRAILLE · WHEELCHAIR</span>
          </div>
        </div>
      </div>

      <!-- ================= STAGE 2: RECEPTION DESK QR SCAN ================= -->
      <div class="pf-phone-stage pf-phone-stage--2" data-pf-panel="2" role="tabpanel" aria-label="Step 2 of 3: Scanning QR at Event Reception Desk">
        <div class="pf-scan-card">
          <div class="pf-scan-terminal-header">
            <span class="pf-scan-live-badge">● LIVE OPTICAL SCANNER</span>
            <span class="pf-scan-desk-id">DESK #04 · MSU / PRAANGAN</span>
          </div>

          <div class="pf-scan-viewfinder">
            <span class="pf-scan-corner pf-scan-corner--tl"></span>
            <span class="pf-scan-corner pf-scan-corner--tr"></span>
            <span class="pf-scan-corner pf-scan-corner--bl"></span>
            <span class="pf-scan-corner pf-scan-corner--br"></span>

            <!-- Target QR Code Being Scanned -->
            <svg class="pf-qr-svg pf-qr-svg--scanning" viewBox="0 0 210 210" shape-rendering="crispEdges" aria-hidden="true">
              <rect width="210" height="210" rx="12" fill="#FFFFFF"/>
              <path d="M10 10h70v70H10zM20 20v50h50V20zM30 30h30v30H30z" fill="#202D59" fill-rule="evenodd"/>
              <path d="M130 10h70v70h-70zM140 20v50h50V20zM150 30h30v30h-30z" fill="#202D59" fill-rule="evenodd"/>
              <path d="M10 130h70v70H10zM20 140v50h50v-50zM30 150h30v30H30z" fill="#202D59" fill-rule="evenodd"/>
              <g fill="#202D59">
                <rect x="90" y="10" width="10" height="10"/><rect x="110" y="10" width="10" height="10"/>
                <rect x="100" y="20" width="10" height="20"/><rect x="90" y="40" width="20" height="10"/>
                <rect x="110" y="50" width="10" height="20"/><rect x="10" y="90" width="20" height="10"/>
                <rect x="40" y="90" width="10" height="20"/><rect x="140" y="90" width="20" height="10"/>
                <rect x="170" y="90" width="10" height="20"/><rect x="90" y="130" width="10" height="20"/>
                <rect x="110" y="130" width="20" height="10"/><rect x="130" y="140" width="30" height="30"/>
                <rect x="140" y="150" width="10" height="10" fill="#FFFFFF"/>
                <rect x="170" y="150" width="10" height="20"/><rect x="90" y="170" width="20" height="10"/>
                <rect x="120" y="180" width="20" height="10"/><rect x="170" y="180" width="30" height="10"/>
              </g>
              <rect x="82" y="82" width="46" height="46" rx="10" fill="#FFFFFF" stroke="#099F9F" stroke-width="4"/>
              <path d="M96 105L103 112L116 98" stroke="#099F9F" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>

            <!-- Sweeping Laser Line (#099F9F / #A459FF) -->
            <div class="pf-laser-line" aria-hidden="true">
              <div class="pf-laser-glow"></div>
            </div>
          </div>

          <!-- Reception Desk Verification HUD -->
          <div class="pf-scan-hud">
            <div class="pf-scan-hud__title">PRAANGAN / MSU RECEPTION DESK</div>
            <ul class="pf-scan-hud__checks">
              <li class="pf-hud-check pf-hud-check--ok">
                <span class="pf-hud-icon">✓</span>
                <span>SQL DB MATCH · <strong>PFV-2027-0842</strong></span>
              </li>
              <li class="pf-hud-check pf-hud-check--ok">
                <span class="pf-hud-icon">✓</span>
                <span>PAYMENT VERIFIED · <strong>₹2,200 PAID</strong></span>
              </li>
              <li class="pf-hud-check pf-hud-check--print">
                <span class="pf-hud-spinner" aria-hidden="true"></span>
                <span>PRINTING OFFICIAL ID CARD...</span>
              </li>
            </ul>
            <div class="pf-scan-progress-track" aria-hidden="true">
              <div class="pf-scan-progress-fill"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= STAGE 3: OFFICIAL DELEGATE ID CARD ISSUED ================= -->
      <div class="pf-phone-stage pf-phone-stage--3" data-pf-panel="3" role="tabpanel" aria-label="Step 3 of 3: Official Accredited ID Card Issued at Desk">
        <div class="pf-idcard-3d-wrap">
          <!-- Physical Lanyard Strap & Metal Clip -->
          <div class="pf-lanyard-assembly" aria-hidden="true">
            <div class="pf-lanyard-strap pf-lanyard-strap--left"></div>
            <div class="pf-lanyard-strap pf-lanyard-strap--right"></div>
            <div class="pf-lanyard-clip"></div>
          </div>

          <!-- Physical Accredited ID Card -->
          <div class="pf-idcard">
            <div class="pf-idcard__slot" aria-hidden="true"></div>
            <div class="pf-idcard__header">
              <div class="pf-idcard__fest-name">PURPLE FEST VADODARA</div>
              <div class="pf-idcard__fest-dates">21–23 JAN 2027 · OFFICIAL CREDENTIAL</div>
            </div>

            <div class="pf-idcard__profile">
              <div class="pf-idcard__avatar" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
                  <rect width="64" height="64" rx="14" fill="#E2E1FC"/>
                  <circle cx="32" cy="24" r="11" fill="#6B21A8"/>
                  <path d="M14 54C14 43.5 22 37 32 37C42 37 50 43.5 50 54" fill="#202D59"/>
                  <circle cx="50" cy="50" r="9" fill="#0D8A52" stroke="#FFFFFF" stroke-width="2"/>
                  <path d="M46.2 50.2L49 53L54.2 47.5" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="pf-idcard__identity">
                <div class="pf-idcard__name">Aarav Patel</div>
                <div class="pf-idcard__code">PFV-2027-0842</div>
                <div class="pf-idcard__role">DELEGATE PASS · ALL 6 ZONES</div>
              </div>
            </div>

            <!-- RPwD Access Icons Strip -->
            <div class="pf-idcard__rpwd-bar">
              <span class="pf-rpwd-chip" title="Indian Sign Language Interpretation">ISL</span>
              <span class="pf-rpwd-chip" title="Grade-1 Tactile Braille Embossed">Tactile</span>
              <span class="pf-rpwd-chip" title="100% Wheelchair Accessible">Wheelchair Access</span>
            </div>

            <!-- Bottom Row: Mini QR + Hologram Stamp -->
            <div class="pf-idcard__bottom-row">
              <div class="pf-idcard__mini-qr" aria-hidden="true">
                <svg viewBox="0 0 90 90" width="48" height="48" shape-rendering="crispEdges">
                  <rect width="90" height="90" rx="6" fill="#FFFFFF" stroke="#B8B6E8" stroke-width="2"/>
                  <path d="M8 8h26v26H8zM14 14v14h14V14z" fill="#202D59" fill-rule="evenodd"/>
                  <path d="M56 8h26v26H56zM62 14v14h14V14z" fill="#202D59" fill-rule="evenodd"/>
                  <path d="M8 56h26v26H8zM14 62v14h14V62z" fill="#202D59" fill-rule="evenodd"/>
                  <rect x="40" y="14" width="8" height="18" fill="#202D59"/>
                  <rect x="40" y="40" width="16" height="16" fill="#6B21A8"/>
                  <rect x="62" y="42" width="18" height="10" fill="#202D59"/>
                  <rect x="42" y="62" width="14" height="18" fill="#202D59"/>
                  <rect x="62" y="60" width="20" height="20" fill="#202D59"/>
                </svg>
              </div>
              <div class="pf-idcard__hologram">
                <span class="pf-holo-star">★ VERIFIED HOLOGRAM ★</span>
                <span class="pf-holo-issued">ISSUED AT RECEPTION DESK ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Step Selector Dots at Bottom of Phone Screen -->
    <div class="pf-phone-stepper" role="tablist" aria-label="Inspect QR Check-In to ID Card Steps">
      <button type="button" role="tab" class="pf-step-dot-btn" data-pf-qr-step="1" aria-selected="true" aria-label="Step 1: QR Received">
        <span class="pf-step-num">1</span>
        <span class="pf-step-lbl">QR Received</span>
      </button>
      <button type="button" role="tab" class="pf-step-dot-btn" data-pf-qr-step="2" aria-selected="false" aria-label="Step 2: Desk Scan">
        <span class="pf-step-num">2</span>
        <span class="pf-step-lbl">Desk Scan</span>
      </button>
      <button type="button" role="tab" class="pf-step-dot-btn" data-pf-qr-step="3" aria-selected="false" aria-label="Step 3: ID Card">
        <span class="pf-step-num">3</span>
        <span class="pf-step-lbl">ID Card</span>
      </button>
    </div>

    <!-- Continuous Loop Timeline Indicator -->
    <div class="pf-phone-timeline-bar" aria-hidden="true">
      <div class="pf-phone-timeline-fill"></div>
    </div>
  </div>
</div>`;

export const PHONE_QR_ANIMATION_CSS = `
/* PHONE-QR-IDCARD-STAGE-START */
.pf-phone-qr-mount,
.pf-phone-qr-idcard-stage {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: linear-gradient(165deg, #FAF9F5 0%, #F1EFFD 52%, #E5E3FA 100%);
  color: #202D59;
  font-family: '__font_7fb336', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  user-select: none;
  -webkit-font-smoothing: antialiased;
}

.pf-phone-qr-bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.01;
  pointer-events: none;
  z-index: 0;
}

.pf-phone-qr-ui {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 11px 10px;
  box-sizing: border-box;
}

/* Status Bar */
.pf-phone-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  font-size: 10px;
  font-weight: 700;
  color: #202D59;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.pf-phone-notch {
  width: 68px;
  height: 14px;
  border-radius: 999px;
  background: #190826;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.18);
}

/* Dynamic Header Pill */
.pf-phone-pill-wrap {
  position: relative;
  height: 26px;
  margin: 5px 0 4px;
  flex-shrink: 0;
}

.pf-stage-pill {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(4px) scale(0.97);
  transition: opacity 0.32s ease, transform 0.32s ease;
  pointer-events: none;
}

.pf-stage-pill--1 {
  background: #F3E8FF;
  color: #581C87;
  border: 1.5px solid #A855F7;
}

.pf-stage-pill--2 {
  background: #CCFBF1;
  color: #065F46;
  border: 1.5px solid #099F9F;
}

.pf-stage-pill--3 {
  background: #202D59;
  color: #FDE047;
  border: 1.5px solid #A459FF;
}

.pf-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7C3AED;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.22);
}

.pf-pill-dot--teal {
  background: #099F9F;
  box-shadow: 0 0 0 3px rgba(9, 159, 159, 0.25);
}

.pf-pill-dot--gold {
  background: #FDE047;
  box-shadow: 0 0 0 3px rgba(253, 224, 71, 0.3);
}

/* Stages Viewport */
.pf-phone-stages-viewport {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}

.pf-phone-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px) scale(0.97);
  transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

/* Automatic 10s Keyframe Timeline when not manually locked */
.pf-phone-qr-idcard-stage:not([data-pf-step]) .pf-stage-pill--1,
.pf-phone-qr-idcard-stage:not([data-pf-step]) .pf-phone-stage--1 {
  visibility: visible;
  animation: pfStage1Cycle 10s infinite;
}

.pf-phone-qr-idcard-stage:not([data-pf-step]) .pf-stage-pill--2,
.pf-phone-qr-idcard-stage:not([data-pf-step]) .pf-phone-stage--2 {
  visibility: visible;
  animation: pfStage2Cycle 10s infinite;
}

.pf-phone-qr-idcard-stage:not([data-pf-step]) .pf-stage-pill--3,
.pf-phone-qr-idcard-stage:not([data-pf-step]) .pf-phone-stage--3 {
  visibility: visible;
  animation: pfStage3Cycle 10s infinite;
}

/* Explicit Step State Overrides (JS sync + Interactive Click) */
.pf-phone-qr-idcard-stage[data-pf-step="1"] .pf-stage-pill--1,
.pf-phone-qr-idcard-stage[data-pf-step="1"] .pf-phone-stage--1,
.pf-phone-qr-idcard-stage[data-pf-step="2"] .pf-stage-pill--2,
.pf-phone-qr-idcard-stage[data-pf-step="2"] .pf-phone-stage--2,
.pf-phone-qr-idcard-stage[data-pf-step="3"] .pf-stage-pill--3,
.pf-phone-qr-idcard-stage[data-pf-step="3"] .pf-phone-stage--3 {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateY(0) scale(1) !important;
  pointer-events: auto !important;
  animation: none !important;
}

@keyframes pfStage1Cycle {
  0%, 2% { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  30% { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  33%, 97% { opacity: 0; transform: translateY(-6px) scale(0.97); pointer-events: none; }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes pfStage2Cycle {
  0%, 30% { opacity: 0; transform: translateY(8px) scale(0.97); pointer-events: none; }
  33%, 62% { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  65%, 100% { opacity: 0; transform: translateY(-6px) scale(0.97); pointer-events: none; }
}

@keyframes pfStage3Cycle {
  0%, 62% { opacity: 0; transform: translateY(8px) scale(0.97); pointer-events: none; }
  65%, 97% { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  100% { opacity: 0; transform: translateY(-6px) scale(0.97); pointer-events: none; }
}

/* ================= STAGE 1 STYLES ================= */
.pf-pass-card {
  background: #FFFFFF;
  border: 1.5px solid #C4B5FD;
  border-radius: 18px;
  padding: 9px 10px;
  box-shadow: 0 10px 26px rgba(32, 45, 89, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  height: 100%;
  justify-content: space-between;
}

.pf-pass-card__header {
  width: 100%;
  background: linear-gradient(135deg, #202D59 0%, #3B155E 100%);
  border-radius: 12px;
  padding: 7px 8px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.pf-pass-brand-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pf-pass-emblem-svg {
  width: 28px;
  height: 18px;
  flex-shrink: 0;
}

.pf-pass-brand-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.pf-pass-brand-title {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  line-height: 1.15;
}

.pf-pass-brand-sub {
  font-size: 7.5px;
  font-weight: 600;
  color: #DDD6FE;
  line-height: 1.15;
}

.pf-verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  background: #065F46;
  border: 1px solid #34D399;
  color: #ECFDF5;
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.pf-pass-delegate-meta {
  text-align: center;
  line-height: 1.2;
}

.pf-pass-delegate-name {
  font-size: 15px;
  font-weight: 800;
  color: #202D59;
}

.pf-pass-delegate-id {
  font-size: 9.5px;
  font-weight: 600;
  color: #6B21A8;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  margin-top: 2px;
}

.pf-qr-box-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.pf-qr-box {
  width: 122px;
  height: 122px;
  padding: 6px;
  border-radius: 14px;
  background: #FFFFFF;
  border: 2px solid #7C3AED;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
  animation: pfQrPulse 2.2s ease-in-out infinite;
}

.pf-qr-svg {
  width: 100%;
  height: 100%;
  display: block;
}

@keyframes pfQrPulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.14); transform: scale(1); }
  50% { box-shadow: 0 0 0 7px rgba(9, 159, 159, 0.22); transform: scale(1.02); }
}

.pf-present-prompt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, #6B21A8 0%, #4C1D95 100%);
  color: #FFFFFF;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 12px rgba(107, 33, 168, 0.28);
}

.pf-present-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2DD4BF;
  animation: pfDotBlink 1.1s ease-in-out infinite;
}

@keyframes pfDotBlink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.75); }
}

.pf-pass-footer-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 8px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.03em;
}

/* ================= STAGE 2 STYLES ================= */
.pf-scan-card {
  background: #0F172A;
  border: 1.5px solid #099F9F;
  border-radius: 18px;
  padding: 9px 10px;
  color: #F8FAFC;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  height: 100%;
  box-shadow: 0 12px 28px rgba(9, 159, 159, 0.22);
}

.pf-scan-terminal-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.pf-scan-live-badge {
  color: #2DD4BF;
  background: rgba(45, 212, 191, 0.14);
  padding: 2px 7px;
  border-radius: 999px;
  border: 1px solid rgba(45, 212, 191, 0.4);
}

.pf-scan-desk-id {
  color: #CBD5E1;
}

.pf-scan-viewfinder {
  position: relative;
  width: 128px;
  height: 128px;
  padding: 9px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.pf-scan-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: #2DD4BF;
  border-style: solid;
  z-index: 3;
}

.pf-scan-corner--tl { top: 3px; left: 3px; border-width: 3px 0 0 3px; border-top-left-radius: 6px; }
.pf-scan-corner--tr { top: 3px; right: 3px; border-width: 3px 3px 0 0; border-top-right-radius: 6px; }
.pf-scan-corner--bl { bottom: 3px; left: 3px; border-width: 0 0 3px 3px; border-bottom-left-radius: 6px; }
.pf-scan-corner--br { bottom: 3px; right: 3px; border-width: 0 3px 3px 0; border-bottom-right-radius: 6px; }

.pf-laser-line {
  position: absolute;
  left: 4px;
  right: 4px;
  height: 3px;
  background: linear-gradient(90deg, #A459FF 0%, #099F9F 50%, #2DD4BF 100%);
  box-shadow: 0 0 12px 3px rgba(9, 159, 159, 0.85), 0 0 22px 6px rgba(164, 89, 255, 0.55);
  z-index: 4;
  animation: pfLaserSweep 1.5s ease-in-out infinite alternate;
}

.pf-laser-glow {
  position: absolute;
  left: 0;
  right: 0;
  top: -14px;
  height: 28px;
  background: linear-gradient(180deg, rgba(9, 159, 159, 0) 0%, rgba(9, 159, 159, 0.28) 50%, rgba(164, 89, 255, 0) 100%);
}

@keyframes pfLaserSweep {
  0% { top: 10px; }
  100% { top: calc(100% - 13px); }
}

.pf-scan-hud {
  width: 100%;
  background: #1E293B;
  border: 1px solid rgba(45, 212, 191, 0.45);
  border-radius: 12px;
  padding: 7px 9px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pf-scan-hud__title {
  font-size: 8.5px;
  font-weight: 800;
  color: #2DD4BF;
  letter-spacing: 0.05em;
  text-align: center;
}

.pf-scan-hud__checks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 8.5px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

.pf-hud-check {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #E2E8F0;
}

.pf-hud-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #059669;
  color: #FFFFFF;
  font-size: 8px;
  font-weight: 900;
  flex-shrink: 0;
}

.pf-hud-check--print {
  color: #FDE047;
  font-weight: 700;
}

.pf-hud-spinner {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 2px solid #FDE047;
  border-top-color: transparent;
  animation: pfSpin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes pfSpin {
  to { transform: rotate(360deg); }
}

.pf-scan-progress-track {
  width: 100%;
  height: 5px;
  border-radius: 999px;
  background: #0F172A;
  overflow: hidden;
  margin-top: 2px;
}

.pf-scan-progress-fill {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #099F9F 0%, #A459FF 100%);
  transform-origin: left center;
  animation: pfScanBarFill 1.6s ease-in-out infinite;
}

@keyframes pfScanBarFill {
  0% { transform: scaleX(0.15); }
  100% { transform: scaleX(1); }
}

/* ================= STAGE 3 STYLES ================= */
.pf-idcard-3d-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  perspective: 800px;
}

.pf-lanyard-assembly {
  position: relative;
  width: 100px;
  height: 24px;
  flex-shrink: 0;
}

.pf-lanyard-strap {
  position: absolute;
  top: -8px;
  width: 14px;
  height: 28px;
  background: linear-gradient(180deg, #6B21A8 0%, #3B0764 100%);
  border-left: 1.5px solid #FDE047;
  border-right: 1.5px solid #FDE047;
}

.pf-lanyard-strap--left {
  left: 22px;
  transform: rotate(22deg);
}

.pf-lanyard-strap--right {
  right: 22px;
  transform: rotate(-22deg);
}

.pf-lanyard-clip {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 11px;
  border-radius: 4px;
  background: linear-gradient(90deg, #94A3B8 0%, #F1F5F9 50%, #64748B 100%);
  border: 1.5px solid #475569;
  z-index: 2;
}

.pf-idcard {
  width: 100%;
  flex: 1 1 auto;
  background: #FFFFFF;
  border: 2px solid #6B21A8;
  border-radius: 18px;
  padding: 7px 9px 8px;
  box-shadow: 0 12px 28px rgba(59, 7, 100, 0.22);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  animation: pfIdCardReveal 2.6s ease-in-out infinite alternate;
  transform-style: preserve-3d;
}

@keyframes pfIdCardReveal {
  0% { transform: rotateY(-6deg) translateY(0); }
  100% { transform: rotateY(6deg) translateY(-2px); }
}

.pf-idcard__slot {
  width: 34px;
  height: 5px;
  border-radius: 999px;
  background: #E2E1FC;
  border: 1px solid #94A3B8;
  margin: 0 auto;
}

.pf-idcard__header {
  background: linear-gradient(135deg, #3B0764 0%, #6B21A8 60%, #202D59 100%);
  border-radius: 11px;
  padding: 6px 8px;
  text-align: center;
  color: #FFFFFF;
}

.pf-idcard__fest-name {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #FFFFFF;
}

.pf-idcard__fest-dates {
  font-size: 7.5px;
  font-weight: 700;
  color: #FDE047;
  letter-spacing: 0.04em;
  margin-top: 1px;
}

.pf-idcard__profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 2px;
}

.pf-idcard__avatar {
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #6B21A8;
  display: flex;
}

.pf-idcard__identity {
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 0;
}

.pf-idcard__name {
  font-size: 13.5px;
  font-weight: 800;
  color: #202D59;
  line-height: 1.15;
}

.pf-idcard__code {
  font-size: 9px;
  font-weight: 700;
  color: #6B21A8;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

.pf-idcard__role {
  display: inline-block;
  margin-top: 3px;
  padding: 2px 6px;
  border-radius: 5px;
  background: #202D59;
  color: #FFFFFF;
  font-size: 7.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.pf-idcard__rpwd-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
  background: #F3F2FE;
  border: 1px solid #C4B5FD;
  border-radius: 8px;
  padding: 4px 5px;
}

.pf-rpwd-chip {
  font-size: 7.5px;
  font-weight: 800;
  color: #3B0764;
  background: #E9D5FF;
  padding: 2px 6px;
  border-radius: 999px;
}

.pf-idcard__bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.pf-idcard__hologram {
  flex: 1;
  background: linear-gradient(135deg, #D1FAE5 0%, #CCFBF1 55%, #EDE9FE 100%);
  border: 1.5px solid #059669;
  border-radius: 10px;
  padding: 5px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2px;
}

.pf-holo-star {
  font-size: 7px;
  font-weight: 800;
  color: #065F46;
  letter-spacing: 0.04em;
}

.pf-holo-issued {
  font-size: 8.5px;
  font-weight: 900;
  color: #047857;
}

/* Interactive Step Selector Dots at Bottom */
.pf-phone-stepper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-top: 6px;
  flex-shrink: 0;
}

.pf-step-dot-btn {
  appearance: none;
  border: 1.5px solid #B8B6E8;
  background: #EAE8FF;
  color: #202D59;
  border-radius: 999px;
  padding: 4px 4px;
  font-size: 8px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  line-height: 1.1;
}

.pf-step-dot-btn:hover {
  background: #DDD6FE;
  border-color: #7C3AED;
}

.pf-step-dot-btn.is-active,
.pf-step-dot-btn[aria-selected="true"] {
  background: #202D59;
  color: #FFFFFF;
  border-color: #099F9F;
  box-shadow: 0 2px 8px rgba(32, 45, 89, 0.28);
}

.pf-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgba(107, 33, 168, 0.16);
  font-size: 7.5px;
  font-weight: 900;
}

.pf-step-dot-btn.is-active .pf-step-num,
.pf-step-dot-btn[aria-selected="true"] .pf-step-num {
  background: #099F9F;
  color: #FFFFFF;
}

/* Overall Timeline Progress Bar */
.pf-phone-timeline-bar {
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: #DDD6FE;
  overflow: hidden;
  margin-top: 5px;
  flex-shrink: 0;
}

.pf-phone-timeline-fill {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #6B21A8 0%, #099F9F 52%, #202D59 100%);
  transform-origin: left center;
  animation: pfTimelineProgress 10s linear infinite;
}

.pf-phone-qr-idcard-stage[data-pf-manual="true"] .pf-phone-timeline-fill {
  animation: none;
}
.pf-phone-qr-idcard-stage[data-pf-step="1"][data-pf-manual="true"] .pf-phone-timeline-fill {
  transform: scaleX(0.33);
}
.pf-phone-qr-idcard-stage[data-pf-step="2"][data-pf-manual="true"] .pf-phone-timeline-fill {
  transform: scaleX(0.66);
}
.pf-phone-qr-idcard-stage[data-pf-step="3"][data-pf-manual="true"] .pf-phone-timeline-fill {
  transform: scaleX(1);
}

@keyframes pfTimelineProgress {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

/* Reduced Motion & High Contrast Support */
@media (prefers-reduced-motion: reduce) {
  .pf-phone-qr-idcard-stage .pf-laser-line,
  .pf-phone-qr-idcard-stage .pf-qr-box,
  .pf-phone-qr-idcard-stage .pf-idcard,
  .pf-phone-qr-idcard-stage .pf-phone-timeline-fill,
  .pf-phone-qr-idcard-stage .pf-hud-spinner {
    animation: none !important;
  }
}

html.pf-a11y-reduce-motion .pf-phone-qr-idcard-stage .pf-laser-line,
html.pf-a11y-reduce-motion .pf-phone-qr-idcard-stage .pf-qr-box,
html.pf-a11y-reduce-motion .pf-phone-qr-idcard-stage .pf-idcard,
html.pf-a11y-reduce-motion .pf-phone-qr-idcard-stage .pf-phone-timeline-fill,
html.pf-a11y-reduce-motion .pf-phone-qr-idcard-stage .pf-hud-spinner {
  animation: none !important;
}
/* PHONE-QR-IDCARD-STAGE-END */
`;

export const PHONE_QR_CLIENT_ENHANCER_JS = `
;(function(){
  if(typeof window==="undefined"||window.__pfPhoneQrEnhancerInit)return;
  window.__pfPhoneQrEnhancerInit=true;

  var STAGE_HTML=${JSON.stringify(PHONE_QR_ANIMATION_HTML)};
  var STAGE_CSS=${JSON.stringify(PHONE_QR_ANIMATION_CSS)};
  var STEP_ANNOUNCEMENTS={
    1:"Step 1 of 3: Digital QR Pass Received on Phone for Delegate Aarav Patel, ID PFV-2027-0842, Payment Verified 2,200 Rupees.",
    2:"Step 2 of 3: Reception Desk QR Scan at Praangan MSU Terminal. SQL Database Match and Payment Verified. Printing Official ID Card.",
    3:"Step 3 of 3: Official Purple Fest Vadodara 2027 Accredited Delegate ID Card Issued at Reception Desk with ISL, Tactile, and Wheelchair Access."
  };

  function ensureStyles(){
    if(!document.head)return;
    if(!document.getElementById("pf-phone-qr-animation-styles")){
      var st=document.createElement("style");
      st.id="pf-phone-qr-animation-styles";
      st.textContent=STAGE_CSS;
      document.head.appendChild(st);
    }
  }

  function setStage(stageEl,stepNum,isManual,announce){
    if(!stageEl)return;
    var s=String(stepNum);
    stageEl.setAttribute("data-pf-step",s);
    if(isManual){
      stageEl.setAttribute("data-pf-manual","true");
    }else{
      stageEl.removeAttribute("data-pf-manual");
    }
    stageEl.querySelectorAll("[data-pf-qr-step]").forEach(function(btn){
      var active=btn.getAttribute("data-pf-qr-step")===s;
      btn.setAttribute("aria-selected",active?"true":"false");
      btn.classList.toggle("is-active",active);
    });
    if(announce&&typeof window.__pfAnnounceTalkBack==="function"){
      window.__pfAnnounceTalkBack(STEP_ANNOUNCEMENTS[stepNum]||("Step "+s));
    }
  }

  function bindStageContainer(stageEl){
    if(!stageEl||stageEl.__pfQrBound)return;
    stageEl.__pfQrBound=true;
    var cycleStart=Date.now();
    var manualUntil=0;

    function isReducedMotion(){
      return document.documentElement.classList.contains("pf-a11y-reduce-motion")||
        (window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }

    function tick(){
      if(!document.body.contains(stageEl))return;
      if(isReducedMotion()){
        if(!stageEl.getAttribute("data-pf-step")){
          setStage(stageEl,1,true,false);
        }
        return;
      }
      if(Date.now()<manualUntil)return;
      var elapsed=((Date.now()-cycleStart)%10000)/1000;
      var targetStep=elapsed<3.2?1:(elapsed<6.4?2:3);
      if(stageEl.getAttribute("data-pf-step")!==String(targetStep)||stageEl.hasAttribute("data-pf-manual")){
        setStage(stageEl,targetStep,false,false);
      }
    }

    setStage(stageEl,1,false,false);
    var timer=setInterval(tick,180);

    stageEl.addEventListener("click",function(e){
      var btn=e.target.closest("[data-pf-qr-step]");
      if(!btn)return;
      e.preventDefault();
      var step=Number(btn.getAttribute("data-pf-qr-step"))||1;
      manualUntil=Date.now()+9000;
      setStage(stageEl,step,true,true);
    });

    stageEl.addEventListener("keydown",function(e){
      var btn=e.target.closest("[data-pf-qr-step]");
      if(!btn)return;
      var cur=Number(btn.getAttribute("data-pf-qr-step"))||1;
      var next=cur;
      if(e.key==="ArrowRight"||e.key==="ArrowDown"){
        e.preventDefault();
        next=cur===3?1:cur+1;
      }else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){
        e.preventDefault();
        next=cur===1?3:cur-1;
      }else if(e.key==="Enter"||e.key===" "){
        e.preventDefault();
        manualUntil=Date.now()+9000;
        setStage(stageEl,cur,true,true);
        return;
      }else{
        return;
      }
      manualUntil=Date.now()+9000;
      setStage(stageEl,next,true,true);
      var targetBtn=stageEl.querySelector('[data-pf-qr-step="'+next+'"]');
      if(targetBtn)targetBtn.focus();
    });

    // Also link adjacent HomeTech feature blocks (01..04) so hovering/focusing them highlights the matching phone step
    var section=stageEl.closest("section");
    if(section&&!section.__pfBlocksBound){
      section.__pfBlocksBound=true;
      var blocks=section.querySelectorAll("h3");
      blocks.forEach(function(h3,idx){
        var card=h3.parentElement;
        if(!card)return;
        var mapStep=idx<=1?1:(idx===2?2:3);
        card.addEventListener("mouseenter",function(){
          manualUntil=Date.now()+4500;
          setStage(stageEl,mapStep,true,false);
        });
      });
    }
  }

  function mountAllPhoneFrames(){
    ensureStyles();
    // 1. Bind any already-rendered .pf-phone-qr-idcard-stage
    document.querySelectorAll(".pf-phone-qr-idcard-stage").forEach(bindStageContainer);

    // 2. Upgrade any phone bezel in ComponentSectionsHomeTech that still has old video/image child
    document.querySelectorAll('[class*="aspect-[304/624]"] > div').forEach(function(screenEl){
      if(screenEl.querySelector(".pf-phone-qr-idcard-stage"))return;
      screenEl.innerHTML=STAGE_HTML;
      var stageEl=screenEl.querySelector(".pf-phone-qr-idcard-stage");
      if(stageEl)bindStageContainer(stageEl);
    });
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",mountAllPhoneFrames);
  }else{
    mountAllPhoneFrames();
  }
  var obs=new MutationObserver(function(){mountAllPhoneFrames();});
  if(document.documentElement){
    obs.observe(document.documentElement,{childList:true,subtree:true});
  }
})();
`;

/**
 * Transforms the `ComponentSectionsHomeTech` data object in-place (e.g. inside `purplefest-route-transformers.mjs`).
 */
export function applyHomeTechContent(homeTechData, makeMediaFn) {
  if (!homeTechData || typeof homeTechData !== 'object') return homeTechData;
  homeTechData.title = HOME_TECH_CONTENT.title;
  homeTechData.description = HOME_TECH_CONTENT.description;
  homeTechData.homeTechBlocks = HOME_TECH_CONTENT.homeTechBlocks.map((b) => ({ ...b }));
  homeTechData.button = { ...HOME_TECH_CONTENT.button };
  if (typeof makeMediaFn === 'function') {
    homeTechData.media = makeMediaFn('qr_checkin_idcard_flow.mp4', HOME_TECH_CONTENT.mediaAlt);
  } else if (homeTechData.media && typeof homeTechData.media === 'object') {
    homeTechData.media.name = 'qr_checkin_idcard_flow.mp4';
    homeTechData.media.url = HOME_TECH_CONTENT.mediaUrl;
    homeTechData.media.alternativeText = HOME_TECH_CONTENT.mediaAlt;
    homeTechData.media.caption = HOME_TECH_CONTENT.mediaAlt;
  }
  return homeTechData;
}

/**
 * Patches `_next/static/chunks/317-ed7330059b349994.js` so `HomeTechSection` (module 2851)
 * renders `PHONE_QR_ANIMATION_HTML` inside the vertical phone bezel (`rounded-[4.2rem]`),
 * ensures the 4 workflow blocks beside the phone always reflect `HOME_TECH_CONTENT`,
 * and appends the interactive client enhancer script.
 */
export function applyPhoneQrTo317Chunk(chunk317Code) {
  if (typeof chunk317Code !== 'string') return chunk317Code;
  let out = chunk317Code;

  // 1. Replace the phone frame interior inside module 2851 (HomeTechSection)
  const phoneInnerTarget =
    '!M&&(0,r.jsx)("div",{className:"h-full w-full overflow-hidden relative rounded-[4.2rem]",children:(0,r.jsx)("div",{className:(0,u.Z)("h-full w-full flex-shrink-0",b().image),children:(0,r.jsx)(s.default,{className:"h-full w-full object-cover",media:p})})})';

  const phoneInnerReplacement = `!M&&(0,r.jsx)("div",{className:"h-full w-full overflow-hidden relative rounded-[4.2rem]",children:(0,r.jsx)("div",{className:(0,u.Z)("h-full w-full flex-shrink-0 pf-phone-qr-mount",b().image),dangerouslySetInnerHTML:{__html:${JSON.stringify(
    PHONE_QR_ANIMATION_HTML
  )}}})})`;

  if (out.includes(phoneInnerTarget)) {
    out = out.replace(phoneInnerTarget, phoneInnerReplacement);
  }

  // 2. Ensure HomeTechSection (module 2851) uses HOME_TECH_CONTENT if old title/blocks are passed
  const propDestructureTarget =
    'let{data:l}=e,{title:a,description:v,homeTechBlocks:m=[],button:h,media:p,homeTechDeviceFrame:g="phone"}=l';
  const defaultPropsInjection = `let{data:l}=e,_pfHt=${JSON.stringify({
    title: HOME_TECH_CONTENT.title,
    description: HOME_TECH_CONTENT.description,
    homeTechBlocks: HOME_TECH_CONTENT.homeTechBlocks,
    button: HOME_TECH_CONTENT.button
  })},{title:a=_pfHt.title,description:v=_pfHt.description,homeTechBlocks:m=_pfHt.homeTechBlocks,button:h=_pfHt.button,media:p,homeTechDeviceFrame:g="phone"}=(l&&l.title&&l.title.includes("QR Pass"))?l:{...l,..._pfHt}`;

  if (out.includes(propDestructureTarget)) {
    out = out.replace(propDestructureTarget, defaultPropsInjection);
  }

  // 3. Append the interactive client enhancer script if not already present
  if (!out.includes('__pfPhoneQrEnhancerInit')) {
    out += `\n${PHONE_QR_CLIENT_ENHANCER_JS}`;
  }

  return out;
}

/**
 * Helper to inject `PHONE_QR_ANIMATION_HTML` into SSR HTML (`index.html`) inside the phone frame
 * (`aspect-[304/624]`) so even before JS hydration, the SSR HTML shows the 3-stage QR-to-ID-Card UI.
 */
export function applyPhoneQrToSsrHtml(ssrHtml) {
  if (typeof ssrHtml !== 'string') return ssrHtml;
  let out = ssrHtml;
  const ssrPhoneTarget =
    '<div class="mx-auto relative z-1 grid bg-blue-900 aspect-[304/624] max-w-[30.4rem] max-h-[62.4rem] rounded-[5rem] p-13 w-auto h-full"><div class="h-full w-full overflow-hidden relative rounded-[4.2rem]"><div class="h-full w-full flex-shrink-0 styles_image__TEd92"></div></div></div>';
  const ssrPhoneReplacement = `<div class="mx-auto relative z-1 grid bg-blue-900 aspect-[304/624] max-w-[30.4rem] max-h-[62.4rem] rounded-[5rem] p-13 w-auto h-full"><div class="h-full w-full overflow-hidden relative rounded-[4.2rem]"><div class="h-full w-full flex-shrink-0 styles_image__TEd92 pf-phone-qr-mount">${PHONE_QR_ANIMATION_HTML}</div></div></div>`;

  if (out.includes(ssrPhoneTarget)) {
    out = out.replace(ssrPhoneTarget, ssrPhoneReplacement);
  }
  return out;
}
