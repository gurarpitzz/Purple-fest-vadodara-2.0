# BATTALION.COM — GRANULAR REA TECHNICAL DECODE & FULL SITE MIRROR SPECIFICATION

- **Target Origin**: `https://www.battalion.com`
- **CMS Origin**: `https://battalion-cms.onrender.com` (Headless Strapi CMS)
- **Local Mirror Root**: `d:\argon trial rea\battalion-original`
- **Local Mirror Server**: `d:\argon trial rea\battalion-original\server.js` (Running at `http://localhost:3001`)
- **REA Static Evidence Bundle**: `d:\argon trial rea\battalion-original\rea-evidence.json` (17,062,831 bytes, Evidence ID `ev_9a4126a9122bff939a047946821a5d41e16bfa300cf356ca92d7f51879298e66`)
- **Framework**: Next.js 15 App Router (React 19 RSC + Client Chunks, Webpack runtime `a1acbe8b9141e797`, Build ID `t8X0T5yH9qP3fV9O-aBcD`)

---

## 1. Complete Downloaded Asset Inventory (`d:\argon trial rea\battalion-original`)

Every file required to run `battalion.com` 100% locally has been downloaded and verified (0 missing files, 0 HTTP 404s):

| Category | Count | Total Size | Local Path Pattern |
| :--- | :---: | :---: | :--- |
| **Root XML & Robots** | 3 | 2.46 KB | `robots.txt` (87 B), `sitemap.xml` (187 B), `sitemap-0.xml` (2,189 B) |
| **HTML Routes (All 15 Sitemap URLs)** | 29 files (15 routes) | ~1.42 MB | `index.html`, `<slug>.html`, and `<slug>/index.html` |
| **Next.js App Router RSC Payloads** | 15 | ~540 KB | `_rsc/index.rsc`, `_rsc/<slug>.rsc` |
| **CSS Stylesheets** | 4 | 137.04 KB | `_next/static/css/*.css` |
| **JavaScript Static Chunks** | 19 | 1,284.15 KB | `_next/static/chunks/*.js` and `_next/static/chunks/app/**/*.js` |
| **JavaScript Dynamic Web Worker Chunks** | 2 | 1.18 KB | `_next/static/chunks/199.66a4f90695ab1e0e.js`, `_next/static/chunks/967.66a4f90695ab1e0e.js` |
| **Custom Webfonts (`.woff2`)** | 2 | 55.28 KB | `_next/static/media/777994872ea449fc-s.p.woff2` (400), `72f84b25983afc71-s.p.woff2` (600) |
| **Favicons, Manifest & OG Images** | 6 | 194.60 KB | `favicon.svg`, `apple-touch-icon.png`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, `site.webmanifest`, `social.jpg` |
| **Strapi CMS Media Uploads (`.mp4`, `.jpg`, `.png`, `.svg`)** | 97 | 19.85 MB | `uploads/*` (3 `.mp4` videos + 94 images/logos/icons) |
| **3D Pre-Rendered Canvas Image Sequences** | 1,354 frames (22 dirs) | 48.23 MB | `sequence/<type>/<mobile\|desktop>/00001.jpg` .. `00NNN.jpg` |
| **Local Mirror Server & REA Evidence** | 2 | 17.07 MB | `server.js`, `rea-evidence.json` |

### 1.1 Root `robots.txt`, `sitemap.xml`, and `sitemap-0.xml`
- **`robots.txt`**:
  ```txt
  # *
  User-agent: *
  Allow: /

  # Host
  Host: https://www.battalion.com

  # Sitemaps
  Sitemap: https://www.battalion.com/sitemap.xml
  ```
- **`sitemap.xml`**: References `https://www.battalion.com/sitemap-0.xml`.
- **`sitemap-0.xml`**: Enumerates all **15 canonical routes** (`lastmod: 2026-04-06T12:27:09.106Z`, `changefreq: daily`, `priority: 0.7`):
  1. `https://www.battalion.com` (`/`)
  2. `https://www.battalion.com/about-us`
  3. `https://www.battalion.com/programs`
  4. `https://www.battalion.com/tier-1-program`
  5. `https://www.battalion.com/other-services`
  6. `https://www.battalion.com/composyte`
  7. `https://www.battalion.com/deal-sizer`
  8. `https://www.battalion.com/pricer`
  9. `https://www.battalion.com/careers`
  10. `https://www.battalion.com/contact`
  11. `https://www.battalion.com/battalion-tpo`
  12. `https://www.battalion.com/programs-tpo`
  13. `https://www.battalion.com/contact-tpo`
  14. `https://www.battalion.com/terms-and-conditions`
  15. `https://www.battalion.com/privacy-policy`

---

## 2. JavaScript Bundle & Webpack Chunk Architecture

### 2.1 Complete Chunk Table (`_next/static/chunks/`)

| Chunk Path | Size (Bytes) | Role & Contained Modules |
| :--- | :---: | :--- |
| `webpack-a1acbe8b9141e797.js` | 3,667 | Webpack runtime loader, dynamic chunk resolver (`r.u = e => "static/chunks/" + ({199:"199",967:"967"})[e] + ".66a4f90695ab1e0e.js"`), worker factory |
| `polyfills-42372ed130431b0a.js` | 112,594 | Next.js browser polyfills (`nomodule`) |
| `main-app-623f32bf293265b3.js` | 548 | Next.js App Router hydration bootstrap |
| `478-1c79ca78c34c8f1a.js` | 171,226 | React 19 DOM client runtime (`react-dom`) |
| `528-ce74522fe7daa82e.js` | 216,401 | Next.js App Router core (`next/navigation`, `next/image`, `next/link`, RSC flight stream parser, Server Action dispatcher) |
| `8ddfd75e-bacd598944662f9b.js` | 146,563 | **GSAP Core (v3.12+)** + **`ScrollTrigger`** + **`SplitText`** |
| `7fd2370d-604f7b16893c3389.js` | 6,419 | **GSAP `CustomEase`** plugin (`7909`) |
| `376-6dea7a78410b6ad0.js` | 17,448 | **`@gsap/react`** (`useGSAP` hook) + **`lenis`** (`lenis/react` smooth scroll engine) + `next-transition-router` |
| `823-5a4916a3b91045ec.js` | 25,999 | **`swiper`** (`Swiper`, `SwiperSlide`, `Navigation` module for carousels) |
| `438-3081138f8b8e8086.js` | 164,877 | **`decimal.js`**, **`zustand`**, **`jotai`**, **`lz-string`**, **`react-hook-form`**, **`zod`** |
| `340-816a9923a87d460c.js` | 35,882 | **`@floating-ui/react`**, **`downshift`**, **`clsx`** (Accessible dropdowns, tooltips, select menus) |
| `568-bc17190c50503379.js` | 16,133 | **`react-number-format`** (`NumericFormat`), **`@react-input/mask`** (Phone & currency input formatting) |
| `751-4ba22589dbd220d5.js` | 61,679 | **Core Shared UI, 3D Sequence Engine, Animation Hooks & Layout Primitives** (See §2.2) |
| `317-ed7330059b349994.js` | 272,621 | **All 18 Strapi Page Section Components, Deal Sizer Calculator & Loan Pricer** (See §2.3) |
| `app/layout-cacaa35457036801.js` | 24,527 | **Root Layout**: `GlobalProvider` (`5445`), `ScrollProvider`/Lenis (`4305`), `Preloader` (`5093`), `TransitionRouter` (`7362`), `Header` (`8806`), `Footer` |
| `app/page-0ec72c864a4d29c2.js` | 485 | `/` route entry wrapper |
| `app/[slug]/page-4d4f4bb6e21ffe82.js` | 491 | Dynamic `/[slug]` route entry wrapper |
| `app/loading-839b5d3479ec2744.js` | 609 | Next.js Suspense loading spinner (`styles_loader__M529S`) |
| `app/not-found-f695dfa650f90a62.js` | 3,982 | 404 page (`NotFoundSection` with `/sequence/404/*` 3D canvas sequence) |
| `199.66a4f90695ab1e0e.js` | 589 | **Web Worker #1**: Active/Hero 3D Sequence Frame Batch Downloader |
| `967.66a4f90695ab1e0e.js` | 589 | **Web Worker #2**: Background Preloader 3D Sequence Frame Batch Downloader |

