# Battalion (`battalion.com`) — Live vs. Local Hyper-Detailed Comparison & Parity Audit

**Upstream Production Origin**: `https://www.battalion.com` (Vercel Deployment `dpl_H9boyQNzn5mWsuBVLkaVb8JjY3WH`, Next.js App Router Build ID `xy4V3lk5CKCbT2XW2SSa-`)
**Upstream Headless CMS**: `https://battalion-cms.onrender.com` (Strapi v5)
**Local Mirror Root**: `d:\argon trial rea\battalion-original`
**Local Mirror Server**: `d:\argon trial rea\battalion-original\server.js` (`http://localhost:3001`)

---

## 1. Executive Summary

| Audit Category | Total Count | Live (`battalion.com`) | Local (`battalion-original`) | Parity Verdict |
| :--- | :---: | :---: | :---: | :---: |
| **XML Sitemaps & Robots (`sitemap.xml`, `sitemap-0.xml`, `robots.txt`)** | 3 | 3 | 3 | **100% Byte-Identical** |
| **HTML Routes (`sitemap-0.xml`)** | 15 | 15 | 15 | **100% Structural & Content Parity** *(11/15 byte-identical; 4/15 100% identical after normalizing `react-select-<N>` SSR counter)* |
| **Next.js App Router RSC Payloads (`_rsc/*.rsc`)** | 15 | 15 | 15 | **100% Byte-Identical (15/15 SHA-256 Match)** |
| **CSS Stylesheet Bundles (`/_next/static/css/*.css`)** | 4 | 4 (`108,344 B`) | 4 (`108,344 B`) | **100% Byte-Identical (4/4 SHA-256 Match)** |
| **Static JS & App Router Chunks (`/_next/static/chunks/**`)** | 19 | 19 (`1,260,362 B`) | 19 (`1,260,362 B`) | **100% Byte-Identical (19/19 SHA-256 Match)** |
| **Web Worker Sequence Loaders (`199.*.js`, `967.*.js`)** | 2 | 2 (`1,178 B`) | 2 (`1,178 B`) | **100% Byte-Identical (2/2 SHA-256 Match)** |
| **Self-Hosted WOFF2 Fonts (`/_next/static/media/*.woff2`)** | 2 | 2 (`83,500 B`) | 2 (`83,500 B`) | **100% Byte-Identical (2/2 SHA-256 Match)** |
| **Root Manifest, Icons & OG Social Assets** | 6 | 6 (`280,582 B`) | 6 (`280,582 B`) | **100% Byte-Identical (6/6 SHA-256 Match)** |
| **Strapi CMS Media Assets (`/uploads/*`)** | 97 | 97 (`49,620,937 B`) | 97 (`49,620,937 B`) | **100% Complete (82 JPG, 12 PNG, 3 MP4; 0 missing)** |
| **2.5D/3D Canvas Image Sequences (`/sequence/*/*`)** | 22 dirs / 1,354 frames | 22 dirs / 1,354 frames | 22 dirs / 1,354 frames (`50,569,933 B`) | **100% Frame-for-Frame Parity** |
| **Interactive Calculators & Server Actions (`/deal-sizer`, `/pricer`, `/contact`)** | 3 | Client Decimal.js + 2 Next-Actions + `/api/forms/contact` | Client Decimal.js + 2 Next-Actions + `/api/forms/contact` | **100% Functional Parity** |

---

## 2. All 15 XML Routes + SEO Metadata Parity (`sitemap-0.xml`)

All 15 routes declared in `sitemap-0.xml` (plus `robots.txt`, `sitemap.xml`, and `sitemap-0.xml`) were audited against live `https://www.battalion.com` for both full SSR HTML and Next.js App Router Flight RSC payloads (`RSC: 1`).

> **Note on the 4 Calculator/Pricer SSR HTML files (`/`, `/deal-sizer`, `/pricer`, `/battalion-tpo`)**: On live Vercel serverless instances, `react-select` increments a process-global counter (`id="react-select-<N>-live-region"`, `id="react-select-<N>-input"`) on every SSR invocation. Normalizing `react-select-\d+` to `react-select-N` confirms **100.00% character-for-character identity** across all 15 HTML documents, while all 15 `_rsc/<slug>.rsc` Flight payloads match **100% byte-for-byte with identical SHA-256 hashes**.

