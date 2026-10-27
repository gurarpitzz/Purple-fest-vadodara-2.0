// Complete PurpleFest Vadodara 2027 Content Dataset mapped to Battalion's 15-page architecture

export function makeMedia(filename, alt = "Purple Fest Vadodara 2027", width = 1920, height = 1080) {
  const ext = filename.slice(filename.lastIndexOf('.'));
  const isVideo = ext === '.mp4' || ext === '.webm';
  const url = `/uploads/${filename}`;
  return {
    documentId: `pf_${filename.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20)}`,
    name: filename,
    alternativeText: alt,
    caption: alt,
    width: isVideo ? null : width,
    height: isVideo ? null : height,
    formats: isVideo ? null : {
      thumbnail: {
        name: `thumb_${filename}`,
        hash: `thumb_${filename}`,
        ext,
        mime: ext === '.png' ? 'image/png' : 'image/jpeg',
        path: null,
        width: 245,
        height: 138,
        size: 12.5,
        sizeInBytes: 12500,
        url
      },
      small: {
        name: `small_${filename}`,
        hash: `small_${filename}`,
        ext,
        mime: ext === '.png' ? 'image/png' : 'image/jpeg',
        path: null,
        width: 750,
        height: 422,
        size: 64.0,
        sizeInBytes: 64000,
        url
      }
    },
    hash: filename.replace(/\.[^.]+$/, ''),
    ext,
    mime: isVideo ? 'video/mp4' : (ext === '.png' ? 'image/png' : 'image/jpeg'),
    size: 450.0,
    url,
    previewUrl: null,
    provider: 'local',
    provider_metadata: null,
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    publishedAt: '2026-01-14T10:00:00.000Z'
  };
}

export function makePageRef(slug, title) {
  return {
    documentId: `page_${slug.replace(/[^a-z0-9]/g, '_')}`,
    title,
    slug,
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    publishedAt: '2026-01-14T10:00:00.000Z'
  };
}

export const NAV_OVERRIDES = {
  // Header items
  sa7jbt6bm67kt75flk57b2th: { title: 'Programme & Zones', type: 'INTERNAL', path: 'programs', externalPath: null },
  dbojgmjb8swl8jwiwn18dexo: { title: 'Movement', type: 'WRAPPER', path: '', externalPath: null },
  ckoxqqw4a9j6jv7u3dxevosc: { title: 'About & Goa Legacy', type: 'INTERNAL', path: 'about-us', externalPath: null },
  viksitbharat2047navitem1: { title: 'Viksit Bharat @ 2047', type: 'INTERNAL', path: 'viksit-bharat', externalPath: null },
  ld6e3de6jnhie9hqsq79hg2a: { title: 'Volunteer & Cultural Call', type: 'INTERNAL', path: 'careers', externalPath: null },
  ut6jljmr50h59iyw577zgqrt: { title: 'Inclusion & Passes', type: 'WRAPPER', path: '', externalPath: null },
  flicnbywi91sfmdz42b1ckbj: { title: 'GIEN & Barrier-Free', type: 'INTERNAL', path: 'composyte', externalPath: null },
  wzifx69p7lm3h6ig9olrhrcz: { title: 'Exhibitors & CSR', type: 'INTERNAL', path: 'battalion-tpo', externalPath: null },
  g8ra59rhai20t1c5fnul1qgs: { title: 'Stall Tiers (A–D)', type: 'INTERNAL', path: 'programs-tpo', externalPath: null },
  vbdf750hqz2p92fz2u9nlxy6: { title: 'Apply Now', type: 'EXTERNAL', path: null, externalPath: '/apply' },
  msgf5l29hk8uub0cmfj0haw8: { title: 'Register & Contact', type: 'INTERNAL', path: 'contact', externalPath: null },

  // Footer items
  l7msxv42osi4ve1uoaschox1: { title: 'Programme', type: 'INTERNAL', path: 'programs', externalPath: null },
  mlypshy9s9mxzzykbts3m5s4: { title: 'Exhibitors', type: 'INTERNAL', path: 'battalion-tpo', externalPath: null },
  uf2wftje8ofd0oev7ijna2hy: { title: 'Paralympians', type: 'INTERNAL', path: 'tier-1-program', externalPath: null },
  wgh79d5ukodmy7u75u5u4111: { title: '21 Disabilities', type: 'INTERNAL', path: 'other-services', externalPath: null },
  yoqi6s5utjkvbet7og8dozii: { title: 'GIEN Summit', type: 'INTERNAL', path: 'composyte', externalPath: null },
  wjw6dpmnywsu1hmw8h139s90: { title: 'Pass Sizer', type: 'INTERNAL', path: 'deal-sizer', externalPath: null },
  vop3rqxn3nd4bwcepsjjhzhu: { title: 'Apply Now', type: 'EXTERNAL', path: null, externalPath: '/apply' },
  vv7g36dovb25196gs0gkr6x2: { title: 'Contact Us', type: 'INTERNAL', path: 'contact', externalPath: null },
  jfbbvg9v2y7d5zctxbl0ym3e: { title: 'About Us', type: 'INTERNAL', path: 'about-us', externalPath: null },
  k3koriadssj4cys0k8lrogo7: { title: 'Volunteer', type: 'INTERNAL', path: 'careers', externalPath: null },

  // Footer Small Nav
  x321hpivjte94osfhqbnnub7: { title: 'Privacy Policy', type: 'INTERNAL', path: 'privacy-policy', externalPath: null },
  vgqm7joto23nqpwlqwceluwt: { title: 'Terms & Conditions', type: 'INTERNAL', path: 'terms-and-conditions', externalPath: null },

  // TPO Pages
  t701yvus2r7l3f1id92j3qad: { title: 'Exhibitors', type: 'INTERNAL', path: 'battalion-tpo', externalPath: null },
  l1330rnufc2nbfdsp1a3gljs: { title: 'Stall Tiers', type: 'INTERNAL', path: 'programs-tpo', externalPath: null },
  ndmpk2x3myw67jfb086qr7rl: { title: 'Contact Us', type: 'INTERNAL', path: 'contact-tpo', externalPath: null }
};