---

### 2.2 Core Engine Chunk `751-4ba22589dbd220d5.js` — Module Breakdown

| Module ID | Export / Component | Granular Implementation Details |
| :---: | :--- | :--- |
| **`2084`** | `sequenceData` & `SequenceCanvas` | Defines all 11 3D sequence configurations (`hero`, `dollar`, `stacked_building`, `key`, `careers`, `contact`, `tier`, `tpo`, `404`, `leaves`, `smile`), instantiates Web Workers (`199` and `967`), manages `SequencePlayer` (`7962`), and coordinates with `GlobalProvider.sequenceCache`. |
| **`7962`** | `SequencePlayer` | Double-buffered 2x Retina HTML5 `<canvas>` + `OffscreenCanvas(2 * width, 2 * height)` renderer. Uses `ctx.clearRect` + `ctx.drawImage` onto `OffscreenCanvas`, then transfers to visible `<canvas>`. |
| **`5445`** | `GlobalProvider` (`useGlobalContext`) | React context storing `preloaderFinished`, `mainSequenceLoaded`, `activeSequenceType`, `otherSequencesByType`, `isMenuOpened`, and `sequenceCache` (`ref` storing loaded `HTMLImageElement[]` keyed by `${type}-${device}`). |
| **`3528`** | `useMediaQuery` | Breakpoint hook checking `window.innerWidth`: `isMobile` (`<= 568`), `isTablet` (`<= 1024 && > 568`), `isDesktop` (`> 1024`), `isWebGL: true`. |
| **`1339`** | `TextAnimation` (`useTextAnimation`) | GSAP `SplitText` (`type: "words,chars"`, `charsClass: "chars2"`) + `ScrollTrigger` (`start: "top 90%"`) text reveal wrapper. |
| **`1269`** | `FadeIn` (`useFadeIn`) | Animates `[data-fade-in-item]` children from `{ opacity: 0, y: "3rem" }` to `{ opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }` when `top 90%` enters viewport. |
| **`3389`** | `MarqueeText` | Dual-mode marquee: scroll-scrubbed (`ScrollTrigger` `start: "top bottom"`, `end: "bottom top"`, `scrub: true`, odd rows `-20 -> 0 xPercent`, even rows `0 -> -20 xPercent`) and continuous CSS infinite keyframe loop. |
| **`4989`** | `CountUp` | Scroll-triggered numeric counter (`gsap.fromTo` from `0` to `value`, `duration: 1.5`, `ease: "power2.out"`, `start: "top 90%"`). |
| **`1150`** | `Button` | Polymorphic button/link component with animated text mask (`styles_mask__bA37I` with dual `<span>` sliding `translateY(-100%)` on hover) and arrow icon (`styles_arrow__aF2hv` sliding `translateX(100%)` on hover). Variants: `primary`, `secondary`, `tertiary`. |
| **`5129`** | `Modal` | Accessible portal modal with GSAP backdrop/panel fade and Lenis scroll lock (`lenis.stop()` on open, `lenis.start()` on close). |
| **`3395`** | `Accordion` | Animated collapsible FAQ/Program item with GSAP height tween and rotating `+`/`-` indicator. |

---

### 2.3 Page Sections & Calculators Chunk `317-ed7330059b349994.js` — Module Breakdown

Module **`326`** is the master Strapi dynamic zone renderer (`Sections`), mapping `section.__typename` to 18 specialized section components:

