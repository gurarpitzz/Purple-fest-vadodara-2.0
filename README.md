# Purple Fest Vadodara 2027

> **India's Landmark Festival of Inclusion, Human Dignity, Assistive Technology, Paralympic Sport, and Universal Design**  
> *14–16 January 2027 · Vadodara, Gujarat · In Alignment with Viksit Bharat @ 2047*

---

## Overview

**Purple Fest Vadodara 2027** brings India's premier festival of inclusion into the cultural and educational capital of Gujarat. Designed to unite persons with disabilities, innovators, researchers, grassroots organizations, caregivers, and policymakers, the festival champions universal accessibility and full inclusion across all **21 Benchmark Disabilities** recognized under India's **Rights of Persons with Disabilities (RPwD) Act 2016**.

This platform provides an editorial-grade, accessible web experience featuring 3D interactive canvases, responsive motion choreography, customizable event registration, automated cryptographic QR credentialing, real-time gate check-ins, and an independent administrative CMS.

---

## Key Highlights & Architectural Features

### 1. Interactive 3D Canvas & Sculptural Preloader
- **Retina 3D Sequence Canvas**: High-performance WebGL/2D `OffscreenCanvas` rendering layered with fluid scroll-driven transformations.
- **Hand-Drawn Continuous Ribbon Preloader**: An animated single-line SVG preloader that draws the continuous 3-figure PurpleFest ribbon emblem, 3 floating hearts, and official logo typography (`PURPLE FEST` & `Vadodara`), before gracefully docking into the header.

### 2. Universal Accessibility (WCAG 2.1 / 2.2 AA+ Compliance)
- **Dedicated Accessibility Panel**: Fast header and footer controls for:
  - **Text Sizing**: Decrement, display, and increment scaling (`85%` to `150%`).
  - **High-Contrast Schemes**: Default Light, Obsidian Dark, and High-Contrast Yellow-on-Black.
  - **Display Tuning**: Highlight links & buttons, wider letter/line spacing, and pause animations.
  - **TalkBack Screen Reader Audio**: Integrated synthetic voice navigation and screen-reader announcements with continuous heading consolidation.
- **Barrier-Free Standards**: Strictly follows WCAG 2.1/2.2 AA, IS 4963:2016 physical accessibility standards, and the Harmonised Guidelines for Universal Accessibility in India 2021.

### 3. Viksit Bharat @ 2047 & Paralympic Champions Showcase
- Dedicated `/viksit-bharat` portal showcasing national accessibility milestones, the Sugamya Bharat Abhiyan (Accessible India Campaign), and felicitations of India's Paralympic champions (Avani Lekhara, Sumit Antil, Devendra Jhajharia, Sheetal Devi, Dr. Deepa Malik).

### 4. Customizable Events, Registration & Ticketing
- **Standalone Application Portal (`/apply`)**: Distinct tracks for **Exhibition Stalls** (Tier A–D starting from ₹8,500) and **Delegate Passes** (₹2,200 standard access).
- **Dynamic Events Directory (`/events`)**: Event listings with dynamic registration fields, meal selections, caregiver companion details, and accommodation requests across all 21 RPwD categories.
- **Scholarship & Fellowship Waivers**: Coupon engine supporting 100% scholarship fee waivers (`DIVYANGJAN100`, `PURPLEFREE27`) and institutional concessions.

### 5. Cryptographic QR Passes & Gate Check-In Desk
- **Digital Entry Pass (`/pass`)**: Printable and mobile-friendly credential badge displaying attendee data, registered accommodations, and a tamper-proof ISO/IEC 18004 SVG QR code.
- **Gate Check-In Terminal (`/check-in`)**: Real-time scanner for registration desk staff, verifying attendee status, preventing duplicate admissions, and flashing instant Priority Accessibility Desk alerts.

### 6. Full-Stack Backend & Independent Admin CMS
- **Native SQLite Persistence**: Zero-dependency SQL persistence powered by `node:sqlite` in `data/purplefest.sqlite`.
- **Payment Gateway Integration**: Secure Razorpay order creation and HMAC-SHA256 signature verification.
- **Resend Email Engine**: Dispatches authenticated HTML accreditation letters containing official partner logos and embedded QR badges.
- **Secretariat Admin CMS (`/admin`)**: Self-service management dashboard to add/edit events, configure custom form fields, view revenue KPIs, and audit check-ins.

### 7. Authentic Imagery & Responsive Design
- **Authentic Documentary Photography**: Curated real-world photographs from Wikimedia Commons and Press Information Bureau (PIB) India depicting Indian Paralympians, Braille literacy, Indian Sign Language, and assistive technology.
- **Phone & Tablet Optimized**: Scoped layout optimizations ensuring fluid rendering on standard mobile devices (`390×844`, `360×800`).

---

## Route Directory

| Route | Description |
| :--- | :--- |
| `/` | Festival Homepage: Hero, 6 Experience Zones, Impact Metrics, and Community Voices |
| `/about-us` | Festival Foundation, Goa-to-Vadodara Journey, and Leadership Committee |
| `/viksit-bharat` | Viksit Bharat @ 2047 National Inclusion Vision & Paralympic Hall of Fame |
| `/programs` | 3-Day Daily Itinerary (14–16 January 2027) & Zone Guides |
| `/tier-1-program` | National Para-Sports Championships & Athlete Profiles |
| `/other-services` | The 21 RPwD Benchmark Disabilities Directory & On-Ground Accommodations |
| `/composyte` | GIEN & TISS Inclusive Education Conclave & Universal Design for Learning (UDL) |
| `/careers` | Volunteer Opportunities, ISL Interpreters & Cultural Artists Call |
| `/contact` | Secretariat Contact Coordinates & Support Desk |
| `/apply` | Dual Application Portal for Stalls & Delegate Passes |
| `/events` | Customizable Festival Events Catalog & Dynamic Registration Forms |
| `/pass` | Digital QR Entry Pass & Audio Credential Badge |
| `/check-in` | Day-of-Event Gate QR Verification Terminal |
| `/admin` | Independent Festival Secretariat Management CMS |
| `/terms-and-conditions` | Registration & Code of Conduct Policies |
| `/privacy-policy` | Data Protection & RPwD Accommodation Confidentiality |

---

## Getting Started

### Prerequisites
- Node.js 18.x or 20.x+ (Recommended: Node.js 22 LTS)

### Running the Server
Clone the repository and launch the local production server:

```bash
git clone https://github.com/gurarpitzz/Purple-fest-vadodara-2.0.git
cd Purple-fest-vadodara-2.0

# Start server
node server.js
```

The application will be accessible at **`http://localhost:3000`**.

### Running System Verification Tests
To run the automated 13/13 end-to-end integration test suite (verifying SQLite, Razorpay HMAC, QR Tokens, Resend Email templates, and Check-In validation):

```bash
node tests/full-system-test-suite.mjs
```

---

## Credits & Attribution

- **Organized By**: Purple Fest Vadodara 2027 Secretariat, in partnership with Praangan, Brotherhood, Global Inclusive Education Network (GIEN), and Goa State Commission for Persons with Disabilities.
- **Designed & Developed By**: Gurarpit Singh and Mehardeep Singh · Ajeet Graphics.

---

*Together for an Inclusive and Accessible Bharat.*