export const GLOBAL_PROVIDER_DATA = {
  CEOMessageData: {
    documentId: 'pf_ceo_msg_2027',
    firstName: 'Radha Tandon',
    lastName: '& Satish Kapoor',
    position: 'Festival Director (Praangan) & Festival Coordinator (Brotherhood, Delhi)',
    content: '<p>To All Delegates, Innovators, Educators & Champions,</p><p>When the International Purple Fest first convened in Goa, it transformed how India experiences disability—moving from charity and welfare to human rights, celebration, accessibility, and pride across all <strong>21 Benchmark Disabilities under the RPwD Act 2016</strong>.</p><p>On <strong>21–23 January 2027</strong>, jointly organised by <strong>Praangan (Vadodara, Gujarat)</strong>, <strong>Brotherhood (Delhi)</strong>, and the <strong>Centre for Disabilities Studies and Action, School of Social Work, Tata Institute of Social Sciences (TISS, Mumbai)</strong>, with Knowledge Partner <strong>State Commission for Persons with Disabilities, Goa</strong> and Venue Partners <strong>The Maharaja Sayajirao University, Vadodara</strong> and <strong>GMERS Medical College, Gotri, Vadodara</strong>, Purple Fest arrives in Vadodara—the cultural capital shaped by Maharaja Sayajirao Gaekwad III’s pioneering legacy of universal education and social reform.</p><p>Whether you join as a registered delegate (₹2,200 full 3-day pass), an assistive technology innovator, a Paralympic athlete, an educator, or a CSR partner, you are co-architecting a barrier-free India.</p><p>Nothing About Us, Without Us.</p>',
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    publishedAt: '2026-01-14T10:00:00.000Z'
  },
  footerData: {
    documentId: 'pf_footer_2027',
    email: 'purplefestivalvadodara@gmail.com',
    phone: '+91 99743 83920 / +91 98994 72065',
    copyright: '© [[year_now]] Purple Fest Vadodara · www.purplefestivalvadodara.com',
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    publishedAt: '2026-01-14T10:00:00.000Z',
    socialNetworks: [
      { id: '13', link: 'https://www.instagram.com/', type: 'instagram' },
      { id: '14', link: 'https://www.linkedin.com/', type: 'linkedin' },
      { id: '15', link: 'https://www.facebook.com/', type: 'facebook' },
      { id: '16', link: 'https://x.com/', type: 'x' }
    ],
    logos: {
      id: '8',
      title: 'Organising Coalition & Institutional Partners:',
      images: [
        makeMedia('pf_partner_praangan.png', 'Praangan Vadodara', 212, 92),
        makeMedia('pf_partner_brotherhood.png', 'We Are Together (Brotherhood)', 212, 92),
        makeMedia('pf_partner_gien.png', 'Global Inclusive Education Network (GIEN)', 212, 92)
      ]
    },
    employeeButton: {
      id: '1392',
      title: 'Exhibitor & CSR Portal',
      theme: 'link',
      page: makePageRef('battalion-tpo', 'Exhibitors & CSR Portal'),
      externalPage: null,
      modal: false
    }
  },
  footerTpoData: {
    documentId: 'pf_footer_tpo_2027',
    email: 'purplefestivalvadodara@gmail.com',
    phone: '+91 99743 83920 / +91 98994 72065',
    copyright: '© [[year_now]] Purple Fest Vadodara · www.purplefestivalvadodara.com',
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    publishedAt: '2026-01-14T10:00:00.000Z',
    socialNetworks: [
      { id: '25', link: 'https://www.instagram.com/', type: 'instagram' },
      { id: '26', link: 'https://www.linkedin.com/', type: 'linkedin' },
      { id: '27', link: 'https://www.facebook.com/', type: 'facebook' },
      { id: '28', link: 'https://x.com/', type: 'x' }
    ],
    logos: {
      id: '9',
      title: 'Organising Coalition & Institutional Partners:',
      images: [
        makeMedia('pf_partner_praangan.png', 'Praangan Vadodara', 212, 92),
        makeMedia('pf_partner_brotherhood.png', 'We Are Together (Brotherhood)', 212, 92),
        makeMedia('pf_partner_gien.png', 'Global Inclusive Education Network (GIEN)', 212, 92)
      ]
    },
    employeeButton: {
      id: '1405',
      title: 'Apply Now',
      theme: 'primary',
      page: null,
      externalPage: '/apply',
      modal: false
    }
  },
  headerData: {
    documentId: 'pf_header_2027',
    title: '21–23 January 2027 · Vadodara, Gujarat · Mandatory Delegate Registration ₹2,200',
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    publishedAt: '2026-01-14T10:00:00.000Z',
    button: {
      id: '1390',
      title: 'Apply Now',
      theme: null,
      page: null,
      externalPage: '/apply',
      modal: false
    },
    paymentButton: {
      id: '1391',
      title: 'Book Stall',
      theme: null,
      page: makePageRef('contact-tpo', 'Book Exhibition Stall'),
      externalPage: null,
      modal: false
    }
  },
  headerTpoData: {
    documentId: 'pf_header_tpo_2027',
    title: 'Purple Fest Vadodara 2027 · Institutional & CSR Pavilion Desk',
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    publishedAt: '2026-01-14T10:00:00.000Z',
    button: {
      id: '1403',
      title: 'Book Exhibition Stall',
      theme: 'secondary',
      page: makePageRef('contact-tpo', 'Institutional & CSR Contact'),
      externalPage: null,
      modal: false
    },
    contactButton: {
      id: '1404',
      title: 'Apply Now',
      theme: 'outline_dark',
      page: null,
      externalPage: '/apply',
      modal: false
    }
  },
  headerNavigationData: {
    documentId: 'c7l5ca6781hrrdimlek0josb',
    name: 'Header',
    slug: 'header',
    visible: true,
    items: [
      { documentId: 'sa7jbt6bm67kt75flk57b2th', title: 'Programme & Zones', type: 'INTERNAL', order: 1, path: 'programs', externalPath: null, parent: null },
      { documentId: 'ckoxqqw4a9j6jv7u3dxevosc', title: 'About & Goa Legacy', type: 'INTERNAL', order: 1, path: 'about-us', externalPath: null, parent: { documentId: 'dbojgmjb8swl8jwiwn18dexo', title: 'Movement', type: 'WRAPPER', path: '', externalPath: null } },
      { documentId: 'viksitbharat2047navitem1', title: 'Viksit Bharat @ 2047', type: 'INTERNAL', order: 2, path: 'viksit-bharat', externalPath: null, parent: { documentId: 'dbojgmjb8swl8jwiwn18dexo', title: 'Movement', type: 'WRAPPER', path: '', externalPath: null } },
      { documentId: 'flicnbywi91sfmdz42b1ckbj', title: 'GIEN & Barrier-Free', type: 'INTERNAL', order: 1, path: 'composyte', externalPath: null, parent: { documentId: 'ut6jljmr50h59iyw577zgqrt', title: 'Inclusion & Passes', type: 'WRAPPER', path: '', externalPath: null } },
      { documentId: 'wzifx69p7lm3h6ig9olrhrcz', title: 'Exhibitors & CSR', type: 'INTERNAL', order: 2, path: 'battalion-tpo', externalPath: null, parent: null },
      { documentId: 'ld6e3de6jnhie9hqsq79hg2a', title: 'Volunteer & Cultural Call', type: 'INTERNAL', order: 3, path: 'careers', externalPath: null, parent: { documentId: 'dbojgmjb8swl8jwiwn18dexo', title: 'Movement', type: 'WRAPPER', path: '', externalPath: null } },
      { documentId: 'g8ra59rhai20t1c5fnul1qgs', title: 'Stall Tiers (A–D)', type: 'INTERNAL', order: 2, path: 'programs-tpo', externalPath: null, parent: { documentId: 'ut6jljmr50h59iyw577zgqrt', title: 'Inclusion & Passes', type: 'WRAPPER', path: '', externalPath: null } },
      { documentId: 'ut6jljmr50h59iyw577zgqrt', title: 'Inclusion & Passes', type: 'WRAPPER', order: 3, path: '', externalPath: null, parent: null },
      { documentId: 'vbdf750hqz2p92fz2u9nlxy6', title: 'Apply Now', type: 'EXTERNAL', order: 3, path: null, externalPath: '/apply', parent: { documentId: 'ut6jljmr50h59iyw577zgqrt', title: 'Inclusion & Passes', type: 'WRAPPER', path: '', externalPath: null } },
      { documentId: 'dbojgmjb8swl8jwiwn18dexo', title: 'Movement', type: 'WRAPPER', order: 4, path: '', externalPath: null, parent: null },
      { documentId: 'msgf5l29hk8uub0cmfj0haw8', title: 'Register & Contact', type: 'INTERNAL', order: 5, path: 'contact', externalPath: null, parent: null }
    ]
  }
};