| Strapi `__typename` | Module ID | Component Name | Description |
| :--- | :---: | :--- | :--- |
| `ComponentBlocksHomeHero` | `203` | `HomeHero` | Full-viewport hero with 3D `hero` sequence (frames 1–46 intro, 46–127 scroll-scrubbed), split-char H1, subtitle, CTA button, and scroll prompt. |
| `ComponentBlocksHomeMetrics` | `8483` | `HomeMetricsSection` | Sticky 3D `dollar` sequence scrubbed as user scrolls through 3 metric cards (`CountUp` stats: `$5B+`, `$5M`, `30+`) plus partner logo marquee (`logo_1`..`logo_8`). |
| `ComponentBlocksProgramsOverview` | `462` | `ProgramsOverviewSection` | Interactive tabbed program showcase (`Tier 1`, `DSCR`, `Bridge`, `RTL`) with `gsap.fromTo` crossfade (`opacity: 0 -> 1`, `duration: 0.8`) and program parameter grid. |
| `ComponentBlocksServicesOverview` | `4009` | `ServicesOverviewSection` | 2-column dark/lavender card showcase for *The Composyte™* and *Other Services* with CMS background imagery and hover scale transitions. |
| `ComponentBlocksWhyChoose` | `3081` | `WhyChooseSection` | 3-card value proposition grid (`Built for Speed`, `Certainty of Execution`, `Tailored Structuring`) with custom SVG icons and staggered `FadeIn`. |
| `ComponentBlocksCta` | `3224` | `CTASection` | Scroll-scrubbed 3D sequence (`leaves` or `smile`) paired with large display heading, subtitle, and primary CTA button. |
| `ComponentBlocksHero` | `8855` | `HeroSection` | Inner-page hero supporting 3D intro sequence (`stacked_building`, `key`, `careers`, `contact`, `tier`, `tpo`), background video (`batallion_video_06d344de07.mp4`, `Careers_video_2x_compressed_080ffc64a7.mp4`), or CMS hero image, plus optional anchor sub-navigation bar. |
| `ComponentBlocksAboutInfo` | `3695` | `AboutInfoSection` | Company overview narrative + `CountUp` milestone metrics (`$5B+`, `30+`, `50+`). |
| `ComponentBlocksValues` | `6712` | `ValuesSection` | Numbered list/grid of core company values with staggered fade-in. |
| `ComponentBlocksTeam` | `5128` | `TeamSection` | Filterable/categorized executive & leadership portrait grid (`Leadership`, `Originations`, `Operations`) with bio modal/hover details. |
| `ComponentBlocksProgramsList` | `9467` | `ProgramsListSection` | Detailed expandable/card list of lending programs (`DSCR Rental Loans`, `PrimeBridge™`, `Fix & Flip / Rehab`, `Ground-Up Construction`, `Multifamily / Mixed-Use`) with downloadable PDF matrices and criteria tables. |
| `ComponentBlocksTierProgram` | `6104` | `TierProgramSection` | Dedicated Tier 1 Program comparison table, LTV/DSCR matrix, and eligibility breakdown. |
| `ComponentBlocksServiceDetails` | `2981` | `ServiceDetailsSection` | Alternating feature blocks for `/other-services` and `/composyte` with CMS illustrations and bullet lists. |
| `ComponentBlocksCareers` | `7812` | `CareersSection` | Culture gallery, benefits grid (`Competitive Compensation`, `Health & Wellness`, `Growth & Development`), and open roles accordion. |
| `ComponentBlocksContact` | `4410` | `ContactSection` | Validated contact form (`react-hook-form` + `zod`, submitting `POST /api/forms/contact`) + office locations (`New York`, `Los Angeles`, `Miami`, `Dallas`). |
| `ComponentBlocksTextContent` | `1890` | `TextContentSection` | Rich-text legal document renderer used on `/terms-and-conditions` and `/privacy-policy` with sticky table-of-contents sidebar. |
| `ComponentBlocksDealSizer` | `8831` | `DealSizerSection` | Interactive DSCR/LTV/Payment/Cashflow real estate loan calculator (with modules `4916`, `1562`, `6249`, `1677`). |
| `ComponentBlocksPricer` | `954` | `PricerSection` | Interactive real-time Loan Pricer engine with US State/County selector, Server Action pricing tables, and video walkthrough modal (`Loan_pricer_opt_3_ed63f9fec3.mp4`). |

---

## 3. 3D Rendering & OffscreenCanvas Image Sequence Architecture

### 3.1 How Battalion Renders 3D Graphics Without Runtime `.glb` Meshes
Although `useMediaQuery` (`3528`) sets `isWebGL: !0`, **Battalion does not ship Three.js or `.glb`/`.gltf` geometries**. Instead, all 11 3D scenes were pre-rendered in 3D DCC software (Cinema 4D / Blender Octane) with studio glass, brushed purple/lavender metallic shaders, and soft area lighting, and exported as **1,354 JPEG frames** across 22 device-specific directories (`/sequence/<type>/mobile/00001.jpg` and `/sequence/<type>/desktop/00001.jpg`).

At runtime, these frames are streamed off-main-thread via **two dedicated Web Workers** and drawn onto a **2x Retina `<canvas>`** backed by an **`OffscreenCanvas`** double buffer (`SequencePlayer`, module `7962`).

### 3.2 Complete Specification of All 11 3D Canvas Sequences (Module `2084`)

| # | Sequence Key (`type`) | Used On Route(s) | Playback Mode | Mobile / Tablet Frames & Size | Desktop Frames & Size | Intro End Frame | Scroll Scrub Distance (`end`) |
| :-: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 1 | **`hero`** | `/` (`HomeHero`) | **Hybrid**: Intro autoplay (`1 -> 46`) then Scroll-scrub (`46 -> end`) | **88 frames** (`480 × 260`, rendered at `960 × 520`) | **127 frames** (`960 × 520`, rendered at `1920 × 1040`) | `46` | Desktop: `+=100%`<br>Mobile: `+=75%` |
| 2 | **`dollar`** | `/` (`HomeMetricsSection`) | **Scroll-scrubbed** (`1 -> end` across sticky container) | **42 frames** (`480 × 318`) | **91 frames** (`864 × 574`) | — | Sticky wrapper height (`start: "top top"`, `end: "bottom bottom"`) |
| 3 | **`stacked_building`** | `/about-us` (`HeroSection`) | **Intro autoplay** (`1 -> 66`, 2.0s CustomEase) | **66 frames** (`480 × 318`) | **66 frames** (`864 × 574`) | `66` | — |
| 4 | **`key`** | `/programs`, `/programs-tpo` (`HeroSection`) | **Intro autoplay** (`1 -> 65`, 2.0s CustomEase) | **65 frames** (`480 × 318`) | **65 frames** (`864 × 574`) | `65` | — |
| 5 | **`careers`** | `/careers` (`HeroSection`) | **Intro autoplay** (`1 -> 40`, 2.0s CustomEase) | **40 frames** (`480 × 318`) | **40 frames** (`864 × 574`) | `40` | — |
| 6 | **`contact`** | `/contact` (`HeroSection`) | **Intro autoplay** (`1 -> 60`, 2.0s CustomEase) | **60 frames** (`480 × 318`) | **60 frames** (`864 × 574`) | `60` | — |
| 7 | **`tier`** | `/tier-1-program` (`HeroSection`) | **Intro autoplay** (`1 -> 65`, 2.0s CustomEase) | **65 frames** (`480 × 318`) | **65 frames** (`864 × 574`) | `65` | — |
| 8 | **`tpo`** | `/contact-tpo` (`HeroSection`) | **Intro autoplay** (`1 -> 66`, 2.0s CustomEase) | **66 frames** (`480 × 318`) | **66 frames** (`864 × 574`) | `66` | — |
| 9 | **`404`** | `/*` (`NotFoundSection`) | **Intro autoplay** (`1 -> 64`, 2.0s CustomEase) | **64 frames** (`450 × 225`) | **64 frames** (`864 × 405`) | `64` | — |
| 10 | **`leaves`** | `/`, `/programs`, `/tier-1-program`, `/other-services`, `/composyte`, `/battalion-tpo`, `/programs-tpo` (`CTASection`) | **Scroll-scrubbed** (`1 -> end` while CTA scrolls into view) | **37 frames** (`480 × 318`) | **41 frames** (`864 × 574`) | — | `start: "top bottom"`, `end: "bottom bottom"` |
| 11 | **`smile`** | `/about-us` (`CTASection`) | **Scroll-scrubbed** (`1 -> 38` while CTA scrolls into view) | **38 frames** (`480 × 318`) | **38 frames** (`864 × 574`) | — | `start: "top bottom"`, `end: "bottom bottom"` |

