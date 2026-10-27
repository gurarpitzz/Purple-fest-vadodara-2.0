// Task 1: Purple Fest Vadodara 2027 — 4-Column Boccia-Style Footer Redesign Module
// Matches reference image media_1793135269071_f7363ee2.png + official .docx content

export const FOOTER_INNER_HTML = `<div class="pf-boccia-footer__container container">
  <div class="pf-boccia-footer__grid">
    <!-- Column 1: Brand, Partner Emblems & Follow Us -->
    <div class="pf-boccia-footer__col pf-boccia-footer__col--brand">
      <div class="pf-boccia-footer__logos" aria-label="Official Partner Emblems">
        <span class="pf-boccia-footer__logo-pill">
          <img src="/uploads/pf_logo_emblem.png" alt="Purple Fest Vadodara" width="88" height="36" loading="lazy" />
        </span>
        <span class="pf-boccia-footer__logo-pill">
          <img src="/uploads/pf_logo_praangan.jpg" alt="Praangan" width="84" height="36" loading="lazy" />
        </span>
        <span class="pf-boccia-footer__logo-pill">
          <img src="/uploads/pf_logo_brotherhood.jpg" alt="Brotherhood" width="84" height="36" loading="lazy" />
        </span>
        <span class="pf-boccia-footer__logo-pill">
          <img src="/uploads/pf_logo_tiss_cdsa.jpg" alt="TISS Mumbai CDSA" width="92" height="36" loading="lazy" />
        </span>
        <span class="pf-boccia-footer__logo-pill">
          <img src="/uploads/pf_logo_goa_commission.png" alt="Goa PwD Commission" width="84" height="36" loading="lazy" />
        </span>
        <span class="pf-boccia-footer__logo-pill">
          <img src="/uploads/pf_logo_gien.jpg" alt="GIEN" width="84" height="36" loading="lazy" />
        </span>
      </div>

      <h2 class="pf-boccia-footer__brand-title">Purple Fest Vadodara</h2>

      <p class="pf-boccia-footer__brand-desc">
        Gujarat's landmark national festival for Persons with Disabilities (21–23 January 2027), uniting all 21 Benchmark Disabilities under the RPwD Act 2016 with assistive technology, Paralympic sports, and inclusive education.
      </p>

      <div class="pf-boccia-footer__follow">
        <h3 class="pf-boccia-footer__follow-title">Follow Us</h3>
        <div class="pf-boccia-footer__socials" role="list" aria-label="Social Media Links">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="pf-boccia-footer__social-btn pf-boccia-footer__social-btn--fb" role="listitem">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M13.5 21v-7.5h2.5l.38-3h-2.88V8.63c0-.87.24-1.46 1.49-1.46h1.59V4.5c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.87 1.4-3.87 3.98v2.14H8v3h2.39V21h3.11Z"/>
            </svg>
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="pf-boccia-footer__social-btn pf-boccia-footer__social-btn--x" role="listitem">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="pf-boccia-footer__social-btn pf-boccia-footer__social-btn--ig" role="listitem">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4.2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="pf-boccia-footer__social-btn pf-boccia-footer__social-btn--yt" role="listitem">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95C1.96 8.9 1.96 12 1.96 12s0 3.1.46 4.81a2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95c.46-1.71.46-4.81.46-4.81s0-3.1-.46-4.81ZM10 15.25v-6.5L15.75 12 10 15.25Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Column 2: Quick Links -->
    <div class="pf-boccia-footer__col pf-boccia-footer__col--links">
      <h2 class="pf-boccia-footer__col-title">Quick Links</h2>
      <ul class="pf-boccia-footer__links-list">
        <li>
          <a href="/" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/about-us" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>About Us</span>
          </a>
        </li>
        <li>
          <a href="/viksit-bharat" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>Viksit Bharat @ 2047</span>
          </a>
        </li>
        <li>
          <a href="/programs" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>Programme &amp; 6 Zones</span>
          </a>
        </li>
        <li>
          <a href="/tier-1-program" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>Paralympic Champions</span>
          </a>
        </li>
        <li>
          <a href="/other-services" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>21 Disabilities (RPwD)</span>
          </a>
        </li>
        <li>
          <a href="/events" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>Events &amp; Passes</span>
          </a>
        </li>
        <li>
          <a href="/apply" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>Apply / Register</span>
          </a>
        </li>
        <li>
          <a href="/contact" class="pf-boccia-footer__nav-link">
            <span class="pf-boccia-footer__link-arrow" aria-hidden="true">↗</span>
            <span>Contact Us</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Column 3: Addresses -->
    <div class="pf-boccia-footer__col pf-boccia-footer__col--addresses">
      <h2 class="pf-boccia-footer__col-title">Addresses</h2>
      <div class="pf-boccia-footer__address-list">
        <div class="pf-boccia-footer__address-item">
          <span class="pf-boccia-footer__icon pf-boccia-footer__icon--amber" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" focusable="false">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
          </span>
          <div class="pf-boccia-footer__address-body">
            <strong class="pf-boccia-footer__address-label">Registered / Secretariat Address</strong>
            <p class="pf-boccia-footer__address-text">
              Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat
            </p>
          </div>
        </div>

        <div class="pf-boccia-footer__address-item">
          <span class="pf-boccia-footer__icon pf-boccia-footer__icon--teal" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" focusable="false">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
          </span>
          <div class="pf-boccia-footer__address-body">
            <strong class="pf-boccia-footer__address-label">Venue Partners</strong>
            <p class="pf-boccia-footer__address-text">
              The Maharaja Sayajirao University, Vadodara &amp; GMERS Medical College, Gotri, Vadodara
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Column 4: Contact Us -->
    <div class="pf-boccia-footer__col pf-boccia-footer__col--contact">
      <h2 class="pf-boccia-footer__col-title">Contact Us</h2>
      <ul class="pf-boccia-footer__contact-list">
        <li class="pf-boccia-footer__contact-item">
          <span class="pf-boccia-footer__icon pf-boccia-footer__icon--amber" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" focusable="false">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
            </svg>
          </span>
          <div class="pf-boccia-footer__contact-body">
            <span class="pf-boccia-footer__contact-name">Radha Tandon:</span>
            <a href="tel:+919974383920" class="pf-boccia-footer__contact-link">+91 99743 83920</a>
          </div>
        </li>

        <li class="pf-boccia-footer__contact-item">
          <span class="pf-boccia-footer__icon pf-boccia-footer__icon--amber" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" focusable="false">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
            </svg>
          </span>
          <div class="pf-boccia-footer__contact-body">
            <span class="pf-boccia-footer__contact-name">Satish Kapoor:</span>
            <span class="pf-boccia-footer__phone-group">
              <a href="tel:+919899472065" class="pf-boccia-footer__contact-link">+91 98994 72065</a>,
              <a href="tel:+919211760202" class="pf-boccia-footer__contact-link">+91 92117 60202</a>
            </span>
          </div>
        </li>

        <li class="pf-boccia-footer__contact-item">
          <span class="pf-boccia-footer__icon pf-boccia-footer__icon--teal" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" focusable="false">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 5-8-5V6l8 5 8-5v2.24z"/>
            </svg>
          </span>
          <div class="pf-boccia-footer__contact-body">
            <span class="pf-boccia-footer__contact-name">Email:</span>
            <a href="mailto:purplefestivalvadodara@gmail.com" class="pf-boccia-footer__contact-link">purplefestivalvadodara@gmail.com</a>
          </div>
        </li>

        <li class="pf-boccia-footer__contact-item">
          <span class="pf-boccia-footer__icon pf-boccia-footer__icon--purple" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </span>
          <div class="pf-boccia-footer__contact-body">
            <span class="pf-boccia-footer__contact-name">Website:</span>
            <a href="https://purplefestivalvadodara.com" target="_blank" rel="noopener noreferrer" class="pf-boccia-footer__contact-link">www.purplefestivalvadodara.com</a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Bottom Horizontal Divider & Copyright Bar -->
  <div class="pf-boccia-footer__bottom">
    <p class="pf-boccia-footer__copyright">
      © 2027 Purple Fest Vadodara. All Rights Reserved. | <button type="button" class="pf-a11y-footer-link" data-pf-open-a11y="true" aria-controls="pf-a11y-header-panel" aria-expanded="false" onclick="if(typeof toggleA11yPanel==='function'){toggleA11yPanel();}">Accessibility Statement &amp; Options</button> | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-and-conditions">Terms &amp; Conditions</a>
    </p>
    <p class="pf-boccia-footer__recognition">
      Organised by Praangan, Vadodara, Gujarat | Brotherhood, Delhi | Centre for Disabilities Studies and Action, School of Social Work, Tata Institute of Social Sciences, Mumbai · Knowledge Partner: State Commission for Persons with Disabilities, Goa
    </p>
    <p class="pf-boccia-footer__credit">
      Designed by Gurarpit Singh and Mehardeep Singh. Ajeet Graphics
    </p>
  </div>
</div>`;

