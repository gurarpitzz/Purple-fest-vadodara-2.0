// Task 2 Deliverable: Organisers, Knowledge Partner, Venue Partners, Strategic Partners & Organising Committee Section
// Designed to sit directly above <section class="cta-section"> ("Ready to Join Purple Fest Vadodara 2027?")
// Matching reference layout media_1793135269073_11d93ce6.png and all partner/committee data from the official .docx

export const SPONSORS_INNER_HTML = `
  <div class="pf-sponsors-container">
    <!-- TIER 1: ORGANISERS & KNOWLEDGE PARTNER -->
    <div class="pf-sponsors-tier">
      <h2 class="pf-sponsors-tier-heading">ORGANISERS &amp; KNOWLEDGE PARTNER</h2>
      <div class="pf-sponsors-grid" role="list" aria-label="Organisers and Knowledge Partner">
        <!-- 1. Praangan -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_praangan.jpg"
              onerror="this.onerror=null;this.src='/PARANGAN%20LOGO.jpg.jpeg';"
              alt="Praangan, Vadodara, Gujarat — A center for children with special needs logo"
              class="pf-sponsor-logo-img"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag">Organiser</span>
            <h3 class="pf-sponsor-org-name">Praangan, Vadodara, Gujarat</h3>
          </div>
        </article>

        <!-- 2. Brotherhood -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_brotherhood.jpg"
              onerror="this.onerror=null;this.src='/BH%20LOGO.jpg.jpeg';"
              alt="Brotherhood, New Delhi, India logo"
              class="pf-sponsor-logo-img"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag">Organiser</span>
            <h3 class="pf-sponsor-org-name">Brotherhood, Delhi</h3>
          </div>
        </article>

        <!-- 3. TISS CDSA -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_tiss_cdsa.jpg"
              onerror="this.onerror=null;this.src='/LOGO%202%20(1).jpg.jpeg';"
              alt="Centre for Disabilities Studies and Action (CDSA), Tata Institute of Social Sciences (TISS), Mumbai logo"
              class="pf-sponsor-logo-img"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag">Organiser</span>
            <h3 class="pf-sponsor-org-name">Centre for Disabilities Studies &amp; Action (CDSA), School of Social Work, TISS Mumbai</h3>
          </div>
        </article>

        <!-- 4. State Commission for Persons with Disabilities, Goa -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_goa_commission.png"
              onerror="this.onerror=null;this.src='/GOA_BH_LOGO-removebg-preview.png';"
              alt="State Commission for Persons with Disabilities, Goa logo"
              class="pf-sponsor-logo-img"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag pf-sponsor-role-tag--gold">Knowledge Partner</span>
            <h3 class="pf-sponsor-org-name">State Commission for Persons with Disabilities, Goa</h3>
          </div>
        </article>

        <!-- 5. Global Inclusive Education Network (GIEN) -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_gien.jpg"
              onerror="this.onerror=null;this.src='/GIEN%20FINAL%20LOGO.jpg.jpeg';"
              alt="Global Inclusive Education Network (GIEN) logo"
              class="pf-sponsor-logo-img"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag">Global Network Partner</span>
            <h3 class="pf-sponsor-org-name">Global Inclusive Education Network (GIEN)</h3>
          </div>
        </article>
      </div>
    </div>

    <!-- CENTERED SHORT HORIZONTAL DIVIDER LINE -->
    <div class="pf-sponsors-divider" aria-hidden="true"></div>

    <!-- TIER 2: VENUE & STRATEGIC PARTNERS -->
    <div class="pf-sponsors-tier">
      <h2 class="pf-sponsors-tier-heading">VENUE &amp; STRATEGIC PARTNERS</h2>
      <div class="pf-sponsors-grid" role="list" aria-label="Venue Partners and Strategic Partners">
        <!-- 6. The Maharaja Sayajirao University, Vadodara -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_msu_vadodara.svg"
              alt="The Maharaja Sayajirao University of Baroda, Vadodara institutional crest"
              class="pf-sponsor-logo-img pf-sponsor-logo-img--svg"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag pf-sponsor-role-tag--gold">Venue Partner</span>
            <h3 class="pf-sponsor-org-name">The Maharaja Sayajirao University, Vadodara</h3>
          </div>
        </article>

        <!-- 7. GMERS Medical College, Gotri, Vadodara -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_gmers_gotri.svg"
              alt="GMERS Medical College and Hospital, Gotri, Vadodara institutional crest"
              class="pf-sponsor-logo-img pf-sponsor-logo-img--svg"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag pf-sponsor-role-tag--gold">Venue Partner</span>
            <h3 class="pf-sponsor-org-name">GMERS Medical College, Gotri, Vadodara</h3>
          </div>
        </article>

        <!-- 8. Gujarat National Law University (GNLU), Gandhinagar -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_gnlu.svg"
              alt="Gujarat National Law University (GNLU), Gandhinagar institutional crest"
              class="pf-sponsor-logo-img pf-sponsor-logo-img--svg"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag">Strategic &amp; Advisory Partner</span>
            <h3 class="pf-sponsor-org-name">Gujarat National Law University (GNLU), Gandhinagar</h3>
            <p class="pf-sponsor-org-sub">Dr. Nitin Malik, Registrar</p>
          </div>
        </article>

        <!-- 9. Indian Council of Medical Research (ICMR), Delhi -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_icmr.svg"
              alt="Indian Council of Medical Research (ICMR), New Delhi emblem"
              class="pf-sponsor-logo-img pf-sponsor-logo-img--svg"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag">Strategic Research Advisor</span>
            <h3 class="pf-sponsor-org-name">Indian Council of Medical Research (ICMR), Delhi</h3>
            <p class="pf-sponsor-org-sub">Dr. Ravinder Singh, Director</p>
          </div>
        </article>

        <!-- 10. Global Bihari, Delhi -->
        <article class="pf-sponsor-card" role="listitem">
          <div class="pf-sponsor-logo-stage">
            <img
              src="/uploads/pf_logo_global_bihari.svg"
              alt="Global Bihari, New Delhi Strategic Media Partner emblem"
              class="pf-sponsor-logo-img pf-sponsor-logo-img--svg"
              loading="lazy"
            />
          </div>
          <div class="pf-sponsor-card-meta">
            <span class="pf-sponsor-role-tag">Strategic Media Partner</span>
            <h3 class="pf-sponsor-org-name">Global Bihari, Delhi</h3>
            <p class="pf-sponsor-org-sub">Deepak Parvatiyaar, Founder &amp; Chief Editor</p>
          </div>
        </article>
      </div>
    </div>

    <!-- CENTERED SHORT HORIZONTAL DIVIDER LINE -->
    <div class="pf-sponsors-divider" aria-hidden="true"></div>

    <!-- TIER 3: ORGANISING COMMITTEE & LEADERSHIP -->
    <div class="pf-sponsors-tier pf-sponsors-tier--committee">
      <h2 class="pf-sponsors-tier-heading">ORGANISING COMMITTEE &amp; LEADERSHIP</h2>
      <div class="pf-committee-grid" role="list" aria-label="Organising Committee and Leadership">
        <!-- Chairperson -->
        <article class="pf-committee-card" role="listitem">
          <span class="pf-committee-badge">Chairperson</span>
          <h3 class="pf-committee-name">To Be Confirmed (TBC)</h3>
          <p class="pf-committee-role">Purple Fest Vadodara 2027 Organising Committee</p>
        </article>

        <!-- Director -->
        <article class="pf-committee-card" role="listitem">
          <span class="pf-committee-badge pf-committee-badge--accent">Director</span>
          <h3 class="pf-committee-name">Radha Tandon</h3>
          <p class="pf-committee-role">
            Founder and Director of Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat
          </p>
          <p class="pf-committee-contact">
            <a href="tel:+919974383920" class="pf-committee-link" aria-label="Call Director Radha Tandon at +91 99743 83920">+91 99743 83920</a>
          </p>
        </article>

        <!-- Coordinator -->
        <article class="pf-committee-card" role="listitem">
          <span class="pf-committee-badge pf-committee-badge--accent">Coordinator</span>
          <h3 class="pf-committee-name">Satish Kapoor</h3>
          <p class="pf-committee-role">
            Founding President, Brotherhood, Global Inclusive Education Network, We Care Film Festival on Disabilities and Brotherhood Development Initiative, Delhi
          </p>
          <p class="pf-committee-contact">
            <a href="tel:+919899472065" class="pf-committee-link" aria-label="Call Coordinator Satish Kapoor at +91 98994 72065">+91 98994 72065</a>
            <span aria-hidden="true"> · </span>
            <a href="tel:+919211760202" class="pf-committee-link" aria-label="Call Coordinator Satish Kapoor alternate number +91 92117 60202">+91 92117 60202</a>
          </p>
        </article>

        <!-- Advisors -->
        <article class="pf-committee-card" role="listitem">
          <span class="pf-committee-badge">Advisors</span>
          <div class="pf-committee-advisor-list">
            <div class="pf-committee-advisor-item">
              <h3 class="pf-committee-name">Dr. Nitin Malik</h3>
              <p class="pf-committee-role">Registrar, Gujarat National Law University, Gandhinagar</p>
            </div>
            <div class="pf-committee-advisor-item">
              <h3 class="pf-committee-name">Dr. Ravinder Singh</h3>
              <p class="pf-committee-role">Director, ICMR, Delhi</p>
            </div>
          </div>
        </article>

        <!-- Media Advisor -->
        <article class="pf-committee-card" role="listitem">
          <span class="pf-committee-badge">Media Advisor</span>
          <h3 class="pf-committee-name">Deepak Parvatiyaar</h3>
          <p class="pf-committee-role">Founder and Chief Editor of Global Bihari, Delhi</p>
        </article>
      </div>

      <!-- Official Secretariat & Contact Footer Bar from .docx -->
      <div class="pf-secretariat-bar" role="region" aria-label="Festival Secretariat and Official Contact Details">
        <div class="pf-secretariat-item">
          <span class="pf-secretariat-label">Festival Secretariat Address</span>
          <span class="pf-secretariat-value">Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat</span>
        </div>
        <div class="pf-secretariat-item">
          <span class="pf-secretariat-label">Contact Persons</span>
          <span class="pf-secretariat-value">Radha Tandon (<a href="tel:+919974383920">+91 99743 83920</a>) · Satish Kapoor (<a href="tel:+919899472065">+91 98994 72065</a>, <a href="tel:+919211760202">+91 92117 60202</a>)</span>
        </div>
        <div class="pf-secretariat-item">
          <span class="pf-secretariat-label">Official Website &amp; Email</span>
          <span class="pf-secretariat-value"><a href="https://purplefestivalvadodara.com" target="_blank" rel="noopener noreferrer">Purplefestivalvadodara.com</a> · <a href="mailto:purplefestivalvadodara@gmail.com">purplefestivalvadodara@gmail.com</a></span>
        </div>
      </div>
    </div>
  </div>
`.trim();