export const ROUTE_METADATA = {
  'index': {
    title: 'Purple Fest Vadodara 2027 | Celebrating Inclusion, Dignity & Accessibility (21–23 Jan 2027)',
    description: 'Join Purple Fest Vadodara 2027 (21–23 January 2027) in Sanskari Nagari Vadodara. Organised by Praangan, Brotherhood & TISS Mumbai with Knowledge Partner State Commission for PwD Goa at MSU Vadodara & GMERS Gotri. Mandatory Delegate Pass ₹2,200 · 6 Experience Zones · 21 RPwD Benchmark Disabilities.'
  },
  'about-us': {
    title: 'About Purple Fest Vadodara 2027 | From Goa’s Global Mandate to Maharaja Sayajirao’s Vadodara',
    description: 'Discover the movement behind Purple Fest Vadodara 2027 (21–23 January 2027): the Goa Purple Fest heritage, Maharaja Sayajirao Gaekwad III’s reform legacy, Viksit Bharat @ 2047 alignment, our multi-institutional coalition, and Organising Committee leadership.'
  },
  'viksit-bharat': {
    title: 'Viksit Bharat @ 2047 & Sugamya Bharat Abhiyan | Hon’ble PM Shri Narendra Modi’s Vision for Divyangjan | Purple Fest Vadodara 2027',
    description: 'Inspired by Hon’ble Prime Minister Shri Narendra Modi’s national vision of Viksit Bharat @ 2047 and Sugamya Bharat Abhiyan—transforming India from welfare to human dignity, assistive deep-tech, and Paralympic excellence across all 21 Benchmark Disabilities.'
  },
  'programs': {
    title: '3-Day Programme & 6 Experience Zones | Purple Fest Vadodara 2027 (21–23 Jan 2027)',
    description: 'Explore the complete 3-Day Festival Schedule (21–23 January 2027) and all 6 Barrier-Free Experience Zones: Assistive Tech Expo, GIEN & TISS Summit, Purple Kaleidoscope, Para-Sports Arena, Sensory Sanctuary & Birding Trail.'
  },
  'tier-1-program': {
    title: 'Indian Paralympic Champions & Purple Sports | Purple Fest Vadodara 2027',
    description: 'Celebrating India’s Paralympic Hall of Fame—Avani Lekhara, Sumit Antil, Devendra Jhajharia, Sheetal Devi, Dr. Deepa Malik, Bhavina Patel, Mariyappan Thangavelu & Praveen Kumar—and Zone 04 Adaptive Sports in Vadodara.'
  },
  'other-services': {
    title: 'All 21 Benchmark Disabilities (RPwD Act 2016) & Barrier-Free Services | Purple Fest Vadodara 2027',
    description: 'Comprehensive directory of all 21 Benchmark Disabilities recognized under India’s Rights of Persons with Disabilities (RPwD) Act 2016 and our 8 mandatory on-ground accessibility guarantees.'
  },
  'composyte': {
    title: 'GIEN & TISS Inclusive Education Conclave + Barrier-Free Architecture | Purple Fest Vadodara 2027',
    description: 'Explore the Global Inclusive Education Network (GIEN) & TISS Academic Conclave, Universal Design for Learning (UDL), WCAG 2.1 AA+ digital standards, and IS 4963 physical accessibility specifications.'
  },
  'deal-sizer': {
    title: 'Exhibition Stall & Institutional Delegation Sizer | Purple Fest Vadodara 2027',
    description: 'Interactive CSR grant, exhibition pavilion (Tier A ₹15,000 · Tier B ₹35,000 · Tier C ₹12,000 · Tier D ₹5,500), and sponsored ₹2,200 delegate pass calculator for Purple Fest Vadodara 2027.'
  },
  'pricer': {
    title: 'Delegate Pass (₹2,200) & Exhibitor Stall Pricer | Purple Fest Vadodara 2027',
    description: 'Official fee calculator for Purple Fest Vadodara 2027: Mandatory ₹2,200 Delegate Pass (no free visitor entry) and Tier A–D Exhibition Stalls with full 21-RPwD accessibility accommodations.'
  },
  'careers': {
    title: 'Volunteer Brigades, Cultural Performers & GIEN Paper Call | Purple Fest Vadodara 2027',
    description: 'Join 500+ Inclusive Volunteers, ISL Interpreters, Purple Kaleidoscope disabled artists, and GIEN & TISS research presenters at Purple Fest Vadodara 2027 (21–23 January 2027).'
  },
  'contact': {
    title: 'Register Delegate Pass (₹2,200) & Accessibility Desk | Purple Fest Vadodara 2027',
    description: 'Register for your mandatory ₹2,200 Delegate Pass, request RPwD Act 2016 accommodations across all 21 Benchmark Disabilities, or contact Praangan Vadodara (Radha Tandon: +91 99743 83920 · Satish Kapoor: +91 98994 72065, +91 92117 60202 · purplefestivalvadodara@gmail.com).'
  },
  'battalion-tpo': {
    title: 'Institutional, CSR, University & Exhibitor Portal | Purple Fest Vadodara 2027',
    description: 'Partner with Praangan, Brotherhood, GIEN, and TISS Mumbai at Purple Fest Vadodara 2027 (21–23 January 2027). Book Tier A–D Assistive Tech & NGO Pavilions or sponsor delegate cohorts under Schedule VII CSR.'
  },
  'programs-tpo': {
    title: 'Exhibition Stall Tiers (Tier A–D) & Institutional Tracks | Purple Fest Vadodara 2027',
    description: 'Compare Tier A (₹15,000 Standard 3m×3m), Tier B (₹35,000 Corner 6m×3m), Tier C (₹12,000 Startup/University), and Tier D (₹5,500 DPO/Grassroots NGO) exhibition stalls for 21–23 January 2027.'
  },
  'contact-tpo': {
    title: 'Book Exhibition Stall (Tier A–D) & CSR Sponsorship Desk | Purple Fest Vadodara 2027',
    description: 'Direct institutional booking desk for Tier A–D Exhibition Stalls, CSR Schedule VII sponsorships, and university delegations at Purple Fest Vadodara 2027 (21–23 January 2027).'
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions · Mandatory ₹2,200 Delegate Pass & Stall Rules | Purple Fest Vadodara 2027',
    description: 'Official Terms & Conditions for Purple Fest Vadodara 2027 (21–23 January 2027), including the Mandatory ₹2,200 Delegate Registration Policy (no free visitors), Tier A–D Exhibitor Rules, and RPwD Act 2016 Charter.'
  },
  'privacy-policy': {
    title: 'Privacy Policy · DPDP Act 2023 & RPwD Accommodation Data | Purple Fest Vadodara 2027',
    description: 'How Purple Fest Vadodara 2027 protects delegate registration data and confidential RPwD Act 2016 (21 Benchmark Disabilities) accessibility accommodation requests under the DPDP Act 2023.'
  }
};

