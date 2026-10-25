# Purple Fest Vadodara 2027 — Powered by the Decoded `www.battalion.com` 3D & Next.js Architecture

Official 15-page web experience for **Purple Fest Vadodara 2027** (*14–16 January 2027 · Viksit Bharat @ 2047*), engineered on top of the 100% reverse-engineered **`www.battalion.com`** Next.js App Router, GSAP/Lenis/SplitText, and 2x Retina `OffscreenCanvas` 3D sequence architecture using **REA (`morluto/rea`)**.

---

## Live Local Servers

1. **PurpleFest Vadodara 2027 inside Battalion (`http://localhost:3000`)**:
   ```bash
   cd "d:\argon trial rea\purple fest vadodara"
   node server.js
   ```
2. **Original `www.battalion.com` 1:1 Replica (`http://localhost:3001`)**:
   ```bash
   cd "d:\argon trial rea\battalion-original"
   node server.js
   ```

---

## All 15 XML Sitemap Routes (`sitemap-0.xml`)

| # | Route | 3D Sequence(s) | PurpleFest Vadodara 2027 Content |
| :-: | :--- | :---: | :--- |
| 1 | `/` | `hero`, `dollar`, `leaves` | Home, `₹2,200` Delegate Pass & `Tier A–D` Stall cards, Convenor message, 4 Benefits, 4 Metrics (`10,000+`, `21`, `6 Zones`, `100+`), 4 Zone tabs, Sizer, 4 Steps, 4 Coalition Voices, Tech showcase (`final.mp4`), CTA |
| 2 | `/about-us` | `stacked_building`, `smile` | Why Purple & Viksit Bharat @ 2047, 4 Foundational Pillars, 6-Milestone Goa-to-Vadodara Timeline (`1893` to `2027`), 8 Organising Committee & Coalition Leadership profiles |
| 3 | `/programs` | `key`, `leaves` | 3-Day Festival Programme (`14–16 Jan 2027`) & 6 Barrier-Free Experience Zones (`Zone 01`–`Zone 06`) |
| 4 | `/tier-1-program` | `tier` | Indian Paralympic Champions & Para-Sports Track (`Avani Lekhara`, `Sumit Antil`, `Devendra Jhajharia`, `Sheetal Devi`, `Dr. Deepa Malik`, `Bhavina Patel`, `Mariyappan Thangavelu`, `Praveen Kumar`) |
| 5 | `/other-services` | `leaves` | All 21 Benchmark Disabilities under the RPwD Act 2016 across 4 clinical/accessibility clusters + Barrier-Free Services |
| 6 | `/composyte` | Video | GIEN & TISS Inclusive Education Conclave, UDL, NEP 2020 Section 16, Assistive AI & IS 4963 / WCAG 2.1 AA+ Infrastructure |
| 7 | `/deal-sizer` | Calculator | Interactive Exhibition Stall (`Tier A ₹15K`, `Tier B ₹35K`, `Tier C ₹12K`, `Tier D ₹5.5K`) & Institutional CSR Delegation Sizer (`Decimal.js`) |
| 8 | `/pricer` | Pricer + `Next-Action` | Interactive Delegate Pass (`₹2,200` mandatory uniform fee) & Exhibitor Stall Pricer |
| 9 | `/careers` | `careers` | 500+ Volunteer Brigade, Certified ISL Interpreters, Purple Kaleidoscope Artists & GIEN/TISS Academic Presenters |
| 10 | `/contact` | `contact` | Vadodara Secretariat (MSU Baroda Pavilion & Sayaji Nagar Gruh · Praangan, Old Padra Road), `+91 98250 93918`, `purplefestvadodara@gmail.com` & Registration Form |
| 11 | `/battalion-tpo` | `hero`, `dollar`, `leaves` | Coalition & Institutional Partners Portal (Universities, NGOs, CSR Schedule VII Foundations, Government Bodies, Special Schools) |
| 12 | `/programs-tpo` | `key`, `leaves` | Exhibitor Stall Tiers (`Tier B ₹35,000`, `Tier A ₹15,000`, `Tier C ₹12,000`, `Tier D ₹5,500`) & Institutional Tracks |
| 13 | `/contact-tpo` | `tpo` | Exhibitor Stall Booking & Institutional Partnership Registration Desk |
| 14 | `/terms-and-conditions` | Legal Template | Delegate (`₹2,200`) & Exhibitor (`Tier A–D`) Terms, RPwD Act 2016 Compliance & Code of Conduct |
| 15 | `/privacy-policy` | Legal Template | Privacy & Accessibility Data Protection Policy (DPDP Act 2023 & 21 RPwD Accommodation Confidentiality) |

---

## Rebuilding / Updating Content

To regenerate all 15 HTML routes and `_rsc/*.rsc` React Flight payloads from the structured dataset:

```bash
node build-purplefest-battalion.mjs
```

- [`purplefest-content-data.mjs`](./purplefest-content-data.mjs): Master PurpleFest Vadodara 2027 dataset.
- [`purplefest-route-transformers.mjs`](./purplefest-route-transformers.mjs): AST route transformers for all 15 XML routes.
- [`legacy-purplefest-backup/`](./legacy-purplefest-backup): Backup of the prior standalone PurpleFest build.