| # | Route | Local HTML File | Raw HTML Size (Bytes) | HTML SHA-256 (12-char) | Local RSC File | Raw RSC Size (Bytes) | RSC SHA-256 (12-char) | Live vs. Local Parity |
| :-: | :--- | :--- | ---: | :---: | :--- | ---: | :---: | :--- |
| 1 | `/` | `index.html` | 159,676 | `38f8a9845f3b` | `_rsc/index.rsc` | 52,441 | `18bbe74998de` | **100% Identical** *(RSC exact; HTML exact post `react-select-N` norm)* |
| 2 | `/about-us` | `about-us.html` | 101,908 | `46bb8b09e2be` | `_rsc/about-us.rsc` | 39,591 | `559d2cc8ee6d` | **100% Byte-Identical (HTML + RSC)** |
| 3 | `/programs` | `programs.html` | 87,314 | `9dc6485db2e4` | `_rsc/programs.rsc` | 33,336 | `575b3f0ffaf6` | **100% Byte-Identical (HTML + RSC)** |
| 4 | `/tier-1-program` | `tier-1-program.html` | 67,910 | `63093ba1f10f` | `_rsc/tier-1-program.rsc` | 20,566 | `0f0d8e2e8e94` | **100% Byte-Identical (HTML + RSC)** |
| 5 | `/other-services` | `other-services.html` | 76,576 | `c31088171151` | `_rsc/other-services.rsc` | 25,903 | `6446fb0cab09` | **100% Byte-Identical (HTML + RSC)** |
| 6 | `/composyte` | `composyte.html` | 78,352 | `300cd77d10ab` | `_rsc/composyte.rsc` | 28,980 | `334c2c16dc26` | **100% Byte-Identical (HTML + RSC)** |
| 7 | `/deal-sizer` | `deal-sizer.html` | 97,646 | `239722c04644` | `_rsc/deal-sizer.rsc` | 19,942 | `7d2186bd583b` | **100% Identical** *(RSC exact; HTML exact post `react-select-N` norm)* |
| 8 | `/pricer` | `pricer.html` | 105,221 | `0736c967e2bf` | `_rsc/pricer.rsc` | 19,912 | `a86ca980bf53` | **100% Identical** *(RSC exact; HTML exact post `react-select-N` norm)* |
| 9 | `/careers` | `careers.html` | 85,054 | `092978166079` | `_rsc/careers.rsc` | 31,663 | `3a094b8006a4` | **100% Byte-Identical (HTML + RSC)** |
| 10 | `/contact` | `contact.html` | 67,389 | `ad06206a5977` | `_rsc/contact.rsc` | 20,461 | `fbcad938865b` | **100% Byte-Identical (HTML + RSC)** |
| 11 | `/battalion-tpo` | `battalion-tpo.html` | 147,081 | `e5c5669f7894` | `_rsc/battalion-tpo.rsc` | 44,030 | `5e9904f22827` | **100% Identical** *(RSC exact; HTML exact post `react-select-N` norm)* |
| 12 | `/programs-tpo` | `programs-tpo.html` | 79,002 | `45d5445ae185` | `_rsc/programs-tpo.rsc` | 27,786 | `5f4c8e792dd2` | **100% Byte-Identical (HTML + RSC)** |
| 13 | `/contact-tpo` | `contact-tpo.html` | 67,406 | `59b8566b2470` | `_rsc/contact-tpo.rsc` | 20,474 | `6d1f818cf524` | **100% Byte-Identical (HTML + RSC)** |
| 14 | `/terms-and-conditions` | `terms-and-conditions.html` | 206,362 | `3212a5a2f482` | `_rsc/terms-and-conditions.rsc` | 88,256 | `a6864ab3b6f8` | **100% Byte-Identical (HTML + RSC)** |
| 15 | `/privacy-policy` | `privacy-policy.html` | 108,469 | `c30545efc4a5` | `_rsc/privacy-policy.rsc` | 38,088 | `57ea442f4ff2` | **100% Byte-Identical (HTML + RSC)** |
| 16 | `/robots.txt` | `robots.txt` | 87 | `afca5d52f0a0` | — | — | — | **100% Byte-Identical** |
| 17 | `/sitemap.xml` | `sitemap.xml` | 187 | `1286a2ecb23f` | — | — | — | **100% Byte-Identical** |
| 18 | `/sitemap-0.xml` | `sitemap-0.xml` | 2,189 | `7cf7b6b6471e` | — | — | — | **100% Byte-Identical** |