export const FOOTER_HTML = `<footer role="contentinfo" class="relative footer mt-auto z-1 pf-boccia-footer">${FOOTER_INNER_HTML}</footer>`;

export const FOOTER_CSS = `
/* ==========================================================================
   PURPLE FEST VADODARA 2027 — 4-COLUMN BOCCIA-STYLE FOOTER (.pf-boccia-footer)
   ========================================================================== */
.pf-boccia-footer {
  position: relative !important;
  margin-top: auto !important;
  z-index: 1 !important;
  background: linear-gradient(135deg, #190E36 0%, #1B1438 52%, #202D59 100%) !important;
  color: #FFFFFF !important;
  padding: 64px 0 36px !important;
  border-top: 3px solid #A459FF !important;
  overflow: hidden !important;
  font-family: '__font_7fb336', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
}

.pf-boccia-footer::before {
  content: "";
  position: absolute;
  top: -120px;
  left: -120px;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, rgba(164, 89, 255, 0.06) 55%, transparent 72%);
  pointer-events: none;
  z-index: 0;
}

.pf-boccia-footer::after {
  content: "";
  position: absolute;
  bottom: -140px;
  right: -110px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(9, 159, 159, 0.18) 0%, rgba(32, 45, 89, 0.25) 60%, transparent 75%);
  pointer-events: none;
  z-index: 0;
}

/* Suppress any legacy injected footer blocks */
.pf-boccia-footer .pf-footer-a11y-block,
.pf-boccia-footer > div:not(.pf-boccia-footer__container) {
  display: none !important;
}

.pf-boccia-footer__container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1340px !important;
  margin: 0 auto !important;
  padding: 0 32px !important;
}

.pf-boccia-footer__grid {
  display: grid !important;
  grid-template-columns: 1.35fr 0.85fr 1.15fr 1.05fr !important;
  gap: 40px !important;
  align-items: start !important;
  padding-bottom: 44px !important;
}

.pf-boccia-footer__col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  min-width: 0;
}

/* Column 1: Partner Logo Strip */
.pf-boccia-footer__logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.pf-boccia-footer__logo-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 4px 10px;
  background-color: #FFFFFF !important;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 3px 10px rgba(9, 5, 24, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.pf-boccia-footer__logo-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(164, 89, 255, 0.32);
}

.pf-boccia-footer__logo-pill img {
  height: 34px !important;
  width: auto !important;
  max-width: 96px !important;
  object-fit: contain !important;
  display: block !important;
}

/* Column 1: Brand Title & Description */
.pf-boccia-footer__brand-title {
  font-size: 22px !important;
  font-weight: 700 !important;
  line-height: 1.28 !important;
  letter-spacing: -0.01em !important;
  color: #FFFFFF !important;
  margin: 0 0 12px 0 !important;
}

.pf-boccia-footer__brand-desc {
  font-size: 14.5px !important;
  line-height: 1.68 !important;
  color: #DDD9F4 !important;
  margin: 0 0 24px 0 !important;
  max-width: 420px;
}

/* Follow Us & Socials */
.pf-boccia-footer__follow {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.pf-boccia-footer__follow-title,
.pf-boccia-footer__col-title {
  position: relative;
  font-size: 19px !important;
  font-weight: 700 !important;
  line-height: 1.3 !important;
  color: #FFFFFF !important;
  margin: 0 0 22px 0 !important;
  padding-bottom: 10px !important;
  letter-spacing: -0.01em !important;
}

.pf-boccia-footer__follow-title::after,
.pf-boccia-footer__col-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 34px;
  height: 3.5px;
  border-radius: 999px;
  background: linear-gradient(90deg, #F59E0B 0%, #099F9F 100%);
}

.pf-boccia-footer__socials {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.pf-boccia-footer__social-btn {
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  min-height: 40px !important;
  border-radius: 9999px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #FFFFFF !important;
  text-decoration: none !important;
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28);
}

.pf-boccia-footer__social-btn:hover {
  transform: translateY(-2px) scale(1.05);
  filter: brightness(1.1);
}

.pf-boccia-footer__social-btn--fb {
  background-color: #1877F2 !important;
}

.pf-boccia-footer__social-btn--x {
  background-color: #0F1419 !important;
  border: 1.5px solid rgba(255, 255, 255, 0.28) !important;
}

.pf-boccia-footer__social-btn--ig {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%) !important;
}

.pf-boccia-footer__social-btn--yt {
  background-color: #FF0000 !important;
}

/* Column 2: Quick Links */
.pf-boccia-footer__links-list {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 11px !important;
  width: 100%;
}

.pf-boccia-footer__links-list li {
  margin: 0 !important;
  padding: 0 !important;
}

.pf-boccia-footer__nav-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 9px !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  line-height: 1.45 !important;
  color: #EAE6FF !important;
  text-decoration: none !important;
  transition: color 0.16s ease, transform 0.16s ease !important;
}

.pf-boccia-footer__nav-link:hover {
  color: #FBBF24 !important;
  transform: translateX(3px);
}

.pf-boccia-footer__link-arrow {
  color: #F59E0B !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  line-height: 1 !important;
  flex-shrink: 0;
  transition: transform 0.16s ease, color 0.16s ease;
}

.pf-boccia-footer__nav-link:hover .pf-boccia-footer__link-arrow {
  color: #099F9F !important;
  transform: translate(2px, -2px);
}

/* Column 3: Addresses */
.pf-boccia-footer__address-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
}

.pf-boccia-footer__address-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.pf-boccia-footer__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  margin-top: 2px;
  flex-shrink: 0;
}

.pf-boccia-footer__icon--amber {
  color: #F59E0B !important;
  background: rgba(245, 158, 11, 0.14);
}

.pf-boccia-footer__icon--teal {
  color: #14B8A6 !important;
  background: rgba(20, 184, 166, 0.16);
}

.pf-boccia-footer__icon--purple {
  color: #C084FC !important;
  background: rgba(192, 132, 252, 0.16);
}

.pf-boccia-footer__address-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pf-boccia-footer__address-label {
  font-size: 15.5px !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  color: #FFFFFF !important;
}

.pf-boccia-footer__address-text {
  font-size: 14px !important;
  line-height: 1.62 !important;
  color: #DDD9F4 !important;
  margin: 0 !important;
}

/* Column 4: Contact Us */
.pf-boccia-footer__contact-list {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  width: 100%;
}

.pf-boccia-footer__contact-item {
  display: flex !important;
  align-items: flex-start !important;
  gap: 12px !important;
  margin: 0 !important;
  padding: 0 !important;
}

.pf-boccia-footer__contact-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14.5px !important;
  line-height: 1.5 !important;
  color: #EAE6FF !important;
  word-break: break-word;
}

.pf-boccia-footer__contact-name {
  font-weight: 700 !important;
  color: #FFFFFF !important;
}

.pf-boccia-footer__phone-group {
  display: inline;
}

.pf-boccia-footer__contact-link {
  color: #EAE6FF !important;
  text-decoration: none !important;
  font-weight: 500 !important;
  transition: color 0.15s ease, text-decoration-color 0.15s ease !important;
}

.pf-boccia-footer__contact-link:hover {
  color: #FBBF24 !important;
  text-decoration: underline !important;
}

/* Bottom Horizontal Divider & Copyright Bar */
.pf-boccia-footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.16) !important;
  padding-top: 26px !important;
  text-align: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 10px !important;
}

.pf-boccia-footer__copyright {
  font-size: 14.5px !important;
  line-height: 1.6 !important;
  color: #EAE6FF !important;
  margin: 0 !important;
}

.pf-boccia-footer__copyright a,
.pf-boccia-footer .pf-a11y-footer-link {
  color: #FFFFFF !important;
  font-weight: 600 !important;
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
  background: transparent !important;
  border: none !important;
  padding: 0 2px !important;
  margin: 0 !important;
  font-family: inherit !important;
  font-size: inherit !important;
  line-height: inherit !important;
  cursor: pointer !important;
  display: inline !important;
  transition: color 0.15s ease !important;
}

.pf-boccia-footer__copyright a:hover,
.pf-boccia-footer .pf-a11y-footer-link:hover {
  color: #FBBF24 !important;
}

.pf-boccia-footer__recognition {
  font-size: 13px !important;
  line-height: 1.6 !important;
  color: #CBC5E8 !important;
  margin: 0 !important;
  max-width: 1120px;
}

.pf-boccia-footer__credit {
  font-size: 13px !important;
  line-height: 1.5 !important;
  color: #DDD9F4 !important;
  font-weight: 600 !important;
  margin: 2px 0 0 0 !important;
}

/* Responsive Breakpoints: 2 columns on tablet, 1 column on mobile */
@media (max-width: 1080px) {
  .pf-boccia-footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 36px 32px !important;
  }
}

@media (max-width: 680px) {
  .pf-boccia-footer {
    padding: 44px 0 28px !important;
  }
  .pf-boccia-footer__container {
    padding: 0 20px !important;
  }
  .pf-boccia-footer__grid {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 32px !important;
    padding-bottom: 32px !important;
  }
  .pf-boccia-footer__logo-pill {
    height: 40px;
    padding: 4px 8px;
  }
  .pf-boccia-footer__logo-pill img {
    height: 30px !important;
  }
}

/* High Contrast Mode: Dark (html.pf-contrast-dark & body.high-contrast) */
html.pf-contrast-dark .pf-boccia-footer,
body.high-contrast .pf-boccia-footer {
  background: #0D0517 !important;
  color: #F5EEFC !important;
  border-top: 3px solid #B388EB !important;
}

html.pf-contrast-dark .pf-boccia-footer__brand-desc,
html.pf-contrast-dark .pf-boccia-footer__address-text,
html.pf-contrast-dark .pf-boccia-footer__contact-body,
html.pf-contrast-dark .pf-boccia-footer__recognition,
html.pf-contrast-dark .pf-boccia-footer__credit,
html.pf-contrast-dark .pf-boccia-footer__copyright,
body.high-contrast .pf-boccia-footer__brand-desc,
body.high-contrast .pf-boccia-footer__address-text,
body.high-contrast .pf-boccia-footer__contact-body,
body.high-contrast .pf-boccia-footer__recognition,
body.high-contrast .pf-boccia-footer__credit,
body.high-contrast .pf-boccia-footer__copyright {
  color: #F5EEFC !important;
}

html.pf-contrast-dark .pf-boccia-footer__nav-link,
html.pf-contrast-dark .pf-boccia-footer__contact-link,
html.pf-contrast-dark .pf-boccia-footer__copyright a,
html.pf-contrast-dark .pf-boccia-footer .pf-a11y-footer-link,
body.high-contrast .pf-boccia-footer__nav-link,
body.high-contrast .pf-boccia-footer__contact-link,
body.high-contrast .pf-boccia-footer__copyright a,
body.high-contrast .pf-boccia-footer .pf-a11y-footer-link {
  color: #5EEAD4 !important;
}

/* High Contrast Mode: Yellow on Black (html.pf-contrast-yellow-black) */
html.pf-contrast-yellow-black .pf-boccia-footer {
  background: #000000 !important;
  color: #FFFF00 !important;
  border-top: 3px solid #FFFF00 !important;
}

html.pf-contrast-yellow-black .pf-boccia-footer::before,
html.pf-contrast-yellow-black .pf-boccia-footer::after {
  display: none !important;
}

html.pf-contrast-yellow-black .pf-boccia-footer__logo-pill {
  background-color: #FFFFFF !important;
  border: 2px solid #FFFF00 !important;
}

html.pf-contrast-yellow-black .pf-boccia-footer__follow-title::after,
html.pf-contrast-yellow-black .pf-boccia-footer__col-title::after {
  background: #FFFF00 !important;
}

html.pf-contrast-yellow-black .pf-boccia-footer__nav-link,
html.pf-contrast-yellow-black .pf-boccia-footer__contact-link,
html.pf-contrast-yellow-black .pf-boccia-footer__copyright a,
html.pf-contrast-yellow-black .pf-boccia-footer .pf-a11y-footer-link,
html.pf-contrast-yellow-black .pf-boccia-footer__social-btn {
  background-color: #000000 !important;
  color: #00FFFF !important;
  border: 2px solid #FFFF00 !important;
}

html.pf-contrast-yellow-black .pf-boccia-footer__nav-link {
  padding: 2px 6px !important;
}
`;