export const TERMS_HTML = `
<p>Welcome to the official portal of <strong>Purple Fest Vadodara 2027</strong> (<a href="https://www.purplefestivalvadodara.com" target="_blank" rel="noopener">www.purplefestivalvadodara.com</a>), scheduled for <strong>21–23 January 2027</strong> in <strong>Vadodara, Gujarat (Sanskari Nagari)</strong>. Purple Fest Vadodara 2027 is jointly organised by <strong>Praangan (Vadodara, Gujarat)</strong>, <strong>Brotherhood (Delhi)</strong>, and the <strong>Centre for Disabilities Studies and Action, School of Social Work, Tata Institute of Social Sciences (TISS, Mumbai)</strong>, with Knowledge Partner <strong>State Commission for Persons with Disabilities, Goa</strong> and Venue Partners <strong>The Maharaja Sayajirao University, Vadodara</strong> and <strong>GMERS Medical College, Gotri, Vadodara</strong>.</p>
<p>By accessing this portal, registering for a Delegate Pass, booking an Exhibition Stall, or submitting an abstract/performance proposal, you agree to be bound by these Terms &amp; Conditions and our Barrier-Free Dignity Charter.</p>

<h2>1. Mandatory Delegate Registration &amp; Strict No-Free-Visitor Policy (₹2,200)</h2>
<p>In accordance with the Organising Committee’s crowd-safety, sensory-comfort, and universal accessibility mandate:</p>
<ul>
  <li><strong>Mandatory Registration Fee:</strong> Every adult delegate, accompanying professional, academic participant, corporate representative, and general attendee must hold a valid, pre-registered <strong>Delegate Pass priced at ₹2,200 (Indian Rupees Two Thousand Two Hundred Only)</strong> for the full 3-day festival (21–23 January 2027).</li>
  <li><strong>No Free Casual Walk-In Visitors:</strong> To prevent overcrowding of wheelchair turning radii (1500 mm minimum under IS 4963), tactile paving corridors, and low-sensory zones, <strong>there is no free casual visitor or walk-in public entry</strong>. Entry to all 6 Experience Zones is strictly controlled via QR/Braille-embossed Delegate Badges.</li>
  <li><strong>What the ₹2,200 Delegate Pass Covers:</strong> Full 3-day access to all 6 Experience Zones, keynote plenaries, GIEN &amp; TISS Inclusive Education sessions, Purple Kaleidoscope cultural evenings, Para-Sports Arena championships, accessible festival kit (Braille/large-print/digital), and on-site ISL interpretation &amp; electric buggy shuttles.</li>
  <li><strong>Escort / Personal Assistant Policy:</strong> Registered delegates with high-support benchmark disabilities requiring a dedicated personal care attendant or sign-language interpreter must declare their escort during registration so a linked Companion Credential can be issued under the Accessibility Desk protocol.</li>
</ul>

<h2>2. Exhibition Stall Booking Rules &amp; 4-Tier Fee Schedule (Tiers A, B, C &amp; D)</h2>
<p>Organizations booking stalls in <strong>Zone 01 (Assistive Tech, Innovation &amp; Startup Expo)</strong> and the NGO/DPO Marketplace are bound by the following 3-day tariff and operational rules:</p>
<ul>
  <li><strong>Tier A — Standard 3m × 3m Octanorm Stall (₹15,000 for 3 Days):</strong> Includes 9 sq.m octanorm shell scheme, fascia board with Braille/high-contrast signage, 1 accessible counter (760 mm knee clearance), 2 chairs, three 15A power sockets, LED spotlights, and <strong>2 complimentary Exhibitor Badges</strong>.</li>
  <li><strong>Tier B — Corner / Prime 6m × 3m Double Pavilion (₹35,000 for 3 Days):</strong> Includes 18 sq.m two-side-open prime corner pavilion for CSR Flagships, Ministries, PSUs, and Assistive Tech OEMs, live demo bay, dual accessible counters, and <strong>4 complimentary Exhibitor Badges</strong>.</li>
  <li><strong>Tier C — Assistive Startup &amp; University Lab Pod (₹12,000 for 3 Days):</strong> Dedicated innovation pod for DPIIT-recognized assistive tech startups, university R&amp;D labs, and student engineering teams, including demo table, power, and <strong>2 complimentary Exhibitor Badges</strong>.</li>
  <li><strong>Tier D — Grassroots NGO, DPO &amp; Disabled Artisan Stall (₹5,500 for 3 Days):</strong> Subsidized 3m × 2m stall exclusively for registered Disabled People’s Organisations (DPOs), special schools, and self-help artisan collectives, including display table and <strong>2 complimentary Exhibitor Badges</strong>.</li>
  <li><strong>Additional Personnel:</strong> Any stall personnel beyond the complimentary badge quota must register for a standard <strong>₹2,200 Delegate Pass</strong>.</li>
  <li><strong>Barrier-Free Stall Mandate:</strong> Exhibitors must maintain a minimum 1200 mm clear aisle inside/around their stall, provide audio/tactile descriptions of showcased products, and refrain from using strobe lighting (above 3 flashes/second) or unannounced high-decibel PA systems (&gt;75 dB).</li>
</ul>

<h2>3. Compliance with the RPwD Act 2016 Across All 21 Benchmark Disabilities</h2>
<p>Purple Fest Vadodara 2027 operates in strict statutory alignment with India’s <strong>Rights of Persons with Disabilities (RPwD) Act, 2016</strong> and the <strong>UN Convention on the Rights of Persons with Disabilities (UNCRPD)</strong> across all <strong>21 Benchmark Disabilities</strong>:</p>
<ol>
  <li>Blindness</li>
  <li>Low-vision</li>
  <li>Leprosy Cured Persons</li>
  <li>Hearing Impairment (Deaf and Hard of Hearing)</li>
  <li>Locomotor Disability</li>
  <li>Dwarfism</li>
  <li>Intellectual Disability</li>
  <li>Mental Illness</li>
  <li>Autism Spectrum Disorder</li>
  <li>Cerebral Palsy</li>
  <li>Muscular Dystrophy</li>
  <li>Chronic Neurological Conditions</li>
  <li>Specific Learning Disabilities (Dyslexia, Dysgraphia, Dyscalculia)</li>
  <li>Multiple Sclerosis</li>
  <li>Speech and Language Disability</li>
  <li>Thalassemia</li>
  <li>Hemophilia</li>
  <li>Sickle Cell Disease</li>
  <li>Multiple Disabilities including Deafblindness</li>
  <li>Acid Attack Victims</li>
  <li>Parkinson’s Disease</li>
</ol>
<p>Zero tolerance is enforced against any form of ableism, discriminatory language, obstruction of accessible ramps/washrooms/tactile paths, or denial of reasonable accommodation.</p>

<h2>4. Cancellations, Substitutions &amp; Force Majeure</h2>
<ul>
  <li><strong>Delegate Pass Substitutions:</strong> A registered ₹2,200 Delegate Pass may be transferred to another named delegate from the same organization up to <strong>18 January 2027</strong> by emailing <strong>purplefestivalvadodara@gmail.com</strong>.</li>
  <li><strong>Stall Cancellation:</strong> Cancellations received in writing before <strong>15 December 2026</strong> are eligible for a 50% refund net of bank/processing charges; cancellations after 15 December 2026 are non-refundable as octanorm fabrication and tactile/Braille directories are finalized.</li>
</ul>

<h2>5. Photography, Livestreaming &amp; Intellectual Property</h2>
<p>Keynote plenaries, Purple Kaleidoscope performances, and Para-Sports matches are photographed and livestreamed with real-time Indian Sign Language (ISL) and closed captions for educational and advocacy archives by Praangan, Brotherhood, GIEN, and TISS. Delegates who prefer not to be photographed in close-up may request a distinct lanyard indicator at the Registration Desk.</p>

<h2>6. Governing Law &amp; Secretariat Contact</h2>
<p>These Terms &amp; Conditions are governed by the laws of India, with exclusive jurisdiction in the courts of <strong>Vadodara, Gujarat</strong>. For all official correspondence, contact the Purple Fest Vadodara 2027 Secretariat at <strong>Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat</strong> · Email: <strong>purplefestivalvadodara@gmail.com</strong> · Phone: <strong>Radha Tandon: +91 99743 83920 | Satish Kapoor: +91 98994 72065, +91 92117 60202</strong> · Website: <strong>www.purplefestivalvadodara.com</strong>.</p>
`;