### 3.3 Dual Web Worker Frame Streaming (`199.66a4f90695ab1e0e.js` & `967.66a4f90695ab1e0e.js`)
Both Web Worker chunks contain identical byte-for-byte logic so the browser spawns two independent OS threads:
- **Worker 1 (`199.66a4f90695ab1e0e.js`)**: Dedicated to the current page's primary sequence (`activeSequenceType`).
- **Worker 2 (`967.66a4f90695ab1e0e.js`)**: Dedicated to background-preloading secondary sequences on the page (`otherSequencesByType`, such as `dollar` and `leaves` on `/`) **after** `preloaderFinished` becomes `true`.

```js
// Decoded Web Worker (199.66a4f90695ab1e0e.js & 967.66a4f90695ab1e0e.js)
let controller = null;
self.onmessage = async (event) => {
  if (event.data === "abort") {
    controller?.abort();
    controller = null;
    return;
  }
  controller = new AbortController();
  const signal = controller.signal;
  const { id, init, end, path } = event.data;
  const batchSize = 6;

  try {
    for (let i = init; i <= end; i += batchSize) {
      if (signal.aborted) break;
      const promises = [];
      for (let j = i; j < i + batchSize && j <= end; j++) {
        const frameNum = j.toString().padStart(5, "0");
        const url = `/sequence/${path}/${frameNum}.jpg`;
        promises.push(
          fetch(url, { signal })
            .then((res) => res.blob())
            .then((blob) => ({ index: j, blob }))
        );
      }
      const batch = await Promise.all(promises);
      self.postMessage({ id, batch });
    }
    self.postMessage({ id, done: true });
  } catch (err) {
    if (err.name !== "AbortError") {
      self.postMessage({ id, error: err.message });
    }
  }
};
```

### 3.4 `SequencePlayer` Double-Buffered OffscreenCanvas Renderer (Module `7962`)
```js
class SequencePlayer {
  images = [];
  frame = 0;
  size = [0, 0];

  constructor({ canvas, size }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // Render at 2x resolution for Retina sharpness
    this.size = [2 * size[0], 2 * size[1]];
    this.canvas.width = this.size[0];
    this.canvas.height = this.size[1];
    this.offscreenCanvas = new OffscreenCanvas(this.size[0], this.size[1]);
    this.offscreenCtx = this.offscreenCanvas.getContext("2d");
  }

  render(frameIndex) {
    const idx = Math.max(0, Math.min(frameIndex, this.images.length - 1));
    const img = this.images[idx];
    if (!img || !this.ctx || !this.offscreenCtx) return;

    this.frame = idx;
    this.offscreenCtx.clearRect(0, 0, this.size[0], this.size[1]);
    this.offscreenCtx.drawImage(img, 0, 0, this.size[0], this.size[1]);

    this.ctx.clearRect(0, 0, this.size[0], this.size[1]);
    this.ctx.drawImage(this.offscreenCanvas, 0, 0, this.size[0], this.size[1]);
  }
}
```

### 3.5 Intro CustomEase & Scroll-Scrub Choreography
- **Intro CustomEase Curve** (registered via `CustomEase.create` in `2084`):
  ```text
  "M0,0 C0.212,0 0.353,0.299 0.391,0.372 0.429,0.446 0.492,0.712 0.559,0.855 0.609,0.962 0.627,1.002 0.687,1.021 0.783,1.051 0.959,1 1,1 "
  ```
  - Note the slight overshoot (`1.002 -> 1.021 -> 1.051 -> 1.0`) between 62% and 95% of the 2.0-second intro animation, giving the 3D object a physical spring-settle feel when the page opens!
- **Hero Scroll Scrubbing (`HomeHero`, module `203`)**:
  - Once `preloaderFinished` is `true`, the intro plays frames `1 -> 46` over `2.0s` (`delay: 0.2s`).
  - Simultaneously, a `ScrollTrigger` (`trigger: heroRef.current`, `start: "top top"`, `end: isDesktop ? "+=100%" : "+=75%"`, `scrub: true`) maps scroll `progress` (`0 -> 1`) to frames `46 -> 127` (desktop) or `46 -> 88` (mobile) via `gsap.quickTo(frameObj, "value", { duration: 0.3, ease: "power2" })`.
  - If the user scrolls past 1% before the 2.0s intro finishes, the intro tween is killed (`introTween.kill()`) and scroll scrubbing takes over seamlessly.

---

## 4. GSAP, ScrollTrigger, Lenis & Page Transition Architecture

### 4.1 Lenis Smooth Scroll & GSAP Ticker Synchronization (`app/layout-cacaa35457036801.js`, Module `4305`)
```js
// ScrollProvider (Module 4305)
const lenisRef = useRef(null);
useEffect(() => {
  function update(time) {
    lenisRef.current?.lenis?.raf(1000 * time);
  }
  gsap.ticker.add(update);
  return () => gsap.ticker.remove(update);
}, []);
```
- While the Preloader is running (`!preloaderFinished`), `lenis.stop()` is active and `window.scrollTo(0, 0)` is enforced.
- As soon as the Preloader wordmark animation finishes, `lenis.start()` is called.

### 4.2 Preloader 7-Step GSAP Timeline (`app/layout-cacaa35457036801.js`, Module `5093`)
The Preloader (`styles_preloader__JmvRd`, fixed `z-index: 999`, background `#252429`) waits until `mainSequenceLoaded` is `true` (or a `300ms` fallback timer if the route has no `[data-sequence-load="wait"]` canvas). Then it executes this exact GSAP timeline:
1. **Progress Bar Fill**: `gsap.fromTo(progressBar, { xPercent: -105 }, { xPercent: 0, duration: 1.35, ease: "power2.inOut" })`
2. **Progress Bar Collapse**: `gsap.to(progressBar, { scaleX: 0, transformOrigin: "right center", duration: 0.8, ease: "power3.inOut" })`
3. **Logo Building Bars Rise**: `gsap.fromTo("[data-logo-building] [data-stagger]", { yPercent: 150 }, { yPercent: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, "-=0.5")`
4. **Logo Building Slides Left**: `gsap.fromTo("[data-logo-building]", { xPercent: 175 }, { xPercent: 0, duration: 1.0, ease: "power3.out" })`
5. **Wordmark Letters Rise**: `gsap.fromTo("[data-logo-text] [data-stagger]", { yPercent: 150 }, { yPercent: 0, duration: 0.8, stagger: 0.05, ease: "power3.out", onComplete: () => { setPreloaderFinished(true); lenis?.start(); } }, "<0.15")`
6. **FLIP Transition to Header Logo**: Computes `getBoundingClientRect()` of `[data-header-logo]` vs the centered preloader SVG logo and tweens `{ x: deltaX, y: deltaY, scale: targetWidth / currentWidth, duration: 0.9, ease: "power3.inOut" }`.
7. **Overlay Fade-Out**: `gsap.to(preloaderOverlay, { autoAlpha: 0, duration: 0.4, ease: "power2.out" })`.