/**
 * Replaces the SSR <footer>...</footer> inside an HTML string with FOOTER_HTML.
 */
export function applyFooterToSsrHtml(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return htmlString;
  return htmlString.replace(
    /<footer\b[^>]*>[\s\S]*?<\/footer>/i,
    FOOTER_HTML
  );
}

/**
 * Replaces the React Footer components y() and E() inside _next/static/chunks/app/layout-cacaa35457036801.js
 * and adds a DOM/CSS guard so React hydration preserves .pf-boccia-footer 100% without reverting.
 */
export function applyFooterToLayoutChunk(layoutChunkCode) {
  if (!layoutChunkCode || typeof layoutChunkCode !== 'string') return layoutChunkCode;
  let out = layoutChunkCode;

  // 1. Replace standard Footer component function y(){...} up to var w=l(8251)
  const yStart = out.indexOf('function y(){');
  const yEnd = out.indexOf('var w=l(8251)', yStart);
  if (yStart !== -1 && yEnd !== -1) {
    const newY = `function y(){let f=g();return(0,a.jsx)("footer",{role:"contentinfo",className:"relative footer mt-auto z-1 pf-boccia-footer",ref:f,dangerouslySetInnerHTML:{__html:${JSON.stringify(FOOTER_INNER_HTML)}}})}`;
    out = out.slice(0, yStart) + newY + out.slice(yEnd);
  }

  // 2. Replace TPO Footer component function E(){...} up to var H=l(5625)
  const eStart = out.indexOf('function E(){');
  const eEnd = out.indexOf('var H=l(5625)', eStart);
  if (eStart !== -1 && eEnd !== -1) {
    const newE = `function E(){return y()}`;
    out = out.slice(0, eStart) + newE + out.slice(eEnd);
  }

  // 3. If wcagEnhancerJs is already present in layoutChunkCode, prevent it from appending .pf-footer-a11y-block
  out = out.replace(
    'if(ft.querySelector(".pf-a11y-footer-btn"))return;',
    'if(ft.querySelector(".pf-a11y-footer-btn, .pf-a11y-footer-link")||ft.classList.contains("pf-boccia-footer"))return;'
  );
  out = out.replace(
    'document.querySelectorAll(".pf-a11y-header-btn, .pf-a11y-footer-btn, #a11y-toggle-btn")',
    'document.querySelectorAll(".pf-a11y-header-btn, .pf-a11y-footer-btn, .pf-a11y-footer-link, #a11y-toggle-btn")'
  );

  // 4. Append idempotent runtime CSS + DOM synchronizer so .pf-boccia-footer is preserved even if enhanceDom() runs after
  if (!out.includes('__pfBocciaFooterSync')) {
    const runtimeSyncJs = `
;(function(){
  if(typeof window==="undefined"||window.__pfBocciaFooterSync)return;
  window.__pfBocciaFooterSync=true;
  var FOOTER_INNER=${JSON.stringify(FOOTER_INNER_HTML)};
  var FOOTER_STYLE=${JSON.stringify(FOOTER_CSS)};
  function syncBocciaFooter(){
    if(document.head&&!document.getElementById("pf-boccia-footer-css")){
      var st=document.createElement("style");
      st.id="pf-boccia-footer-css";
      st.textContent=FOOTER_STYLE;
      document.head.appendChild(st);
    }
    document.querySelectorAll("footer").forEach(function(ft){
      if(!ft.classList.contains("pf-boccia-footer")){
        ft.className="relative footer mt-auto z-1 pf-boccia-footer";
        ft.setAttribute("role","contentinfo");
      }
      if(!ft.querySelector(".pf-boccia-footer__grid")){
        ft.innerHTML=FOOTER_INNER;
      }
      ft.querySelectorAll(".pf-footer-a11y-block").forEach(function(b){b.remove();});
    });
  }
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",syncBocciaFooter);
  }else{
    syncBocciaFooter();
  }
  var fObs=new MutationObserver(function(){
    document.querySelectorAll("footer .pf-footer-a11y-block").forEach(function(b){b.remove();});
    document.querySelectorAll("footer:not(.pf-boccia-footer)").forEach(function(){syncBocciaFooter();});
  });
  if(document.documentElement){
    fObs.observe(document.documentElement,{childList:true,subtree:true});
  }
})();`;
    out += runtimeSyncJs;
  }

  return out;
}