export const SPONSORS_SECTION_HTML = `<section id="sponsors-and-partners" class="pf-sponsors-strategic-section" aria-label="Organisers, Knowledge Partner, Venue Partners and Strategic Partners">${SPONSORS_INNER_HTML}</section>`;

export const SPONSORS_SECTION_CSS = `
/* === TASK 2: SPONSORS, ORGANISERS, VENUE & STRATEGIC PARTNERS SECTION === */
.pf-sponsors-strategic-section {
  position: relative;
  z-index: 2;
  width: 100%;
  background: linear-gradient(180deg, #071946 0%, #0B2159 52%, #071946 100%) !important;
  background-color: #071946 !important;
  color: #FFFFFF !important;
  padding: 72px 0 76px;
  border-top: 3px solid rgba(243, 144, 63, 0.78);
  border-bottom: 3px solid rgba(243, 144, 63, 0.45);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.pf-sponsors-container {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 24px;
}

.pf-sponsors-tier {
  width: 100%;
}

.pf-sponsors-tier-heading {
  text-align: center;
  font-size: clamp(18px, 2vw, 23px) !important;
  font-weight: 800 !important;
  line-height: 1.3 !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  color: #F3903F !important;
  margin: 0 auto 34px !important;
}

.pf-sponsors-divider {
  width: 68px;
  height: 2px;
  background-color: #F3903F;
  margin: 46px auto;
  border-radius: 2px;
}

/* 5-Card Row Matching Reference Screenshot (media_1793135269073_11d93ce6.png) */
.pf-sponsors-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
  justify-content: center;
}

.pf-sponsor-card {
  background-color: #FFFFFF !important;
  color: #162347 !important;
  border-radius: 16px !important;
  padding: 18px 16px 14px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0 10px 26px rgba(3, 10, 34, 0.34), 0 2px 6px rgba(3, 10, 34, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.92);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  min-height: 174px;
}

.pf-sponsor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 34px rgba(3, 10, 34, 0.45), 0 0 0 2px #F3903F;
}

.pf-sponsor-logo-stage {
  width: 100%;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  background-color: #FFFFFF !important;
  border-radius: 10px;
}

.pf-sponsor-logo-img {
  max-height: 78px;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.pf-sponsor-logo-img--svg {
  width: 100%;
  max-height: 82px;
}

.pf-sponsor-card-meta {
  width: 100%;
  margin-top: 10px;
  padding-top: 9px;
  border-top: 1px solid rgba(22, 35, 71, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.pf-sponsor-role-tag {
  display: inline-block;
  font-size: 10px !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  padding: 2px 8px;
  border-radius: 999px;
  background-color: #EEF2FF;
  color: #202D59 !important;
}

.pf-sponsor-role-tag--gold {
  background-color: #FFF4E5;
  color: #B45309 !important;
}

.pf-sponsor-org-name {
  font-size: 12.5px !important;
  font-weight: 700 !important;
  line-height: 1.32 !important;
  color: #162347 !important;
  margin: 0 !important;
}

.pf-sponsor-org-sub {
  font-size: 11px !important;
  font-weight: 600 !important;
  line-height: 1.28 !important;
  color: #475569 !important;
  margin: 0 !important;
}

/* Tier 3: Organising Committee & Leadership Cards */
.pf-committee-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.pf-committee-card {
  background-color: #FFFFFF !important;
  color: #162347 !important;
  border-radius: 16px !important;
  padding: 18px 16px !important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  box-shadow: 0 10px 26px rgba(3, 10, 34, 0.3);
  border-top: 4px solid #202D59;
}

.pf-committee-badge {
  display: inline-block;
  font-size: 10.5px !important;
  font-weight: 800 !important;
  letter-spacing: 0.09em !important;
  text-transform: uppercase !important;
  padding: 3px 10px;
  border-radius: 999px;
  background-color: #202D59;
  color: #FFFFFF !important;
  margin-bottom: 10px;
}

.pf-committee-badge--accent {
  background-color: #D97706;
  color: #FFFFFF !important;
}

.pf-committee-name {
  font-size: 15px !important;
  font-weight: 800 !important;
  line-height: 1.3 !important;
  color: #162347 !important;
  margin: 0 0 6px 0 !important;
}

.pf-committee-role {
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 1.45 !important;
  color: #334155 !important;
  margin: 0 !important;
}

.pf-committee-contact {
  margin: 8px 0 0 0 !important;
  padding-top: 8px;
  border-top: 1px dashed rgba(22, 35, 71, 0.16);
  width: 100%;
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #202D59 !important;
}

.pf-committee-link {
  color: #202D59 !important;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.pf-committee-advisor-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.pf-committee-advisor-item + .pf-committee-advisor-item {
  padding-top: 8px;
  border-top: 1px solid rgba(22, 35, 71, 0.1);
}

/* Official Secretariat Bar */
.pf-secretariat-bar {
  margin-top: 22px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(243, 144, 63, 0.38);
  border-radius: 14px;
  padding: 14px 20px;
  display: grid;
  grid-template-columns: 1.4fr 1.1fr 1fr;
  gap: 16px;
  align-items: center;
}

.pf-secretariat-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.pf-secretariat-label {
  font-size: 10.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: #F3903F !important;
}

.pf-secretariat-value {
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 1.4 !important;
  color: #F8FAFC !important;
}

.pf-secretariat-value a {
  color: #FFD28A !important;
  text-decoration: underline;
  font-weight: 700;
}

/* Responsive Breakpoints */
@media (max-width: 1120px) {
  .pf-sponsors-grid,
  .pf-committee-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .pf-secretariat-bar {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .pf-sponsors-strategic-section {
    padding: 52px 0 56px;
  }
  .pf-sponsors-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  .pf-committee-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .pf-sponsor-card {
    padding: 14px 12px 12px !important;
    min-height: 158px;
  }
}

@media (max-width: 440px) {
  .pf-sponsors-grid {
    grid-template-columns: 1fr;
  }
}

/* High Contrast Mode 2: Dark */
html.pf-contrast-dark .pf-sponsors-strategic-section {
  background: #0D0517 !important;
  border-color: #B388EB !important;
}
html.pf-contrast-dark .pf-sponsor-card,
html.pf-contrast-dark .pf-committee-card {
  background-color: #1A0B2B !important;
  color: #F5EEFC !important;
  border: 1.5px solid #7D4BB8 !important;
}
html.pf-contrast-dark .pf-sponsor-logo-stage {
  background-color: #FFFFFF !important;
}
html.pf-contrast-dark .pf-sponsor-org-name,
html.pf-contrast-dark .pf-committee-name {
  color: #FFFFFF !important;
}
html.pf-contrast-dark .pf-sponsor-org-sub,
html.pf-contrast-dark .pf-committee-role {
  color: #E2D4F0 !important;
}

/* High Contrast Mode 3: Yellow on Black */
html.pf-contrast-yellow-black .pf-sponsors-strategic-section {
  background: #000000 !important;
  border-color: #FFFF00 !important;
}
html.pf-contrast-yellow-black .pf-sponsor-card,
html.pf-contrast-yellow-black .pf-committee-card,
html.pf-contrast-yellow-black .pf-secretariat-bar {
  background-color: #000000 !important;
  color: #FFFF00 !important;
  border: 2px solid #FFFF00 !important;
}
html.pf-contrast-yellow-black .pf-sponsor-logo-stage {
  background-color: #FFFFFF !important;
  border: 2px solid #FFFF00 !important;
}
/* === END TASK 2: SPONSORS & STRATEGIC PARTNERS SECTION === */
`.trim();