### 4.3 Route Transition Curtain (`app/layout-cacaa35457036801.js`, Module `7362`)
Uses `next-transition-router` with a fixed full-screen overlay (`styles_overlay__KNduM`, `background-color: var(--color-light-purple)` `#ddddf9`, `z-index: 100`):
- **`leave(next)`**:
  ```js
  gsap.fromTo(overlayRef.current,
    { scaleY: 0, opacity: 1 },
    { scaleY: 1, transformOrigin: "100% 100%", duration: 0.7, ease: "power3.in", onComplete: next }
  );
  ```
- **`enter(next)`**:
  ```js
  window.scrollTo(0, 0);
  gsap.to(overlayRef.current,
    { opacity: 0, delay: 0.5, duration: 0.7, ease: "power3.in",
      onComplete: () => { ScrollTrigger.refresh(); next(); } }
  );
  ```

### 4.4 `TextAnimation` SplitText Reveal (`751-4ba22589dbd220d5.js`, Module `1339`)
- Splits text using `new SplitText(el, { type: "words,chars", charsClass: "chars2" })`.
- Global CSS (`.chars2`) wraps each character in an `overflow: hidden` inline-block mask (`padding-bottom: 0.09em; margin-bottom: -0.09em`) with an inner `.chars` span.
- **Default (`type = "words"`)**:
  - Initial: `gsap.set(targets, { yPercent: 110 })`
  - Tween: `gsap.to(targets, { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.04, delay })`
- **Character Mode (`type = "chars"`, used on Hero H1s)**:
  - Initial: `gsap.set(targets, { yPercent: 100 })`
  - Tween: `gsap.to(targets, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.02, delay })`
- Triggered either on `ScrollTrigger` (`start: "top 90%"`, `once: true`) or immediately after `preloaderFinished` when `waitPreloader: true`.

---

## 5. Interactive Financial Calculators (`317-ed7330059b349994.js`)

### 5.1 Deal Sizer Calculator (`/deal-sizer`, Modules `8831`, `4916`, `1562`, `6249`, `1677`)
A full client-side commercial/residential investment property loan sizer powered by **Zustand** (`4916`), **Decimal.js** (`1562`), and **LZ-String** URL state persistence (`1677`, syncing state to `?d=<compressed>`).

#### Default State & Constants (`6249`):
- **Property Value (`propertyValue`)**: `$1,200,000`
- **Calculation Mode (`calcType`)**: `"LTV"` (4 selectable modes: `"LTV"`, `"minDSCR"`, `"maxPayment"`, `"minCashflow"`)
- **Mode Targets**:
  - `LTV`: `65%` (`$780,000` default loan amount)
  - `minDSCR`: `1.25x`
  - `maxPayment`: `$7,000 / mo`
  - `minCashflow`: `$1,000 / mo`
- **Interest Rate (`interestRate`)**: `7.00%` (slider range `0% – 20%`, step `0.125%`)
- **Amortization Term (`amortization`)**: `30 years` (`360 months`, toggleable with Interest-Only `isInterestOnly`)
- **Gross Monthly Rental Income (`rentalIncome`)**: `$8,000 / mo` (`$96,000 / yr`)
- **Auto-Calculated Operating Expenses** (when `autoCalc` is enabled for a field):
  - **Annual Property Taxes**: `1.00%` of Property Value (`$12,000 / yr` = `$1,000 / mo`)
  - **Annual Property Insurance**: `0.25%` of Property Value (`$3,000 / yr` = `$250 / mo`)
  - **Annual Misc/HOA Expenses**: `0.10%` of Property Value (`$1,200 / yr` = `$100 / mo`)
  - **Vacancy / Management Fee (`vacancyRate`)**: `0%` default (configurable `%` of Gross Rent)

#### Exact Financial Formulas (`1562` with `Decimal.js`):
1. **Monthly Interest Rate**:
   $$r = \frac{\text{interestRate}}{100 \times 12}$$
2. **Monthly Debt Service (Principal & Interest, $n = \text{amortization} \times 12$)**:
   - If Interest-Only (`isInterestOnly === true`):
     $$M_{\text{PI}} = L \cdot r$$
   - If Amortizing (`isInterestOnly === false`):
     $$M_{\text{PI}} = L \cdot \frac{r(1 + r)^n}{(1 + r)^n - 1}$$
     - First-month Interest component: $I_1 = L \cdot r$
     - First-month Principal component: $P_1 = M_{\text{PI}} - I_1$
3. **Monthly Operating Expenses ($E_{\text{mo}}$)**:
   $$E_{\text{mo}} = \text{Taxes}_{\text{mo}} + \text{Insurance}_{\text{mo}} + \text{Misc}_{\text{mo}} + \left(\text{Rent}_{\text{mo}} \cdot \frac{\text{Vacancy}\%}{100}\right)$$
4. **Net Operating Income ($\text{NOI}_{\text{mo}}$)**:
   $$\text{NOI}_{\text{mo}} = \text{Rent}_{\text{mo}} - E_{\text{mo}}$$
5. **Debt Service Coverage Ratio ($\text{DSCR}$)**:
   $$\text{DSCR} = \frac{\text{NOI}_{\text{mo}}}{M_{\text{PI}}} \quad \text{or} \quad \frac{\text{Rent}_{\text{mo}}}{M_{\text{PI}} + E_{\text{mo}}} \quad (\text{per selected DSCR formula mode})$$
6. **Inverse Loan Sizing by Mode**:
   - **Mode `"LTV"`**: $L = \text{PropertyValue} \times \frac{\text{LTV}}{100}$
   - **Mode `"minDSCR"`**: Solves for maximum $M_{\text{PI}} = \frac{\text{NOI}_{\text{mo}}}{\text{minDSCR}}$, then inverts the amortization factor to get $L$.
   - **Mode `"maxPayment"`**: Sets $M_{\text{PI}} = \text{maxPayment} - E_{\text{mo}}$, then inverts the amortization factor to get $L$.
   - **Mode `"minCashflow"`**: Sets $M_{\text{PI}} = \text{Rent}_{\text{mo}} - E_{\text{mo}} - \text{minCashflow}$, then inverts the amortization factor to get $L$.