/**
 * Updates a standalone portal HTML string (apply.html, events.html, pass.html, check-in.html, admin.html)
 * by injecting FOOTER_CSS into <head> and replacing <footer> with FOOTER_HTML.
 * @param {string} html
 * @returns {string}
 */
export function applyFooterToStandaloneHtml(html) {
  if (!html || typeof html !== 'string') return html;
  let out = html;

  // Remove any previous injected task1 footer style block so this function is idempotent
  out = out.replace(/<style id="pf-task1-footer-css">[\s\S]*?<\/style>\s*/g, '');

  // Inject FOOTER_CSS right before </head>
  const styleTag = `<style id="pf-task1-footer-css">${FOOTER_CSS}</style>\n</head>`;
  out = out.replace(/<\/head>/i, styleTag);

  // Remove duplicate inner delegate-footer in apply.html so there is a single authoritative site footer
  out = out.replace(/<!-- Delegate Footer -->\s*<footer class="delegate-footer"[\s\S]*?<\/footer>/g, '');

  // Replace any remaining <footer>...</footer> with FOOTER_HTML
  out = out.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/g, FOOTER_HTML);

  return out;
}

export default {
  FOOTER_INNER_HTML,
  FOOTER_HTML,
  FOOTER_CSS,
  applyFooterToSsrHtml,
  applyFooterToLayoutChunk,
  applyFooterToStandaloneHtml
};