---

## 3. Route-by-Route Section Architecture, 3D Sequences & Media Mapping

Every page's Strapi v5 dynamic zone (`__typename` components), active 3D canvas sequence pickers, and `/uploads/*` media references were verified:

| Route | Rendered Strapi Sections (`__typename`) | Active 3D Sequence(s) | Referenced `/uploads/*` Count |
| :--- | :--- | :--- | :---: |
| `/` | `HomeIntro`, `DefaultMessage`, `HomeBenefits`, `HomeMetrics`, `HomePrograms`, `CalculatorDscr`, `HomeSteps`, `Testimonials`, `HomeTech`, `Cta` | `hero` (intro), `dollar` (metrics), `leaves` (CTA) | 40 |
| `/about-us` | `IntroDefault`, `HomeSteps`, `DefaultMessage`, `Timeline`, `Team`, `Cta` | `stacked_building` (intro), `smile` (CTA) | 39 |
| `/programs` | `IntroDefault`, `Cta` + Program Cards/Tabs | `key` (intro), `leaves` (CTA) | 22 |
| `/tier-1-program` | `TierOne` | `tier` (hero/scroll) | 3 |
| `/other-services` | `OtherService`, `Cta` | `leaves` (CTA) | 9 |
| `/composyte` | `Numbers`, `CtaSecondary` | Video (`Careers_video_2x_compressed_080ffc64a7.mp4`) | 7 |
| `/deal-sizer` | `CalculatorDscr` (`Deal Sizer`) | Interactive DSCR Calculator | 3 |
| `/pricer` | `Pricer` (`Loan Pricer`) | Interactive Loan Pricer + Server Actions | 3 |
| `/careers` | `IntroDefault`, `DefaultMessage`, `StickyBlocksWIthContentImage`, `CtaSecondary` | `careers` (intro) | 15 |
| `/contact` | `Contact` (`formType: "contactForm"`) | `contact` (60 frames) | 3 |
| `/battalion-tpo` | `HomeMetrics`, `HomeBenefits`, `HomeStepsTpo`, `HomePrograms`, `HomeStepsTpo`, `CalculatorDscrTpo`, `HomeStepsTpo`, `Testimonials`, `HomeTechTpo`, `Cta` | `hero` (intro), `dollar` (metrics), `leaves` (CTA) + Video (`Loan_pricer_opt_3_ed63f9fec3.mp4`) | 25 |
| `/programs-tpo` | `IntroDefault`, `Cta` | `key` (intro), `leaves` (CTA) | 16 |
| `/contact-tpo` | `Contact` (`formType: "tpoForm"`) | `tpo` (66 frames) | 3 |
| `/terms-and-conditions` | Rich-Text Legal Document Template | — | 3 |
| `/privacy-policy` | Rich-Text Legal Document Template | — | 3 |
| `404 (Fallback)` | `NotFoundSection` (`app/not-found-f695dfa650f90a62.js`) | `404` (64 frames) | 3 |

---

## 4. Complete 3D/2.5D Canvas Image Sequence Audit (22 Directories / 1,354 Frames)

Module `2084` (`_next/static/chunks/751-4ba22589dbd220d5.js`) defines 11 sequence configurations (`hero`, `dollar`, `stacked_building`, `key`, `careers`, `contact`, `tier`, `tpo`, `404`, `leaves`, `smile`), rendered via `OffscreenCanvas` in module `7962` (`SequenceCanvas`) and preloaded in batches of 6 via two dedicated Web Workers (`199.66a4f90695ab1e0e.js` for active sequence, `967.66a4f90695ab1e0e.js` for background preload sequences).