export const PRIVACY_HTML = `
<p><strong>Effective Date:</strong> January 2026 &nbsp;|&nbsp; <strong>Festival Dates:</strong> 21–23 January 2027 (Vadodara, Gujarat)<br/><strong>Data Fiduciary:</strong> Purple Fest Vadodara 2027 Secretariat — <strong>Praangan Education Trust (Vadodara, Gujarat)</strong>, <strong>Brotherhood (Delhi)</strong> &amp; <strong>Centre for Disabilities Studies and Action, School of Social Work, Tata Institute of Social Sciences (TISS, Mumbai)</strong>.</p>
<p>Purple Fest Vadodara 2027 is committed to protecting the privacy, autonomy, and dignity of every delegate, speaker, Paralympic athlete, artist, exhibitor, student, and volunteer in full compliance with India’s <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and Section 3 (Equality and Non-Discrimination) of the <strong>Rights of Persons with Disabilities (RPwD) Act, 2016</strong>.</p>

<h2>1. Scope of This Privacy Notice</h2>
<p>This Privacy Notice applies to all personal and accessibility accommodation data collected through the Purple Fest Vadodara 2027 digital portal (<a href="https://www.purplefestivalvadodara.com" target="_blank" rel="noopener">www.purplefestivalvadodara.com</a>), the Delegate Pass (₹2,200) registration workflow, the Tier A–D Exhibition Stall booking desk, the GIEN &amp; TISS Academic Abstract portal, and on-ground registration counters at <strong>The Maharaja Sayajirao University, Vadodara</strong> and <strong>GMERS Medical College, Gotri, Vadodara</strong>.</p>

<h2>2. Categories of Personal Data We Collect</h2>
<ul>
  <li><strong>Identity &amp; Credential Data:</strong> Full name, organization/institution/DPO affiliation, designation, city/state, email address, and mobile number.</li>
  <li><strong>Registration &amp; Financial Data:</strong> Selected pass category (Mandatory ₹2,200 Delegate Pass) or Exhibition Stall Tier (Tier A ₹15,000 / Tier B ₹35,000 / Tier C ₹12,000 / Tier D ₹5,500), invoice/GST details, and payment transaction reference.</li>
  <li><strong>Voluntary Accessibility &amp; RPwD Accommodation Data:</strong> Only where voluntarily disclosed by you to arrange on-ground support across any of the <strong>21 Benchmark Disabilities (RPwD Act 2016)</strong>—such as Indian Sign Language (ISL) interpretation, Braille/large-print kits, wheelchair/mobility-scooter charging, tactile guidance, quiet sensory sanctuary access, or medical/hemophilia/thalassemia cold-chain storage.</li>
</ul>

<h2>3. Strict Purpose Limitation for Disability &amp; Accommodation Data</h2>
<p>Your voluntary accessibility disclosures are used <strong>exclusively</strong> by the Purple Fest Accessibility &amp; Inclusion Logistics Desk to provision reasonable accommodations during 21–23 January 2027. We <strong>never</strong> sell, rent, monetize, or share individual disability or health-accommodation records with commercial sponsors, advertisers, or unauthorized third parties.</p>

<h2>4. Browser LocalStorage &amp; Accessibility Preferences</h2>
<p>Our website stores your accessibility preferences (such as reduced-motion settings, high-contrast mode, Deal Sizer / Stall Calculator scenarios, and saved festival itinerary) locally in your browser’s <code>localStorage</code> so your experience remains barrier-free across sessions without tracking you across external websites.</p>

<h2>5. Legal Basis Under the DPDP Act 2023</h2>
<p>We process your personal data based on your explicit, affirmative consent provided at the time of form submission and for the legitimate fulfillment of your Delegate Pass (₹2,200) or Exhibition Stall registration.</p>

<h2>6. Data Sharing with Coalition Partners</h2>
<p>Where you submit an academic paper for the <strong>GIEN &amp; TISS Inclusive Education Conclave</strong> or register for a <strong>Para-Sports Championship</strong>, relevant submission details are shared strictly with the respective review committee (Global Inclusive Education Network, Tata Institute of Social Sciences, or the Para-Sports Technical Directorate) for scheduling and certification.</p>

<h2>7. Data Security &amp; Encryption</h2>
<p>All registration records and accommodation requests are stored in encrypted access-controlled databases restricted to authorized Secretariat personnel who have signed the Purple Fest Confidentiality &amp; Dignity Pledge.</p>

<h2>8. Data Retention &amp; Post-Festival Archiving</h2>
<p>Specific on-ground accommodation requests (such as dietary, sensory, or medical support notes) are permanently purged within <strong>60 days</strong> after the conclusion of Purple Fest Vadodara 2027 (by 24 March 2027), while participation certificates and statutory accounting records for ₹2,200 Delegate Passes and Tier A–D Stalls are retained as required by Indian tax and audit laws.</p>

<h2>9. Your Rights as a Data Principal</h2>
<p>Under the DPDP Act 2023, you have the right to access a summary of your personal data, correct or update your badge/accommodation details, withdraw consent, or request erasure by writing to our Data Protection &amp; Accessibility Officer.</p>

<h2>10. Children &amp; Student Delegations</h2>
<p>Registrations for school students and minors with disabilities participating in Purple Kaleidoscope, Inclusive Youth Parliament, or adaptive sports must be submitted with verifiable parent/guardian or authorized school-head consent.</p>

<h2>11. Accessibility of Privacy Communications</h2>
<p>Upon request, this Privacy Notice and all consent forms are available in <strong>Accessible PDF (Screen-Reader Tagged), Grade-1 English/Gujarati Braille, Large Print (18pt+), and Indian Sign Language (ISL) video summary</strong>.</p>

<h2>12. Contact the Data Protection &amp; Accessibility Desk</h2>
<p><strong>Purple Fest Vadodara 2027 Secretariat</strong><br/><strong>Address:</strong> Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat<br/><strong>Organisers:</strong> Praangan (Vadodara, Gujarat) · Brotherhood (Delhi) · Centre for Disabilities Studies and Action, School of Social Work, Tata Institute of Social Sciences (Mumbai)<br/><strong>Knowledge Partner:</strong> State Commission for Persons with Disabilities, Goa &nbsp;|&nbsp; <strong>Venue Partners:</strong> The Maharaja Sayajirao University, Vadodara &amp; GMERS Medical College, Gotri, Vadodara<br/><strong>Email:</strong> <a href="mailto:purplefestivalvadodara@gmail.com">purplefestivalvadodara@gmail.com</a> &nbsp;|&nbsp; <strong>Website:</strong> <a href="https://www.purplefestivalvadodara.com" target="_blank" rel="noopener">www.purplefestivalvadodara.com</a><br/><strong>Contact Persons &amp; Helpline:</strong> Radha Tandon (<a href="tel:+919974383920">+91 99743 83920</a>) &nbsp;|&nbsp; Satish Kapoor (<a href="tel:+919899472065">+91 98994 72065</a>, <a href="tel:+919211760202">+91 92117 60202</a>)</p>
`;