// When executed directly with `--apply-standalone`, update standalone portal HTML files and verify layout chunk patching
if (typeof process !== 'undefined' && process.argv && process.argv.includes('--apply-standalone')) {
  Promise.all([import('fs'), import('path'), import('url')]).then(([fsMod, pathMod, urlMod]) => {
    const fs = fsMod.default || fsMod;
    const path = pathMod.default || pathMod;
    const __dirname = path.dirname(urlMod.fileURLToPath(import.meta.url));
    const rootDir = path.resolve(__dirname, '..');

    const origLayoutPath = path.resolve(rootDir, '..', 'battalion-original', '_next', 'static', 'chunks', 'app', 'layout-cacaa35457036801.js');
    if (fs.existsSync(origLayoutPath)) {
      const orig = fs.readFileSync(origLayoutPath, 'utf8');
      const patched = applyFooterToLayoutChunk(orig);
      if (patched === orig || !patched.includes('pf-boccia-footer')) {
        throw new Error('Layout chunk patch verification failed');
      }
      console.log('[task1-footer] Verified applyFooterToLayoutChunk against original layout chunk (' + patched.length + ' bytes)');
    }

    const standaloneFiles = ['apply.html', 'events.html', 'pass.html', 'check-in.html', 'admin.html'];
    for (const file of standaloneFiles) {
      const fullPath = path.join(rootDir, file);
      if (!fs.existsSync(fullPath)) continue;
      const html = fs.readFileSync(fullPath, 'utf8');
      const updated = applyFooterToStandaloneHtml(html);
      fs.writeFileSync(fullPath, updated, 'utf8');
      console.log('[task1-footer] Updated standalone footer:', file);

      const subIndex = path.join(rootDir, file.replace(/\.html$/, ''), 'index.html');
      if (fs.existsSync(subIndex)) {
        fs.writeFileSync(subIndex, updated, 'utf8');
        console.log('[task1-footer] Synced subdirectory footer:', file.replace(/\.html$/, '') + '/index.html');
      }
    }
  }).catch((err) => {
    console.error('[task1-footer] Error:', err);
    process.exit(1);
  });
}