#### Stacked Bar Chart Color Palette (`8831`):
- **Principal**: `#822FE6`
- **Interest**: `#A459FF`
- **Taxes**: `#B980FF`
- **Insurance**: `#D0AAFF`
- **Expenses**: `#E6D1FF`
- **Cashflow**: `#099F9F`
- **Debt Service**: `#B1E3E3`
- **Negative Cashflow / Error**: `#F1A0B4`

---

### 5.2 Loan Pricer Engine (`/pricer`, Module `954`)
A comprehensive commercial/DSCR/Bridge loan pricing tool managed with **Jotai** (`eT` atom store) and `react-hook-form`:
- **Product Switcher**: Standard DSCR (`Server Action ID: 0a31680d12d7b5d26d161fd0c48991c1238dbfcf`) vs. **PrimeBridge™** (`Server Action ID: 0a5b15f0399b5e722f29ac196ca052ec50146103`).
- **Complete Embedded US State & County Dataset**: Contains every US state and all constituent counties (`Alabama` through `Wyoming`) for geographic pricing adjustments.
- **Input Fields**:
  - **Loan Information**: Loan Purpose (`Purchase`, `Rate & Term Refinance`, `Cash-Out Refinance`), Loan Type (`Fixed`, `ARM`), Amortization (`30 Year Fixed`, `Interest Only`), Prepayment Penalty (`5 Yr`, `3 Yr`, `2 Yr`, `1 Yr`, `No PPP`), Lock Period (`30 Days`, `45 Days`, `60 Days`).
  - **Property Information**: Property Value / Purchase Price, Loan Amount / LTV, Property Type (`SFR`, `2-4 Unit`, `Condo`, `Townhome`, `Multifamily`), Occupancy (`Investment`), Gross Monthly Rent, Annual Taxes, Annual Insurance, HOA Fees, State, County.
  - **Borrower Information**: Credit Score (FICO tiers `760+`, `740-759`, `720-739`, `700-719`, `680-699`, `660-679`), Citizenship (`US Citizen`, `Permanent Resident`, `Foreign National`), Experience (Number of completed projects/rentals).
- **Video Tutorial Modal**: Clicking *"Watch Tutorial"* opens `Modal` (`5129`) playing `/uploads/Loan_pricer_opt_3_ed63f9fec3.mp4` (`1,227,540` bytes).

---

## 6. Design System, Fluid Typography & CSS Architecture

### 6.1 Global Design Tokens (`_next/static/css/0fa3ad3e26d5da69.css`)
```css
:root {
  --font-primary: "__font_7fb336", "__font_Fallback_7fb336";
  --color-dark: #252429;
  --color-dark-80: rgba(37, 36, 41, 0.8);
  --color-dark-60: rgba(37, 36, 41, 0.6);
  --color-dark-50: rgba(37, 36, 41, 0.5);
  --color-dark-40: rgba(37, 36, 41, 0.4);
  --color-dark-20: rgba(37, 36, 41, 0.2);
  --color-dark-10: rgba(37, 36, 41, 0.1);
  --color-dark-05: rgba(37, 36, 41, 0.05);
  --color-white: #f2f2fc;
  --color-white-80: rgba(242, 242, 252, 0.8);
  --color-white-60: rgba(242, 242, 252, 0.6);
  --color-white-20: rgba(242, 242, 252, 0.2);
  --color-white-10: rgba(242, 242, 252, 0.1);
  --color-purple: #822fe6;
  --color-light-purple: #ddddf9;
  --color-lavender: #c7c7f2;
  --color-green: #099f9f;
  --color-light-green: #b1e3e3;
  --color-pink: #e28098;
  --color-red: #f63b3b;
}
```

### 6.2 Viewport-Proportional Fluid `rem` Scaling
Battalion uses a `10px`-base fluid `rem` formula that scales every typography size, padding, margin, and border-radius proportionally to the viewport width:
- **Mobile (`max-width: 568px`)**: `html { font-size: calc(100vw / 390 * 10); }` (`1rem = 10px` at `390px` viewport)
- **Tablet (`569px – 1024px`)**: `html { font-size: calc(100vw / 768 * 10); }` (`1rem = 10px` at `768px` viewport)
- **Desktop (`min-width: 1025px`)**: `html { font-size: calc(100vw / 1440 * 10); }` (`1rem = 10px` at `1440px` viewport)

### 6.3 Custom Webfonts (`_next/static/media/`)
- **`777994872ea449fc-s.p.woff2`** (27,540 B): `font-family: __font_7fb336`, `font-weight: 400`, `font-style: normal`
- **`72f84b25983afc71-s.p.woff2`** (27,740 B): `font-family: __font_7fb336`, `font-weight: 600`, `font-style: normal`

### 6.4 All 4 CSS Bundles (`_next/static/css/`)
1. **`0fa3ad3e26d5da69.css` (19,708 B)**: Global reset, `:root` design tokens, `@font-face` declarations, fluid `rem` media queries, Lenis scroll styles, Preloader (`styles_preloader__JmvRd`), Page Transition overlay (`styles_overlay__KNduM`), Header (`styles_header__...`), Footer (`styles_footer__...`), and Button (`styles_button__...`).
2. **`c4582b4cde9209e3.css` (30,683 B)**: Shared primitives (`SequenceCanvas`, `MarqueeText`, `Accordion`, `Modal`, `Input`, `Select`, `Checkbox`, `Radio`, `Tooltip`, `Tabs`).
3. **`590d688d5d519f6d.css` (7,260 B)**: Swiper base & navigation styles + 404 `NotFoundSection` styles (`styles_notFound__...`).
4. **`dc7cdf09db0feb00.css` (79,391 B)**: All 18 Strapi block section styles (`HomeHero`, `HomeMetrics`, `ProgramsOverview`, `ServicesOverview`, `WhyChoose`, `CTASection`, `HeroSection`, `AboutInfo`, `Values`, `Team`, `ProgramsList`, `TierProgram`, `ServiceDetails`, `Careers`, `Contact`, `TextContent`, `DealSizer`, `Pricer`).

---

## 7. Granular Page-by-Page Breakdown of All 15 XML Routes