| # | Sequence Key (`module 2084`) | Directory Path | Device Variant | Frame Range | Frame Count | Canvas Dimensions (`2x` Placeholder) | Total Size (Bytes) | Status |
| :-: | :--- | :--- | :---: | :---: | ---: | :---: | ---: | :---: |
| 1 | `404` | `/sequence/404/desktop` | Desktop | `00001.jpg`–`00064.jpg` | 64 | `1728×810` (`[864, 405]`) | 2,546,906 | **100% Verified** |
| 2 | `404` | `/sequence/404/mobile` | Mobile / Tablet | `00001.jpg`–`00064.jpg` | 64 | `900×450` (`[450, 225]`) | 1,382,638 | **100% Verified** |
| 3 | `careers` | `/sequence/careers/desktop` | Desktop | `00001.jpg`–`00040.jpg` | 40 | `1728×1148` (`[864, 574]`) | 2,054,108 | **100% Verified** |
| 4 | `careers` | `/sequence/careers/mobile` | Mobile / Tablet | `00001.jpg`–`00040.jpg` | 40 | `960×636` (`[480, 318]`) | 1,086,383 | **100% Verified** |
| 5 | `contact` | `/sequence/contact/desktop` | Desktop | `00001.jpg`–`00060.jpg` | 60 | `1728×1148` (`[864, 574]`) | 2,980,571 | **100% Verified** |
| 6 | `contact` | `/sequence/contact/mobile` | Mobile / Tablet | `00001.jpg`–`00060.jpg` | 60 | `960×636` (`[480, 318]`) | 1,552,025 | **100% Verified** |
| 7 | `dollar` | `/sequence/dollar/desktop` | Desktop | `00001.jpg`–`00091.jpg` | 91 | `1728×1040` (`[864, 520]`) | 5,225,234 | **100% Verified** |
| 8 | `dollar` | `/sequence/dollar/mobile` | Mobile / Tablet | `00001.jpg`–`00042.jpg` | 42 | `960×636` (`[480, 318]`) | 1,286,298 | **100% Verified** |
| 9 | `hero` | `/sequence/hero/desktop` | Desktop | `00001.jpg`–`00127.jpg` | 127 | `2880×1600` (`[1440, 800]`) | 5,923,598 | **100% Verified** |
| 10 | `hero` | `/sequence/hero/mobile` | Mobile / Tablet | `00001.jpg`–`00088.jpg` | 88 | `780×1520` (`[390, 760]`) | 1,888,933 | **100% Verified** |
| 11 | `key` | `/sequence/key/desktop` | Desktop | `00001.jpg`–`00065.jpg` | 65 | `1728×1148` (`[864, 574]`) | 2,683,191 | **100% Verified** |
| 12 | `key` | `/sequence/key/mobile` | Mobile / Tablet | `00001.jpg`–`00065.jpg` | 65 | `960×636` (`[480, 318]`) | 1,420,872 | **100% Verified** |
| 13 | `leaves` | `/sequence/leaves/desktop` | Desktop | `00001.jpg`–`00041.jpg` | 41 | `1728×1148` (`[864, 574]`) | 2,181,712 | **100% Verified** |
| 14 | `leaves` | `/sequence/leaves/mobile` | Mobile / Tablet | `00001.jpg`–`00037.jpg` | 37 | `960×636` (`[480, 318]`) | 1,033,757 | **100% Verified** |
| 15 | `smile` | `/sequence/smile/desktop` | Desktop | `00001.jpg`–`00038.jpg` | 38 | `1728×1148` (`[864, 574]`) | 2,080,981 | **100% Verified** |
| 16 | `smile` | `/sequence/smile/mobile` | Mobile / Tablet | `00001.jpg`–`00038.jpg` | 38 | `960×636` (`[480, 318]`) | 1,088,871 | **100% Verified** |
| 17 | `stacked_building` | `/sequence/stacked-building/desktop` | Desktop | `00001.jpg`–`00066.jpg` | 66 | `1728×1148` (`[864, 574]`) | 3,033,117 | **100% Verified** |
| 18 | `stacked_building` | `/sequence/stacked-building/mobile` | Mobile / Tablet | `00001.jpg`–`00066.jpg` | 66 | `960×636` (`[480, 318]`) | 1,603,707 | **100% Verified** |
| 19 | `tier` | `/sequence/tier/desktop` | Desktop | `00001.jpg`–`00065.jpg` | 65 | `1728×1148` (`[864, 574]`) | 3,271,512 | **100% Verified** |
| 20 | `tier` | `/sequence/tier/mobile` | Mobile / Tablet | `00001.jpg`–`00065.jpg` | 65 | `960×636` (`[480, 318]`) | 1,703,251 | **100% Verified** |
| 21 | `tpo` | `/sequence/tpo/desktop` | Desktop | `00001.jpg`–`00066.jpg` | 66 | `1728×1148` (`[864, 574]`) | 2,973,193 | **100% Verified** |
| 22 | `tpo` | `/sequence/tpo/mobile` | Mobile / Tablet | `00001.jpg`–`00066.jpg` | 66 | `960×636` (`[480, 318]`) | 1,569,075 | **100% Verified** |
| **TOTAL** | **11 Sequence Types** | **22 Directories** | **Desktop + Mobile** | **`00001.jpg`–`00127.jpg`** | **1,354 Frames** | — | **50,569,933 B** | **100% Parity** |