/**
 * Injects `<section id="sponsors-and-partners" ...>` directly before `<section class="cta-section">`
 * inside `_next/static/chunks/317-ed7330059b349994.js` (module 8204 CTASection) so React client rendering
 * and hydration always keep `#sponsors-and-partners` directly above `.cta-section`.
 */
export function applySponsorsTo317Chunk(chunk317Code) {
  if (typeof chunk317Code !== 'string') return chunk317Code;
  if (chunk317Code.includes('id:"sponsors-and-partners"')) return chunk317Code;

  const ctaStartTarget = '(0,r.jsx)("section",{ref:S,className:"cta-section",children:';
  const moduleEndTarget = '}},1635:function(e,l,a){';

  const startIdx = chunk317Code.indexOf(ctaStartTarget);
  if (startIdx === -1) return chunk317Code;

  const endIdx = chunk317Code.indexOf(moduleEndTarget, startIdx);
  if (endIdx === -1) return chunk317Code;

  const originalCtaJsx = chunk317Code.slice(startIdx, endIdx);
  const sponsorsReactNode = `(0,r.jsx)("section",{id:"sponsors-and-partners",className:"pf-sponsors-strategic-section","aria-label":"Organisers, Knowledge Partner, Venue Partners and Strategic Partners",dangerouslySetInnerHTML:{__html:${JSON.stringify(SPONSORS_INNER_HTML)}}})`;
  const wrappedJsx = `(0,r.jsxs)(r.Fragment,{children:[${sponsorsReactNode},${originalCtaJsx}]})`;

  return chunk317Code.slice(0, startIdx) + wrappedJsx + chunk317Code.slice(endIdx);
}