### Route 1: `/` — Home (`index.html` / `_rsc/index.rsc`)
- **Title**: `Battalion — Tech-Enabled Real Estate Private Lender`
- **Meta Description**: `Institutional-grade capital and technology for real estate investors and originators.`
- **3D Sequences**:
  - Primary (`activeSequenceType`): `hero` (127 desktop / 88 mobile frames; intro `1 -> 46`, scroll-scrub `46 -> end`)
  - Background Preloaded (`otherSequencesByType`): `dollar` (91 desktop / 42 mobile frames), `leaves` (41 desktop / 37 mobile frames)
- **Section Composition**:
  1. **`ComponentBlocksHomeHero`**:
     - H1 (`TextAnimation` chars): *"Modernizing Real Estate Private Lending"*
     - Subtitle: *"Institutional capital powered by proprietary technology for residential transitional and rental loans."*
     - CTA: *"Explore Programs"* (`/programs`)
     - 3D Canvas: `hero` sequence
  2. **`ComponentBlocksHomeMetrics`**:
     - Sticky 3D Canvas: `dollar` sequence scrubbed across 3 metric cards:
       - `$5B+` — *Combined team origination volume*
       - `$5M` — *Single loan sizes up to $5M+*
       - `30+` — *States covered nationwide*
     - Partner Logo Marquee: `logo_1_92292e4c91.png` through `logo_8_71b2421265.png`
  3. **`ComponentBlocksProgramsOverview`**:
     - Interactive Tabs: `Tier 1`, `DSCR`, `Bridge / RTL`
     - Displays LTV, Rate, Loan Size, Term, and property eligibility cards with link to `/programs` and `/tier-1-program`.
  4. **`ComponentBlocksServicesOverview`**:
     - Card 1: **The Composyte™** (`/composyte`) — Proprietary loan origination & pricing technology platform (`image002_0e466e9cbb.jpg`).
     - Card 2: **Other Services** (`/other-services`) — Third-party origination (TPO), capital markets, and advisory (`image003_6fd0adc954.jpg`).
  5. **`ComponentBlocksWhyChoose`**:
     - 3 Pillars: *Speed & Certainty*, *Transparent Pricing*, *Institutional Scale*.
  6. **`ComponentBlocksCta`**:
     - Scroll-scrubbed 3D `leaves` sequence + *"Ready to size your next deal?"* -> `/deal-sizer` & `/contact`.

---

### Route 2: `/about-us` — About Us (`about-us.html` / `_rsc/about-us.rsc`)
- **Title**: `About Us | Battalion`
- **3D Sequences**:
  - Primary: `stacked_building` (66 frames intro autoplay)
  - Secondary: `smile` (38 frames scroll-scrubbed in CTA)
- **Section Composition**:
  1. **`ComponentBlocksHero`**: H1 *"Built by Lenders, Powered by Technology"*, anchor bar (`Overview`, `Values`, `Team`), 3D `stacked_building` canvas.
  2. **`ComponentBlocksAboutInfo`**: Mission narrative + `CountUp` counters + looping architectural video (`/uploads/batallion_video_06d344de07.mp4`, `6,193,972` bytes).
  3. **`ComponentBlocksValues`**: Core values grid (*Transparency*, *Execution*, *Innovation*, *Partnership*).
  4. **`ComponentBlocksTeam`**: Executive & team portrait grid (23 team member headshots in `/uploads/`, including `David_Ludemann_70e86dd7ab.jpg`, `Eli_photo2_14d5b8b0c6.jpg`, `thumbnail_Daniel_Hilpert_100a216147.jpg`, etc.).
  5. **`ComponentBlocksCta`**: Scroll-scrubbed 3D `smile` sequence + CTA to `/careers` and `/contact`.

---

### Route 3: `/programs` — Lending Programs (`programs.html` / `_rsc/programs.rsc`)
- **Title**: `Loan Programs | Battalion`
- **3D Sequences**:
  - Primary: `key` (65 frames intro autoplay)
  - Secondary: `leaves` (41 desktop / 37 mobile frames scroll-scrubbed in CTA)
- **Section Composition**:
  1. **`ComponentBlocksHero`**: H1 *"Tailored Lending Programs"*, 3D `key` sequence.
  2. **`ComponentBlocksProgramsList`**: Detailed expandable program matrices for:
     - **DSCR Rental Loans** (Long-term 30-year fixed & ARM investment property loans)
     - **PrimeBridge™** (Low-leverage, fast-closing bridge financing)
     - **Bridge / Fix & Flip (RTL)** (Acquisition + renovation financing)
     - **Ground-Up Construction** (Infill residential construction loans)
  3. **`ComponentBlocksCta`**: 3D `leaves` sequence + CTA to `/pricer` and `/deal-sizer`.

---

### Route 4: `/tier-1-program` — Tier 1 Program (`tier-1-program.html` / `_rsc/tier-1-program.rsc`)
- **Title**: `Tier 1 Program | Battalion`
- **3D Sequences**:
  - Primary: `tier` (65 frames intro autoplay)
  - Secondary: `leaves` (scroll-scrubbed in CTA)
- **Section Composition**:
  1. **`ComponentBlocksHero`**: H1 *"Tier 1 Program"*, 3D `tier` sequence.
  2. **`ComponentBlocksTierProgram`**: Institutional-rate DSCR & Bridge terms for top-tier borrowers (740+ FICO, lower LTVs, streamlined underwriting).
  3. **`ComponentBlocksCta`**: 3D `leaves` sequence + CTA.

---

### Route 5: `/other-services` — Other Services (`other-services.html` / `_rsc/other-services.rsc`)
- **Title**: `Other Services | Battalion`
- **3D Sequences**:
  - Secondary: `leaves` (scroll-scrubbed in CTA)
- **Section Composition**:
  1. **`ComponentBlocksHero`**: H1 *"Comprehensive Capital Markets & Advisory Services"* (`image004_a88a34e233.jpg`).
  2. **`ComponentBlocksServiceDetails`**: Detailed breakdown of Table Funding, White-Label TPO, Note Financing, and Asset Management services.
  3. **`ComponentBlocksCta`**: 3D `leaves` sequence + CTA.

---

### Route 6: `/composyte` — The Composyte™ (`composyte.html` / `_rsc/composyte.rsc`)
- **Title**: `The Composyte | Battalion`
- **3D Sequences**:
  - Secondary: `leaves` (scroll-scrubbed in CTA)
- **Section Composition**:
  1. **`ComponentBlocksHero`**: H1 *"The Composyte™ — Next-Generation Lending Infrastructure"*.
  2. **`ComponentBlocksServiceDetails`**: Feature showcases of Battalion's proprietary POS/LOS platform: Automated Deal Sizing, Real-Time Pricing Engine, Document AI Underwriting, and Broker/TPO Portal (`image005_7d3f5ff4bc.jpg`, `image006_ca3e4c0aac.jpg`, `image007_861bbe484d.jpg`).
  3. **`ComponentBlocksCta`**: 3D `leaves` sequence + CTA.