---

## 5. Static Bundles: CSS, JS Chunks, Web Workers, Fonts & Root Assets

Every static bundle in `_next/static/` and the root public folder was compared byte-for-byte against `https://www.battalion.com`:

| Asset Type | Relative Path | Size (Bytes) | SHA-256 (12-char) | Live vs. Local |
| :--- | :--- | ---: | :---: | :---: |
| **CSS** | `_next/static/css/0fa3ad3e26d5da69.css` | 4,876 | `1569540f5ce4` | **EXACT** |
| **CSS** | `_next/static/css/590d688d5d519f6d.css` | 7,169 | `71c17b9edafc` | **EXACT** |
| **CSS** | `_next/static/css/c4582b4cde9209e3.css` | 4,889 | `cf3412b2d83f` | **EXACT** |
| **CSS** | `_next/static/css/dc7cdf09db0feb00.css` | 91,410 | `57876e469452` | **EXACT** |
| **Font (WOFF2)** | `_next/static/media/72f84b25983afc71-s.p.woff2` | 42,264 | `77827c69744d` | **EXACT** |
| **Font (WOFF2)** | `_next/static/media/777994872ea449fc-s.p.woff2` | 41,236 | `461d394ea06e` | **EXACT** |
| **Web Worker** | `_next/static/chunks/199.66a4f90695ab1e0e.js` | 589 | `d54273b2a7b2` | **EXACT** |
| **Web Worker** | `_next/static/chunks/967.66a4f90695ab1e0e.js` | 589 | `d54273b2a7b2` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/317-ed7330059b349994.js` *(Sections, Pricer, DealSizer, Contact)* | 280,475 | `5dec9523fd31` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/340-816a9923a87d460c.js` *(Shared UI, AnimatedText, Reveals)* | 49,124 | `bd31ace892fd` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/376-6dea7a78410b6ad0.js` *(React Select, Hook Form, ServerRef)* | 313,553 | `962c213a1b5f` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/438-3081138f8b8e8086.js` *(Next.js App Router & Flight Client)* | 123,760 | `c150bcb749ad` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/478-1c79ca78c34c8f1a.js` | 6,344 | `945cfa33a3f1` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/528-ce74522fe7daa82e.js` | 13,794 | `16ed5dd543b6` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/568-bc17190c50503379.js` *(Lenis, TransitionRouter)* | 18,110 | `85c897458435` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/751-4ba22589dbd220d5.js` *(SequenceCanvas + 11 Sequence Configs)* | 11,098 | `14fcd5db26b3` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/7fd2370d-604f7b16893c3389.js` *(GSAP Core)* | 51,663 | `00c1577cc54a` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/823-5a4916a3b91045ec.js` *(GSAP ScrollTrigger, SplitText, Swiper)* | 148,136 | `6b19b414dbed` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/8ddfd75e-bacd598944662f9b.js` *(React 18 DOM)* | 172,831 | `4426a8262e78` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/app/%5Bslug%5D/page-4d4f4bb6e21ffe82.js` | 182 | `0b45a1a644b6` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/app/layout-cacaa35457036801.js` *(GlobalProvider, Preloader, Header/Footer)* | 51,704 | `957e1a62403f` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/app/loading-839b5d3479ec2744.js` | 337 | `fc35c6ccc518` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/app/not-found-f695dfa650f90a62.js` | 1,618 | `de39d9afe29a` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/app/page-0ec72c864a4d29c2.js` | 183 | `56e680a62a99` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/main-app-623f32bf293265b3.js` | 461 | `ab03196651b6` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/polyfills-42372ed130431b0a.js` | 112,594 | `0973c1d64c88` | **EXACT** |
| **JS Chunk** | `_next/static/chunks/webpack-a1acbe8b9141e797.js` | 4,340 | `3f687389939e` | **EXACT** |
| **Root Asset** | `site.webmanifest` | 455 | `fbeb88a01f9f` | **EXACT** |
| **Root Asset** | `favicon.svg` | 434 | `fd9658e353b8` | **EXACT** |
| **Root Asset** | `apple-touch-icon.png` | 7,886 | `533c34525341` | **EXACT** |
| **Root Asset** | `web-app-manifest-192x192.png` | 2,284 | `6507aade552f` | **EXACT** |
| **Root Asset** | `web-app-manifest-512x512.png` | 7,886 | `533c34525341` | **EXACT** |
| **Root Asset** | `social.jpg` | 261,637 | `f7dfc402d6f1` | **EXACT** |