/**
 * Returns or appends the client-side layout enhancer snippet that guarantees:
 * 1. `SPONSORS_SECTION_CSS` is present in `<head>`
 * 2. `<section id="sponsors-and-partners">` sits directly above `<section class="cta-section">`
 * Works whether called as `c = applySponsorsToLayoutEnhancer(c)` OR `c += applySponsorsToLayoutEnhancer()`.
 */
export function applySponsorsToLayoutEnhancer(layoutChunkCode) {
  const enhancerJs = `
;(function(){
  if(typeof window==="undefined"||window.__pfSponsorsEnhancerInit)return;
  window.__pfSponsorsEnhancerInit=true;
  var SPONSORS_CSS=${JSON.stringify(SPONSORS_SECTION_CSS)};
  var SPONSORS_INNER=${JSON.stringify(SPONSORS_INNER_HTML)};
  function ensureSponsorsSection(){
    if(!document||!document.body)return;
    if(document.head&&!document.getElementById("pf-sponsors-inline-style")){
      var st=document.createElement("style");
      st.id="pf-sponsors-inline-style";
      st.textContent=SPONSORS_CSS;
      document.head.appendChild(st);
    }
    var cta=document.querySelector("section.cta-section");
    if(!cta||!cta.parentNode)return;
    var existing=document.querySelectorAll("#sponsors-and-partners");
    if(existing.length>1){
      for(var i=1;i<existing.length;i++){existing[i].remove();}
    }
    var sec=document.getElementById("sponsors-and-partners");
    if(!sec){
      sec=document.createElement("section");
      sec.id="sponsors-and-partners";
      sec.className="pf-sponsors-strategic-section";
      sec.setAttribute("aria-label","Organisers, Knowledge Partner, Venue Partners and Strategic Partners");
      sec.innerHTML=SPONSORS_INNER;
      cta.parentNode.insertBefore(sec,cta);
    }else if(sec.nextElementSibling!==cta){
      cta.parentNode.insertBefore(sec,cta);
    }
  }
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",ensureSponsorsSection);
  }else{
    ensureSponsorsSection();
  }
  var obs=new MutationObserver(function(){ensureSponsorsSection();});
  if(document.documentElement){
    obs.observe(document.documentElement,{childList:true,subtree:true});
  }
})();
`;

  if (typeof layoutChunkCode === 'string') {
    if (layoutChunkCode.includes('__pfSponsorsEnhancerInit')) return layoutChunkCode;
    return layoutChunkCode + enhancerJs;
  }
  return enhancerJs;
}

/**
 * Optional helper for SSR HTML strings: injects `SPONSORS_SECTION_HTML` directly before `<section class="cta-section">`.
 */
export function applySponsorsToSsrHtml(ssrHtml) {
  if (typeof ssrHtml !== 'string') return ssrHtml;
  if (ssrHtml.includes('id="sponsors-and-partners"')) return ssrHtml;
  return ssrHtml.replace(
    /<section class="cta-section">/g,
    `${SPONSORS_SECTION_HTML}<section class="cta-section">`
  );
}