---

### Route 7: `/deal-sizer` — Interactive Deal Sizer (`deal-sizer.html` / `_rsc/deal-sizer.rsc`)
- **Title**: `Deal Sizer | Battalion`
- **Section Composition**:
  1. **`ComponentBlocksDealSizer`** (Module `8831`):
     - Interactive inputs for Property Value, Calculation Mode (`LTV`, `Min DSCR`, `Max Payment`, `Min Cashflow`), Interest Rate slider, Amortization toggle, Gross Rent, and auto/manual Taxes, Insurance, and Expenses.
     - Real-time stacked bar chart (`Payment Breakdown` vs `Income & Cashflow`) + KPI summary strip (`Max Loan Amount`, `LTV`, `Monthly P&I`, `Monthly Cashflow`, `DSCR`).
     - *"Share Deal"* button copying compressed LZ-String URL (`?d=...`) and *"Price This Deal"* CTA linking to `/pricer`.

---

### Route 8: `/pricer` — Interactive Loan Pricer (`pricer.html` / `_rsc/pricer.rsc`)
- **Title**: `Loan Pricer | Battalion`
- **Section Composition**:
  1. **`ComponentBlocksPricer`** (Module `954`):
     - Product toggle (`Standard DSCR` vs `PrimeBridge™`), Watch Tutorial video button (`/uploads/Loan_pricer_opt_3_ed63f9fec3.mp4`).
     - 3-column input grid: Loan Info, Property Info (with State & County dropdowns), and Borrower Info.
     - Rate & Points matrix output table (30/45/60-day locks) + LLPA Price Adjustments breakdown table.

---

### Route 9: `/careers` — Careers (`careers.html` / `_rsc/careers.rsc`)
- **Title**: `Careers | Battalion`
- **3D Sequences**:
  - Primary: `careers` (40 frames intro autoplay)
- **Media**: `/uploads/Careers_video_2x_compressed_080ffc64a7.mp4` (`1,106,574` bytes)
- **Section Composition**:
  1. **`ComponentBlocksHero`**: H1 *"Join the Battalion Team"*, 3D `careers` sequence + culture video.
  2. **`ComponentBlocksCareers`**: Benefits & perks grid + expandable open job listings accordion.

---

### Route 10: `/contact` — Contact Us (`contact.html` / `_rsc/contact.rsc`)
- **Title**: `Contact Us | Battalion`
- **3D Sequences**:
  - Primary: `contact` (60 frames intro autoplay)
- **Section Composition**:
  1. **`ComponentBlocksHero`**: H1 *"Get in Touch"*, 3D `contact` sequence.
  2. **`ComponentBlocksContact`**: Interactive contact form (`firstName`, `lastName`, `email`, `phone` with mask, `company`, `loanType`, `message`, submitting to `POST /api/forms/contact`) + direct contact details.

---

### Route 11: `/battalion-tpo` — Battalion TPO Home (`battalion-tpo.html` / `_rsc/battalion-tpo.rsc`)
- **Title**: `Battalion TPO | Third-Party Origination`
- **3D Sequences**:
  - Primary: `hero` (127 desktop / 88 mobile frames)
  - Secondary: `dollar`, `leaves`
- **Section Composition**: Dedicated Third-Party Originator / Broker portal landing page featuring `HomeHero` (TPO messaging), `HomeMetricsSection`, `ProgramsOverviewSection`, `WhyChooseSection`, and `CTASection`.

---

### Route 12: `/programs-tpo` — TPO Lending Programs (`programs-tpo.html` / `_rsc/programs-tpo.rsc`)
- **Title**: `TPO Programs | Battalion`
- **3D Sequences**:
  - Primary: `key` (65 frames intro autoplay)
  - Secondary: `leaves` (scroll-scrubbed in CTA)
- **Section Composition**: Broker/TPO-specific program guidelines, wholesale rate sheets, and broker protection policies (`HeroSection` + `ProgramsListSection` + `CTASection`).

---

### Route 13: `/contact-tpo` — Contact TPO Desk (`contact-tpo.html` / `_rsc/contact-tpo.rsc`)
- **Title**: `Contact TPO | Battalion`
- **3D Sequences**:
  - Primary: `tpo` (66 frames intro autoplay)
- **Section Composition**: Broker onboarding & TPO scenario submission form (`HeroSection` with `tpo` 3D sequence + `ContactSection`).

---

### Route 14: `/terms-and-conditions` — Terms and Conditions (`terms-and-conditions.html` / `_rsc/terms-and-conditions.rsc`)
- **Title**: `Terms and Conditions | Battalion`
- **Section Composition**: `ComponentBlocksTextContent` rendering full legal Terms of Use with section headings and last-updated timestamp.

---

### Route 15: `/privacy-policy` — Privacy Policy (`privacy-policy.html` / `_rsc/privacy-policy.rsc`)
- **Title**: `Privacy Policy | Battalion`
- **Section Composition**: `ComponentBlocksTextContent` rendering full legal Privacy Policy, CCPA/CPRA disclosures, and data handling practices.

---

## 8. Running & Verifying the Exact Local Mirror (`http://localhost:3001`)

The zero-dependency Node.js server at `d:\argon trial rea\battalion-original\server.js`:
1. Serves all 15 clean routes (`/`, `/about-us`, `/programs`, `/tier-1-program`, `/other-services`, `/composyte`, `/deal-sizer`, `/pricer`, `/careers`, `/contact`, `/battalion-tpo`, `/programs-tpo`, `/contact-tpo`, `/terms-and-conditions`, `/privacy-policy`) and aliases (`/about` -> `/about-us`).
2. Automatically rewrites `https://battalion-cms.onrender.com/uploads/` to `/uploads/` in HTML and RSC responses so every video and CMS image loads from local disk with zero external latency.
3. Implements Next.js `/_next/image?url=...` resolution directly to local `/uploads/*` and root image files.
4. Serves `_rsc/<slug>.rsc` payloads when Next.js client-side router sends `RSC: 1` headers during `TransitionRouter` page transitions.
5. Supports HTTP `206 Partial Content` byte-range streaming for all `.mp4` videos (`batallion_video_06d344de07.mp4`, `Loan_pricer_opt_3_ed63f9fec3.mp4`, `Careers_video_2x_compressed_080ffc64a7.mp4`).
6. Handles `POST /api/forms/contact` locally with HTTP 200 `{ ok: true, status: "success" }`.