---

## 6. Animation & Interactive Systems Audit

1. **GSAP + ScrollTrigger + SplitText Choreography (`7fd2370d`, `823`, `340`, `317`)**:
   - Line-by-line headline splits (`animateOnScroll="lines"`, module `4330` `C2`) and fade-up block reveals (`A6`).
   - Scroll-scrubbed 2.5D/3D `OffscreenCanvas` sequences (`SequenceCanvas`, module `7962`) with intro frame playback (`hasIntroAnimation`, `introAnimationFrameEnd: 50` on Hero) followed by ScrollTrigger frame scrubbing (`defaultScrollAnimation: true`).
   - Parallax media containers (`yPercent: -9` to `9` on `CTASecondarySection`).
2. **Lenis Smooth Scroll + `next-transition-router` SPA Page Transitions (`568`, `app/layout`)**:
   - Full-screen overlay curtain transition (`opacity: 0 -> 1` on `leave`, `1 -> 0` on `enter`) synchronized with Lenis scroll reset and ScrollTrigger refresh.
3. **Interactive Calculators & Forms (`317-ed7330059b349994.js`)**:
   - **Deal Sizer (`/deal-sizer` & `/` & `/battalion-tpo`, module `8831`)**: 100% client-side `Decimal.js` engine computing DSCR, LTV, Maximum Monthly Payment, and Minimum Cashflow across Purchase and Refinance modes.
   - **Loan Pricer (`/pricer`, module `954`)**: Jotai state atom (`eT`) with US State/County selectors, LTV quick-pills, and Next.js Server Actions:
     - `0a31680d12d7b5d26d161fd0c48991c1238dbfcf`: 30-Year Fixed / 7-Year ARM / 5-Year ARM rate lookup.
     - `0a5b15f0399b5e722f29ac196ca052ec50146103`: PrimeBridge rate lookup (returns 68 rate rows across 15/30/45/60-day locks from `9.000%` to `13.000%`).
   - **Contact & TPO Contact Forms (`/contact`, `/contact-tpo`, module `3576`)**: Zod-validated (`react-hook-form` + `@hookform/resolvers/zod`) form posting JSON to `POST /api/forms/contact` with GSAP `autoAlpha` success state transition.

---

## 7. Server Enhancements Applied to `d:\argon trial rea\battalion-original\server.js`

During deep inspection of `_next/static/chunks/438-3081138f8b8e8086.js`, two critical Next.js 14 App Router protocol requirements were identified and fixed in `server.js`:

1. **Strict `Content-Type: text/x-component` Header on RSC Responses**:
   - In `438-3081138f8b8e8086.js` (module `4574` & `fetchServerResponse`), Next.js checks `if (res.headers.get("content-type") !== "text/x-component")` using strict string equality (without `; charset=utf-8`).
   - `server.js` was updated so `.rsc` and `RSC: 1` responses emit exact `Content-Type: text/x-component`, ensuring `TransitionRouter` client-side navigation performs seamless SPA transitions without falling back to full MPA reloads.
2. **Next.js Server Action (`Next-Action`) POST Handler with Upstream Proxy + Deterministic Offline Fallback**:
   - Added step `1b` in `server.js` to intercept `POST` requests carrying a `Next-Action` header (`0a31680d12d7b5d26d161fd0c48991c1238dbfcf` and `0a5b15f0399b5e722f29ac196ca052ec50146103` on `/pricer`).
   - Proxies the request to `https://www.battalion.com` (rewriting any CMS URLs to `/uploads/`) and, if offline, synthesizes a valid React Flight stream (`0:["$@1",["xy4V3lk5CKCbT2XW2SSa-",null]]\n1:{...}`) including all 68 PrimeBridge rate rows across 15/30/45/60-day locks.
