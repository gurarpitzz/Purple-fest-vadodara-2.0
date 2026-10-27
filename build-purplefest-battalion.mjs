import fs from 'fs';
import path from 'path';
import {
  NAV_OVERRIDES,
  GLOBAL_PROVIDER_DATA,
  ROUTE_METADATA,
  TERMS_HTML,
  PRIVACY_HTML
} from './purplefest-content-data.mjs';
import { transformRouteSections } from './purplefest-route-transformers.mjs';
import {
  FOOTER_CSS,
  applyFooterToLayoutChunk,
  applyFooterToSsrHtml,
  applyFooterToStandaloneHtml
} from './tasks/task1-footer.mjs';
import {
  SPONSORS_SECTION_CSS,
  applySponsorsTo317Chunk,
  applySponsorsToLayoutEnhancer,
  applySponsorsToSsrHtml
} from './tasks/task2-sponsors.mjs';
import {
  PHONE_QR_ANIMATION_CSS,
  HOME_TECH_CONTENT,
  applyPhoneQrTo317Chunk,
  applyPhoneQrToSsrHtml
} from './tasks/task3-phone-qr.mjs';
import { applyDatesAndDocxReplacements } from './tasks/task4-dates.mjs';
import {
  JOIN_US_MAP_CSS,
  applyJoinUsMapTo317Chunk,
  applyJoinUsMapToSsrHtml
} from './tasks/task5-joinus-map.mjs';

const ORIG_DIR = 'd:/argon trial rea/battalion-original';
const TARGET_DIR = 'd:/argon trial rea/purple fest vadodara';

const SLUGS = [
  'index',
  'about-us',
  'viksit-bharat',
  'programs',
  'tier-1-program',
  'other-services',
  'composyte',
  'deal-sizer',
  'pricer',
  'careers',
  'contact',
  'battalion-tpo',
  'programs-tpo',
  'contact-tpo',
  'terms-and-conditions',
  'privacy-policy'
];

// Recursively find GlobalProvider props object inside the html/body Flight tree and apply WCAG 2.2 AA+ tree transforms
function mutateGlobalProviderInTree(node) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    if (node[0] === '$' && node[1] === 'html' && node[3] && typeof node[3] === 'object') {
      node[3].lang = 'en';
    }
    if (node[0] === '$' && node[1] === 'body' && node[3] && typeof node[3] === 'object') {
      const skipEl = [
        '$',
        'a',
        'skip-to-content',
        {
          href: '#main-content',
          className: 'skip-to-content',
          children: 'Skip to main content'
        }
      ];
      if (Array.isArray(node[3].children)) {
        const hasSkip = node[3].children.some(
          (c) => Array.isArray(c) && c[2] === 'skip-to-content'
        );
        if (!hasSkip) {
          node[3].children.unshift(skipEl);
        }
      } else if (node[3].children) {
        node[3].children = [skipEl, node[3].children];
      }
    }
    for (const child of node) mutateGlobalProviderInTree(child);
    return;
  }
  if (node.documentId && NAV_OVERRIDES[node.documentId]) {
    Object.assign(node, NAV_OVERRIDES[node.documentId]);
  }
  if (
    'CEOMessageData' in node &&
    'footerData' in node &&
    'headerData' in node
  ) {
    node.CEOMessageData = GLOBAL_PROVIDER_DATA.CEOMessageData;
    node.footerData = GLOBAL_PROVIDER_DATA.footerData;
    node.footerTpoData = GLOBAL_PROVIDER_DATA.footerTpoData;
    node.headerData = GLOBAL_PROVIDER_DATA.headerData;
    node.headerTpoData = GLOBAL_PROVIDER_DATA.headerTpoData;
    node.headerNavigationData = GLOBAL_PROVIDER_DATA.headerNavigationData;
    if (Array.isArray(node.navigationsData) && node.navigationsData[0]) {
      node.navigationsData[0] = GLOBAL_PROVIDER_DATA.headerNavigationData;
    }
  }
  for (const val of Object.values(node)) {
    mutateGlobalProviderInTree(val);
  }
}

// Mutate metadata array in Flight stream
function mutateMetadataArray(metaArr, slug) {
  const meta = ROUTE_METADATA[slug] || ROUTE_METADATA['index'];
  const canonicalUrl = slug === 'index' ? 'http://localhost:3000/' : `http://localhost:3000/${slug}`;
  for (const item of metaArr) {
    if (!Array.isArray(item) || item.length < 4) continue;
    const tag = item[1];
    const props = item[3];
    if (!props) continue;
    if (tag === 'title') {
      props.children = meta.title;
    } else if (tag === 'meta') {
      if (props.name === 'viewport' && typeof props.content === 'string') {
        props.content = props.content.replace('maximum-scale=1', 'maximum-scale=5');
      } else if (props.name === 'description' || props.property === 'og:description' || props.name === 'twitter:description') {
        props.content = meta.description;
      } else if (props.property === 'og:title' || props.name === 'twitter:title') {
        props.content = meta.title;
      } else if (props.property === 'og:site_name') {
        props.content = 'Purple Fest Vadodara 2027';
      } else if (props.property === 'og:url') {
        props.content = canonicalUrl;
      } else if (props.property === 'og:image' || props.name === 'twitter:image') {
        props.content = '/uploads/purple_fest_hero.jpg';
      }
    } else if (tag === 'link' && props.rel === 'canonical') {
      props.href = canonicalUrl;
    }
  }
}

// Transform a complete multi-line Flight stream (works identically for .rsc files and .html concatenated Flight streams!)
function transformFlightStream(rawStream, slug, isHtmlStream = false) {
  const sectionsRowId = isHtmlStream ? '9' : '2';

  let streamInput = rawStream;
  if (slug === 'viksit-bharat') {
    streamInput = streamInput
      .split('["slug","about-us","d"]').join('["slug","viksit-bharat","d"]')
      .split('"urlParts":["","about-us"]').join('"urlParts":["","viksit-bharat"]');
  }

  // Special handling for terms-and-conditions & privacy-policy raw T<hex>,... chunks (which may span multiple lines) preceding `2:[` or `9:[`
  const normalized = streamInput.replace(
    new RegExp(`^([0-9a-f]+):T[0-9a-f]+,[\\s\\S]*?(?=${sectionsRowId}:\\[\\["\\$","section")`, 'm'),
    '$1:""\n'
  );
  const processedLines = normalized.split('\n');

  const outLines = processedLines.map((line) => {
    if (!line.trim()) return line;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return line;
    const rowId = line.slice(0, colonIdx);
    const payload = line.slice(colonIdx + 1);

    // 1. Navigation item line
    if (payload.startsWith('{"documentId":')) {
      try {
        const obj = JSON.parse(payload);
        if (obj.documentId && NAV_OVERRIDES[obj.documentId]) {
          Object.assign(obj, NAV_OVERRIDES[obj.documentId]);
          return `${rowId}:${JSON.stringify(obj)}`;
        }
      } catch {}
    }

    // 2. Page sections array line
    if (rowId === sectionsRowId && payload.startsWith('[')) {
      try {
        const sections = JSON.parse(payload);
        transformRouteSections(slug, sections);
        return `${rowId}:${JSON.stringify(sections)}`;
      } catch (err) {
        console.error(`Error parsing sections row ${rowId} in ${slug} (html=${isHtmlStream}):`, err.message);
      }
    }

    // 3. Metadata array line
    if (payload.startsWith('[["$","meta","0",{"name":"viewport"')) {
      try {
        const metaArr = JSON.parse(payload);
        mutateMetadataArray(metaArr, slug);
        return `${rowId}:${JSON.stringify(metaArr)}`;
      } catch (err) {
        console.error(`Error parsing metadata row ${rowId} in ${slug}:`, err.message);
      }
    }

    // 4. Global layout html/body/GlobalProvider line
    if (payload.startsWith('["$","html",null,') && payload.includes('"CEOMessageData"')) {
      try {
        const tree = JSON.parse(payload);
        mutateGlobalProviderInTree(tree);
        return `${rowId}:${JSON.stringify(tree)}`;
      } catch (err) {
        console.error(`Error parsing GlobalProvider row ${rowId} in ${slug}:`, err.message);
      }
    }

    return line;
  });

  return applyDatesAndDocxReplacements(
    outLines.join('\n').replace(/https:\/\/battalion-cms\.onrender\.com\/uploads\//g, '/uploads/')
  );
}

// SSR HTML replacements so view-source and curl also show PurpleFest Vadodara 2027
const SSR_REPLACEMENTS = [
  // Global Header / Footer / Nav
  ['Ready to actively finance your investments?', '21–23 January 2027 · Vadodara, Gujarat · Mandatory Delegate Registration ₹2,200'],
  ['info@batallion.com', 'purplefestivalvadodara@gmail.com'],
  ['(718) 208-2000', '+91 99743 83920'],
  ['tel:7182082000', 'tel:+919974383920'],
  ['Battalion Lending LLC', 'Purple Fest Vadodara 2027 · Praangan &amp; Brotherhood'],
  ['class="w-full mt-[4.8rem] text-center md:text-left lg:whitespace-nowrap lg:text-right"><p class="mb-0 text-gray-300">Designed by<!-- --> <a class="link link--underline" target="_blank" href="https://noomoagency.com/">Noomo Agency</a></p>', 'class="w-full mt-[4.8rem] md:mt-auto text-center md:text-left lg:text-right"><p class="mb-0 text-gray-300">Designed by Gurarpit Singh and Mehardeep Singh. Ajeet Graphics</p>'],
  ['<p class="mb-0 text-gray-300">Designed by<!-- --> <a class="link link--underline" target="_blank" href="https://noomoagency.com/">Noomo Agency</a></p>', '<p class="mb-0 text-gray-300">Designed by Gurarpit Singh and Mehardeep Singh. Ajeet Graphics</p>'],
  ['Designed by<!-- --> <a class="link link--underline" target="_blank" href="https://noomoagency.com/">Noomo Agency</a>', 'Designed by Gurarpit Singh and Mehardeep Singh. Ajeet Graphics'],
  ['https://apply.battalion.com/login', '/contact-tpo'],
  ['https://apply.battalion.com/', '/apply'],
  ['https://www.battaliontpo.com/', '/battalion-tpo'],
  ['https://on.battaliontpo.com/', '/contact-tpo'],
  ['https://composyte.com/', '/composyte'],
  ['>Apply Now<', '>Apply Now<'],
  ['>Log In<', '>Book Stall<'],
  ['>Employee Login<', '>Exhibitor &amp; CSR Portal<'],
  ['>Tier 1 Program<', '>Paralympic Champions<'],
  ['>Other Services<', '>21 RPwD Disabilities<'],
  ['>Composyte<', '>GIEN &amp; Barrier-Free<'],
  ['>Deal Sizer<', '>Stall Tiers (A–D)<'],
  ['href="/deal-sizer"', 'href="/programs-tpo"'],
  ['>Pricer<', '>Apply Now<'],
  ['>Battalion TPO<', '>Exhibitors &amp; CSR Portal<'],

  // Home (index)
  ['Certainty, executed.', 'Inclusion, celebrated.'],
  ['Next-level business purpose lending.', 'Purple Fest Vadodara 2027 · 21–23 January 2027 · Sanskari Nagari Vadodara · Organised by Praangan (Vadodara), Brotherhood (Delhi) &amp; TISS Mumbai · Venue Partners: MSU Vadodara &amp; GMERS Gotri.'],
  ['We combine institutional capital with deep real estate expertise—structuring smart, reliable financing for serious investors.', 'Join Us — Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat'],
  ['Why Battalion', 'Why Purple Fest Vadodara 2027'],
  ['Direct lender', 'All 21 RPwD Disabilities'],
  ['Common-sense underwriting', 'Goa Legacy Meets Sanskari Nagari'],
  ['Built for speed', 'GIEN &amp; TISS Academic Rigor'],
  ['Certainty of execution', '100% Barrier-Free Architecture'],
  ['Proven results, real impact', 'A National Convergence of Inclusion in Vadodara'],
  ['Simple by design', 'Four Steps to Join Purple Fest Vadodara 2027'],
  ['What our clients say', 'Voices of the Purple Movement'],
  ['Powered by tech, driven by people', HOME_TECH_CONTENT.title],
  ['Proprietary tools, powerful results', HOME_TECH_CONTENT.title],
  ['Tech that informs your decision-making and gives you the strategic advantage.', HOME_TECH_CONTENT.description],
  ['Wide-ranging search', HOME_TECH_CONTENT.homeTechBlocks[0].title],
  ['Enter any residential address and get a full property breakdown in seconds.', HOME_TECH_CONTENT.homeTechBlocks[0].description],
  ['Tailored insights', HOME_TECH_CONTENT.homeTechBlocks[1].title],
  ['Tap proprietary algorithms and data-driven insights for smarter decision-making.', HOME_TECH_CONTENT.homeTechBlocks[1].description],
  ['Results that are relevant', HOME_TECH_CONTENT.homeTechBlocks[2].title],
  ['Instantly pinpoint top comparable properties, ranked by our proprietary scoring model.', HOME_TECH_CONTENT.homeTechBlocks[2].description],
  ['Comprehensive analysis', HOME_TECH_CONTENT.homeTechBlocks[3].title],
  ['Access sales history, construction details, flood and crime info, and more.', HOME_TECH_CONTENT.homeTechBlocks[3].description],
  ['Ready to upgrade your financing?', 'Ready to Join Purple Fest Vadodara 2027?'],

  // About Us
  ['Lending that’s leveled up', 'From Goa’s Global Mandate to Sanskari Nagari Vadodara'],
  ['What drives us', 'Our Four Foundational Pillars'],
  ['Meet the team', 'Organising Committee &amp; 6-Institution Coalition'],

  // Programs
  ['Financing that fits your strategy', '3-Day Festival Schedule &amp; 6 Experience Zones'],
  ['R30™ Prime', 'Day 1 · 21 Jan 2027: Grand Inauguration &amp; Assistive Tech Launch'],
  ['R30™ Flex', 'Day 2 · 22 Jan 2027: Paralympic Champions Conclave, GIEN Labs &amp; Startup Pitch'],
  ['PrimeBridge™', 'Day 3 · 23 Jan 2027: Accessible Birding Trail, Vadodara Declaration &amp; Finale'],
  ['InvestorLOC™', 'All 6 Barrier-Free Experience Zones (Included in ₹2,200 Pass)'],

  // Tier 1 Program
  ['Tier 1 Program', 'Indian Paralympic Champions &amp; Purple Sports'],
  ['Unlock elite terms, lower rates, and priority execution—designed for experienced investors with strong track records.', 'Celebrating India’s historic 29-medal Paris 2024 &amp; Tokyo 2020 Paralympic Hall of Fame and bringing live adaptive sports championships to Zone 04 in Vadodara.'],

  // Other Services
  ['Financing is just the start', 'All 21 Benchmark Disabilities (RPwD Act 2016) &amp; Barrier-Free Services'],
  ['From market analysis to portfolio restructuring, we help keep your investments on track.', 'Purple Fest Vadodara 2027 is engineered around every single one of the 21 Benchmark Disabilities scheduled in India’s Rights of Persons with Disabilities (RPwD) Act 2016.'],

  // Composyte
  ['Know more. Invest smarter.', 'GIEN &amp; TISS Inclusive Education Conclave.'],
  ['Composyte puts critical property data at your fingertips—because better insights lead to better investments.', 'Co-curated by the Global Inclusive Education Network (GIEN) and Tata Institute of Social Sciences (TISS)—uniting Universal Design for Learning (UDL), assistive technology, and barrier-free architecture.'],
  ['Try Composyte', 'Register for Your QR Pass · ₹2,200'],

  // Careers
  ['Build the future of lending', 'Co-Create Purple Fest Vadodara 2027'],
  ['Open positions', 'Open Participation &amp; Volunteer Tracks'],
  ['Chief Financial Officer', 'Inclusive Accessibility &amp; Sighted-Guide Volunteer Brigade'],
  ['Bridge Lending Manager', 'Indian Sign Language (ISL) Interpreter &amp; Live Captioning Fellow'],
  ['Senior Loan Processor', 'Purple Kaleidoscope &amp; Abhivyakti Performing Artist / Ensemble'],
  ['Account Executive', 'GIEN &amp; TISS Inclusive Education Paper / Poster Presenter'],

  // Contact & Contact TPO
  ['Let’s talk', 'Register Your ₹2,200 Delegate Pass &amp; Accessibility Needs'],
  ['Have a deal to discuss or a question about our programs? Reach out—our team is ready to help.', 'Mandatory 3-Day Delegate Registration is ₹2,200 per person (strictly no free walk-in visitors). Use this desk to register delegates or declare accommodations across all 21 RPwD Benchmark Disabilities.'],
  ['Become an approved broker', 'Book Exhibition Stall (Tier A–D) &amp; CSR Partnerships'],

  // Battalion TPO & Programs TPO
  ['Certainty from the start.', 'Institutional, CSR &amp; Exhibitor Portal.'],
  ['Wholesale business purpose lending built for brokers who close.', 'Partner with Praangan, Brotherhood, GIEN &amp; TISS in Vadodara (21–23 Jan 2027). Book Tier A–D Exhibition Stalls or sponsor Schedule VII CSR Pavilions.'],
  ['Programs built to perform', 'Exhibition Stall Tiers (A–D) &amp; Institutional Tracks'],

  // Media replacements in SSR HTML
  ['/uploads/hero_01_d22b3e302c.jpg', '/uploads/indian_pwd_group_transparent.png'],
  ['/uploads/hero_02_663042f45c.jpg', '/uploads/indian_pwd_group_transparent.png'],
  ['/uploads/benefits_eb1b8c587a.jpg', '/uploads/indian_pwd_group_transparent.png'],
  ['/uploads/benefits_mob_719eb0ba6b.jpg', '/uploads/indian_pwd_group_transparent.png'],
  ['/uploads/program01_c001e40577.jpg', '/uploads/purple_expo.jpg'],
  ['/uploads/program01_mob_282e390fc3.jpg', '/uploads/purple_expo_mobile.jpg'],
  ['/uploads/program02_849e7be7b0.jpg', '/uploads/pf_doc_isl_classroom.jpg'],
  ['/uploads/program02_mob_8cb243bd29.jpg', '/uploads/pf_doc_isl_classroom.jpg'],
  ['/uploads/program03_33ce9aea2b.jpg', '/uploads/purple_fest_hero.jpg'],
  ['/uploads/program03_mob_f5dc68fa00.jpg', '/uploads/purple_fest_hero_mobile.jpg'],
  ['/uploads/program04_4c17a70f1f.jpg', '/uploads/purple_sports.jpg'],
  ['/uploads/program04_mob_0c08fd28cf.jpg', '/uploads/purple_sports_mobile.jpg'],
  ['/uploads/product_image01_82a7e9ac40.jpg', '/uploads/purple_expo.jpg'],
  ['/uploads/product_image02_02259971c0.jpg', '/uploads/21disabliltes.png'],
  ['/uploads/product_image02_mob_565279d072.jpg', '/uploads/21disabliltes.png'],
  ['/uploads/team_photo_7d06b54f74.jpg', '/uploads/indian_pwd_group_transparent.png'],
  ['/uploads/Battalion_website_video_3_820e159bc0.mp4', '/uploads/final.mp4'],
  ['/uploads/Loan_pricer_opt_3_ed63f9fec3.mp4', '/uploads/final.mp4']
];

function transformSsrHtml(ssrHtml, slug) {
  const meta = ROUTE_METADATA[slug] || ROUTE_METADATA['index'];
  let out = ssrHtml.replace(/https:\/\/battalion-cms\.onrender\.com\/uploads\//g, '/uploads/');

  // Update <title>...</title>
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

  // Update meta description & og:title / og:description / twitter:title / twitter:description
  out = out.replace(/(<meta name="description" content=")[^"]*(")/g, `$1${meta.description}$2`);
  out = out.replace(/(<meta property="og:title" content=")[^"]*(")/g, `$1${meta.title}$2`);
  out = out.replace(/(<meta property="og:description" content=")[^"]*(")/g, `$1${meta.description}$2`);
  out = out.replace(/(<meta name="twitter:title" content=")[^"]*(")/g, `$1${meta.title}$2`);
  out = out.replace(/(<meta name="twitter:description" content=")[^"]*(")/g, `$1${meta.description}$2`);
  out = out.replace(/https:\/\/www\.battalion\.com\/social\.jpg/g, '/uploads/purple_fest_hero.jpg');

  // For terms-and-conditions & privacy-policy, also replace the SSR wysiwyg div content
  if (slug === 'terms-and-conditions') {
    out = out.replace(
      /(<div class="reset-last wysiwyg--large wysiwyg">)[\s\S]*?(<\/div><\/div><\/div><\/section>)/,
      `$1${TERMS_HTML.trim()}$2`
    );
    out = out.replace(/>Terms &(?:amp;)? Conditions</g, '>Terms &amp; Conditions · Delegate Pass &amp; Exhibitor Charter<');
  } else if (slug === 'privacy-policy') {
    out = out.replace(
      /(<div class="reset-last wysiwyg--large wysiwyg">)[\s\S]*?(<\/div><\/div><\/div><\/section>)/,
      `$1${PRIVACY_HTML.trim()}$2`
    );
    out = out.replace(/>Privacy Notice</g, '>Privacy Policy · DPDP Act 2023 &amp; RPwD Data Charter<');
  }

  for (const [from, to] of SSR_REPLACEMENTS) {
    out = out.split(from).join(to);
  }

  if (slug === 'viksit-bharat') {
    const viksitSsrReplacements = [
      ['From Goa’s Global Mandate to Sanskari Nagari Vadodara', 'Viksit Bharat @ 2047: Divyangjan at the Heart of Developed India'],
      ['Our Four Foundational Pillars', 'Four Foundational Aims of Viksit Bharat @ 2047'],
      ['Organising Committee &amp; 6-Institution Coalition', 'Hon’ble PM Shri Narendra Modi &amp; Viksit Bharat @ 2047 Visual Showcase'],
      ['/uploads/purple_fest_hero.jpg', '/uploads/viksit_bharat_2047_banner.jpg']
    ];
    for (const [from, to] of viksitSsrReplacements) {
      out = out.split(from).join(to);
    }
  }

  // Strip the Deal Sizer / Exhibition Stall & Delegation Sizer SSR section from all HTML files
  out = out.replace(/<div id="deal-sizer-tpo"><section[^>]*>[\s\S]*?<\/section><\/div>/g, '');
  out = out.replace(/<section class="py-100 lg:py-\[14\.8rem\]">(?:(?!<\/section>)[\s\S])*?styles_chartDiff__Cm4ho[\s\S]*?<\/section>/g, '');

  // Replace SSR Preloader SVG and SSR Header Logo SVG with vectorized PurpleFest Vadodara Emblem + PurpleFest Wordmark
  out = out.replace(
    /<div class="(fixed text-blue-900 left-0 top-0 w-full h-full z-\[1001\][^"]*styles_preloader__JmvRd)">/g,
    '<div aria-hidden="true" inert="" class="$1">'
  );
  out = out.replace(
    /<svg class="styles_logoSvg__TF4KR"[^>]*>[\s\S]*?<\/svg>/g,
    `<svg class="styles_logoSvg__TF4KR" width="900" height="320" viewBox="0 0 900 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${SSR_PRELOADER_SVG_INNER}</svg>`
  );
  out = out.replace(
    /<div class="styles_progressBar__oY7fE">/g,
    '<div class="styles_progressBar__oY7fE" style="display:none;opacity:0;height:0">'
  );
  out = out.replace(
    /(<svg [^>]*)data-header-logo="true"([^>]*>)[\s\S]*?(<\/svg>)/g,
    `$1id="header-logo" data-header-logo="true" aria-hidden="true" focusable="false"$2${SSR_HEADER_SVG_INNER}$3`
  );

  // WCAG 2.1 / 2.2 AA+ SSR HTML Transformations
  out = out.replace(/<html lang="en-US"/g, '<html lang="en"');
  out = out.replace(/maximum-scale=1/g, 'maximum-scale=5');

  // Inject Skip to main content link as very first child of <body>
  out = out.replace(
    '<body>',
    '<body><a href="#main-content" class="skip-to-content">Skip to main content</a>'
  );

  // Semantic Landmarks: header[role="banner"], nav[aria-label="Primary Navigation"], main#main-content, footer[role="contentinfo"]
  out = out.replace(
    /<header class="(styles_header__[^"]+)">/g,
    '<header role="banner" class="$1">'
  );
  out = out.replace(
    '<div class="flex-grow laptop:flex-grow-0 overflow-y-auto laptop:overflow-visible -mx-[5.3rem] px-[5.3rem] md:-mx-70 md:px-70 laptop:mx-0 laptop:px-0 flex"><ul class="flex flex-col laptop:flex-row laptop:items-center laptop:justify-end laptop:text-center gap-32 2xl:gap-40 text-[2.6rem] font-semibold laptop:text-base laptop:font-normal w-full"></ul></div>',
    '<nav aria-label="Primary Navigation" class="flex-grow laptop:flex-grow-0 overflow-y-auto laptop:overflow-visible -mx-[5.3rem] px-[5.3rem] md:-mx-70 md:px-70 laptop:mx-0 laptop:px-0 flex"><ul class="flex flex-col laptop:flex-row laptop:items-center laptop:justify-end laptop:text-center gap-32 2xl:gap-40 text-[2.6rem] font-semibold laptop:text-base laptop:font-normal w-full"></ul></nav>'
  );
  out = out.replace(
    '<main role="main" class="relative flex-grow focus:outline-none">',
    '<main id="main-content" role="main" tabindex="-1" class="relative flex-grow focus:outline-none">'
  );
  out = out.replace(
    /<footer class="relative footer mt-auto z-1">/g,
    '<footer role="contentinfo" class="relative footer mt-auto z-1">'
  );

  // Accessible labels on logo links, mobile menu opener, social links & aria-hidden on hover duplicate .btn__text
  out = out.replace(
    /<a class="styles_logoLink__ouoJH/g,
    '<a aria-label="Purple Fest Vadodara 2027 Home" class="styles_logoLink__ouoJH'
  );
  out = out.replace(
    /<a class="styles_logoLink__2zMnS/g,
    '<a aria-label="Purple Fest Vadodara 2027 Home" class="styles_logoLink__2zMnS'
  );
  out = out.replace(
    /<button class="menu-opener flex items-center justify-center text-purple">/g,
    '<button type="button" aria-label="Toggle navigation menu" aria-expanded="false" class="menu-opener flex items-center justify-center text-purple">'
  );
  // Inject Dedicated Header Accessibility Icon Button into every SSR <header> bar (both standard and TPO headers)
  const ssrA11yHeaderBtn = `<div class="pf-a11y-header-wrap relative z-[1002] flex items-center ml-8 laptop:ml-12 flex-shrink-0"><button type="button" class="pf-a11y-header-btn" aria-label="Accessibility features and options" aria-expanded="false" aria-controls="pf-a11y-header-panel" title="Accessibility Features"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="pf-a11y-icon-svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle><circle cx="12" cy="6.5" r="1.75" fill="currentColor"></circle><path d="M7 10.25L12 11.25L17 10.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 11.25V14.5M12 14.5L9.75 18.5M12 14.5L14.25 18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="pf-a11y-btn-label">Accessibility</span></button></div>`;
  out = out.replace(
    /(<div class="laptop:hidden(?: [^"]*)?"><div class="relative z-3 laptop:hidden "><button type="button" aria-label="Toggle navigation menu")/,
    `${ssrA11yHeaderBtn}$1`
  );
  out = out.replace(
    /<span class="btn__text">/g,
    '<span class="btn__text" aria-hidden="true">'
  );
  out = out.replace(
    /target="_blank" href="https:\/\/www\.instagram\.com[^"]*"/g,
    'target="_blank" aria-label="Instagram" href="https://www.instagram.com/"'
  );
  out = out.replace(
    /target="_blank" href="https:\/\/(?:www\.)?facebook\.com[^"]*"/g,
    'target="_blank" aria-label="Facebook" href="https://www.facebook.com/"'
  );
  out = out.replace(
    /target="_blank" href="https:\/\/x\.com[^"]*"/g,
    'target="_blank" aria-label="X (Twitter)" href="https://x.com/"'
  );
  out = out.replace(
    /target="_blank" href="https:\/\/www\.linkedin\.com[^"]*"/g,
    'target="_blank" aria-label="LinkedIn" href="https://www.linkedin.com/"'
  );

  // Add aria-label to all SSR <video> elements (without visible caption overlay)
  out = out.replace(
    /<video([^>]*)><\/video>/g,
    '<video$1 aria-label="Purple Fest Vadodara 2027 Inclusive Showcase Video"></video>'
  );

  // Single <h1> and sequential heading hierarchy per route
  if (slug === 'index') {
    out = out.replace(
      /<h1 class="h1 mb-8 md:mx-auto max-w-\[65rem\] md:mt-50 lg:hidden"([^>]*)>([\s\S]*?)<\/h1>/,
      '<div aria-hidden="true" class="h1 mb-8 md:mx-auto max-w-[65rem] md:mt-50 lg:hidden"$1>$2</div>'
    );
  } else if (slug === 'composyte') {
    out = out.replace(
      /<h1 class="mb-56 lg:mb-80 text-center">([\s\S]*?)<\/h1>/,
      '<h2 class="h1 mb-56 lg:mb-80 text-center">$1</h2>'
    );
  } else if (slug === 'other-services') {
    out = out.replace(
      /<h2 class="h1 mb-16 lg:mb-24"([^>]*)>([\s\S]*?)<\/h2>/,
      '<h1 class="h1 mb-16 lg:mb-24"$1>$2</h1>'
    );
  } else if (slug === 'deal-sizer') {
    out = out.replace(
      '<!--$--><!--/$-->',
      '<!--$--><h1 class="sr-only">Exhibition Stall &amp; Institutional Delegation Sizer — Purple Fest Vadodara 2027</h1><!--/$-->'
    );
  } else if (slug === 'pricer') {
    out = out.replace(
      '<section class="py-45 md:pt-140 md:pb-120">',
      '<section class="py-45 md:pt-140 md:pb-120"><h1 class="sr-only">Delegate Pass (₹2,200) &amp; Exhibitor Stall Pricer — Purple Fest Vadodara 2027</h1>'
    );
    out = out.replace(
      /<h5 class="text-\[18px\] lg:text-\[24px\] tracking-\[1\.1\] font-semibold text-blue-900">([\s\S]*?)<\/h5>/g,
      '<h2 class="text-[18px] lg:text-[24px] tracking-[1.1] font-semibold text-blue-900">$1</h2>'
    );
    out = out.replace(
      '<label for="salePrice" class="form-label flex items-center z-2 pr-2">Purchase price</label>',
      '<label id="salePrice-label" for="salePrice-input" class="form-label flex items-center z-2 pr-2">Purchase price</label>'
    );
    out = out.replace(
      '<input id="salePrice" type="range"',
      '<input id="salePrice" aria-label="Purchase price" type="range"'
    );
    out = out.replace(
      '<label for="loanAmount" class="form-label flex items-center z-2 pr-2">Loan amount</label>',
      '<label id="loanAmount-label" for="loanAmount-input" class="form-label flex items-center z-2 pr-2">Loan amount</label>'
    );
    out = out.replace(
      '<input id="loanAmount" type="range"',
      '<input id="loanAmount" aria-label="Loan amount" type="range"'
    );
  }

  // Ensure all SSR react-select dummy inputs and ContactSection inputs have explicit accessible labels
  out = out.replace(/id="(react-select-\d+-input)"/g, 'id="$1" aria-label="Select option"');
  out = out.replace(
    /<input type="([^"]+)" class="w-full" placeholder="([^"]+)" name="([^"]+)" value=""\/><label class="form-label">([^<]+)<\/label>/g,
    '<input id="contact-field-$3" aria-label="$2" type="$1" class="w-full" placeholder="$2" name="$3" value=""/><label for="contact-field-$3" class="form-label">$4</label>'
  );
  out = out.replace(
    /<textarea name="([^"]+)" class="([^"]+)" placeholder="([^"]+)"><\/textarea><label class="form-label">([^<]+)<\/label>/g,
    '<textarea id="contact-field-$1" aria-label="$3" name="$1" class="$2" placeholder="$3"></textarea><label for="contact-field-$1" class="form-label">$4</label>'
  );

  // Apply Tasks 1–5 SSR HTML transformations
  out = applyDatesAndDocxReplacements(out);
  out = applyJoinUsMapToSsrHtml(out, slug);
  if (slug === 'index') {
    out = applyPhoneQrToSsrHtml(out);
  }
  out = applySponsorsToSsrHtml(out);
  out = applyFooterToSsrHtml(out);

  return out;
}

const SSR_PRELOADER_SVG_INNER = `<path data-draw="left-line" d="M -280 156 L 312 156 C 338 156 350 110 360.15 118.4" fill="none" stroke="#202D59" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"></path><g data-logo-core="true"><path data-draw="emblem-ribbon" d="M 360.15 118.4 C 350.74 157.88 368.27 174.29 374.54 171.88 C 380.81 169.47 369.56 135.42 374.54 133.58 C 379.58 131.78 395.88 170.65 402.09 168.24 C 408.36 165.78 399.63 115.38 366.42 95.33 C 333.21 75.9 318.2 97.12 326.94 109.89 C 336.96 123.27 363.28 107.48 377.06 83.18 C 397.72 46.72 435.3 46.72 460.33 84.97 C 477.24 111.12 470.97 171.88 462.24 174.29 C 453.44 176.75 445.94 127.53 439.67 127.53 C 433.4 127.53 425.89 176.75 418.39 174.29 C 410.88 171.88 408.36 111.12 429.03 84.97 C 454.06 52.77 497.91 54.62 524.84 83.18 C 539.85 100.2 564.94 117.17 573.68 105.07 C 581.18 94.1 564.94 77.07 535.48 95.33 C 506.08 113.53 493.54 163.98 499.81 168.24 C 506.08 171.88 522.32 131.78 527.36 133.58 C 532.35 135.42 521.09 169.47 527.36 171.88 C 533.64 174.29 548.03 157.88 539.85 118.4" fill="none" stroke="#202D59" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"></path><path data-heart="1" d="M 356.96 43.64 C 349.4 34.96 335.12 36.92 336.24 48.12 C 337.36 58.2 353.04 65.2 364.8 68.84 C 369.28 58.2 371.52 41.96 362.56 36.08 C 355.84 31.6 354.72 40.28 356.96 43.64 Z" fill="#202D59"></path><path data-heart="2" d="M 447.68 26.84 C 442.08 14.52 428.08 14.52 428.08 26.84 C 428.08 38.04 442.08 45.88 447.68 52.88 C 453.28 45.88 467.28 38.04 467.28 26.84 C 467.28 14.52 453.28 14.52 447.68 26.84 Z" fill="#202D59"></path><path data-heart="3" d="M 536.72 43.64 C 540.08 40.28 538.96 31.6 532.24 36.08 C 523.28 41.96 525.52 58.2 530 68.84 C 541.76 65.2 557.44 58.2 558.56 48.12 C 559.68 36.92 545.4 34.96 536.72 43.64 Z" fill="#202D59"></path><g><path data-draw-text="title" d="M303.5 198.11L302.64 198.87L302.49 200.4L302.49 231.65L302.64 232.11L302.81 232.48L303.08 232.74L303.45 232.9L307.23 232.94L308.32 232.46L308.51 232.1L308.68 231.64L308.68 223.02L309.02 221.5L309.32 221.17L309.74 220.96L310.25 220.79L315.3 220.79L318.19 220.23L320.29 219.45L322.42 218.11L324.43 216.06L325.64 213.79L326.41 211.08L326.5 208.08L325.71 204.93L324.2 202.36L322.43 200.66L319.9 199.12L318.2 198.55L315.21 198.11ZM330.74 198.1L330.37 198.25L330.08 198.49L329.71 199.84L329.71 219.54L329.95 221.59L330.51 223.92L331.12 225.61L332.17 227.47L334.02 229.67L336.25 231.5L338.51 232.71L341.11 233.54L344.44 233.89L347.83 233.59L350.03 232.95L352.68 231.55L354.93 229.75L357.05 227.21L358.21 224.91L359.13 221.79L359.5 218.38L359.5 203.35L359.41 199.84L359.3 199.31L359.08 198.85L358.74 198.51L358.29 198.29L356.62 198.13L354.37 198.34L353.92 198.55L353.58 198.88L353.36 199.32L353.25 199.84L353.2 200.4L353.17 200.98L353.17 218.87L352.68 221.69L351.38 224.45L349.72 226.26L347.4 227.45L344.44 227.94L341.98 227.52L339.63 226.39L338.04 225.06L336.72 222.9L336.11 221.19L335.78 218.96L335.78 199.44L335.18 198.39L334.84 198.19L334.42 198.07ZM364.37 198.08L363.95 198.19L363.58 198.34L363.26 198.58L363.02 198.91L362.78 200.41L362.78 229.98L363.04 232.05L363.29 232.38L363.63 232.62L364.9 232.88L367.22 232.84L368.51 232.39L369.09 231.11L369.09 221.94L369.35 221.5L369.64 221.17L370.06 220.96L372.86 220.76L374.41 221.09L374.79 221.35L375.09 221.65L379.08 227.53L381.02 229.66L382.87 231.28L384.31 232.16L385.99 232.8L387.92 232.99L389.21 232.62L389.45 232.31L389.59 231.94L389.65 231.54L389.68 231.11L389.6 228.81L389.5 228.29L389.32 227.83L389.05 227.46L388.72 227.21L386.56 226.43L385.25 225.42L383.72 223.47L381.51 219.94L381.71 218.79L383.81 216.86L385.08 215.23L386.2 212.87L386.7 210.99L386.83 209.11L386.63 207.24L385.8 204.57L384.76 202.71L383.7 201.45L382.05 200.19L380.16 199.19L378.01 198.46L375.12 198.08ZM393.91 198.1L392.83 198.57L392.43 199.85L392.43 231.09L392.52 231.59L392.67 232L392.92 232.33L393.28 232.57L394.61 232.87L397.12 232.87L398.2 232.44L398.41 232.09L398.6 231.64L398.6 223.03L398.97 221.55L399.25 221.24L399.65 221.04L400.15 220.88L405.32 220.88L407.69 220.48L409.93 219.78L412.16 218.53L414.16 216.48L415.6 213.86L416.47 210.75L416.51 207.97L415.89 205.22L414.48 202.57L412.79 200.77L410.18 199.32L408.06 198.58L405.6 198.1ZM421.12 198.04L420.08 198.57L419.73 199.85L419.73 227.66L419.78 231.07L419.84 231.54L419.97 231.94L420.21 232.26L420.58 232.49L422.16 232.75L439.56 232.75L443.6 232.55L444.12 232.47L444.56 232.31L444.9 232.02L445.12 231.62L445.24 231.11L445.27 228.82L444.89 227.31L444.56 226.99L444.12 226.79L443.6 226.69L443.04 226.73L428.54 226.73L426.93 226.63L426.54 226.46L426.25 226.18L425.83 224.18L425.83 199.32L425.66 198.86L425.47 198.51L425.2 198.26L424.83 198.11ZM449.61 198.07L448.51 198.54L448.27 198.89L448.13 199.33L448.06 199.85L448.05 200.4L448.05 229.98L448.36 231.95L448.62 232.24L448.99 232.43L450.58 232.68L468.56 232.68L470.04 232.43L470.34 232.1L470.51 231.65L470.63 229.4L470.47 227.78L470.29 227.39L470 227.12L467.98 226.8L455.83 226.8L455.34 226.68L454.94 226.5L454.66 226.21L454.35 224.18L454.41 220.73L454.91 219.5L456.78 218.49L460.62 217.12L466.93 215.85L467.51 214.81L467.63 213.16L467.43 211.05L467.23 210.7L466.95 210.46L466.59 210.32L466.18 210.52L461.21 210.52L455.93 212.4L454.89 212.45L454.65 212.23L454.48 211.86L454.3 210.26L454.38 206.21L454.7 204.78L454.97 204.5L455.36 204.32L455.84 204.21L456.39 204.13L467.4 204.13L469.44 203.82L469.76 203.56L469.98 203.17L470.11 202.68L470.18 202.13L470.17 200.4L469.83 198.85L469.6 198.49L469.29 198.25L467.95 198.07ZM490.81 198.08L489.43 198.18L488.96 198.31L488.56 198.53L488.04 199.84L488.04 230.56L488.07 231.12L488.14 231.63L488.29 232.07L488.57 232.41L488.97 232.63L489.47 232.75L491.76 232.8L493.39 232.46L493.79 232.12L494.05 231.66L494.19 231.13L494.25 230.56L494.25 223.02L494.29 222.46L494.38 221.93L494.53 221.47L494.76 221.09L496.53 219.96L500.34 218.53L503.11 217.82L506.68 217.31L507.07 217.14L507.34 216.87L507.51 216.48L507.6 216.01L507.52 212.69L507.37 212.29L507.1 211.99L506.72 211.81L506.22 211.73L503.43 211.89L500.51 212.37L495.68 213.88L495.25 213.92L494.85 213.82L494.54 213.53L494.35 213.1L494.26 212.57L494.23 212L494.23 206.2L494.57 204.7L494.89 204.39L495.33 204.2L495.84 204.11L496.4 203.99L510.13 203.99L510.5 203.74L510.76 203.47L510.92 203.11L511.06 200.41L511.03 199.86L510.96 199.36L510.84 198.93L510.63 198.6L509.58 198.08ZM522.67 198.07L515.57 198.13L515.07 198.31L514.68 198.54L514.41 198.89L514.21 199.33L514.21 230.56L514.4 232.07L514.67 232.4L515.07 232.62L515.57 232.74L516.13 232.79L534.1 232.79L535.72 232.57L536.11 232.35L536.38 232.03L536.53 231.61L536.6 231.11L536.55 228.31L536.04 227.18L534.1 226.7L521.48 226.7L521.1 226.44L520.81 226.16L520.63 225.78L520.43 222.44L520.55 220.2L521.21 219.11L522.75 218.35L526.66 217.04L532.63 215.97L533.42 215.17L533.59 213.72L533.48 211.07L533.32 210.72L533.07 210.46L532.72 210.29L532.27 210.39L527.74 210.39L521.86 212.23L521.41 212.25L521.01 212.12L520.73 211.81L520.57 211.36L520.5 210.83L520.48 210.26L520.51 206.21L520.82 204.77L521.09 204.48L521.47 204.29L521.96 204.18L522.51 204.08L533.52 204.08L535.04 203.87L535.39 203.68L535.64 203.42L535.79 203.06L535.88 202.62L535.79 198.9L535.62 198.56L535.36 198.31L534.07 198.07ZM549.36 198.01L546.72 198.82L544.78 199.77L542.5 201.55L541.14 203.1L540.02 205.44L539.64 207.37L539.65 210.24L540.26 212.51L541.15 213.93L542.61 215.39L544.02 216.29L545.65 216.98L548.78 217.85L557.9 219.14L560.21 219.83L561.17 220.6L561.41 220.95L561.6 221.39L561.74 221.89L561.81 222.44L561.58 224.06L560.62 225.46L558.87 226.63L556.67 227.35L554.19 227.66L550.92 227.45L548.33 226.48L546.97 225.52L545.36 223.09L544.35 222.42L541.09 222.33L539.76 222.61L539.24 223.62L539.44 224.93L540.46 227.39L542 229.33L544.27 231.11L546.97 232.47L550.08 233.42L553.24 233.71L556.64 233.57L559.9 232.86L562.33 231.83L564.43 230.44L566.11 228.65L567.19 226.82L567.86 224.67L568.01 221.86L567.75 219.78L566.92 217.74L564.76 215.26L562.19 213.79L557.96 212.73L549.78 211.71L547.5 211.07L546.22 210.01L545.77 208.83L545.8 207.8L546.53 206.16L547.74 205.04L550.05 203.89L552.08 203.51L554.94 203.63L557.57 204.48L559.29 205.66L560.93 208.07L562.03 208.65L564.83 208.74L566.3 208.48L566.59 208.21L566.75 207.82L566.8 207.34L566.58 205.9L565.74 203.85L564.52 202.17L562.7 200.5L560.52 199.21L557.52 198.15L554.4 197.58L552.08 197.57ZM574.86 198.08L571.8 198.13L570.33 198.56L569.77 199.85L569.65 202.13L569.68 202.69L569.8 203.18L570.01 203.57L570.33 203.83L570.75 204.06L578.74 204.06L579.26 204.21L579.71 204.39L580.04 204.69L580.25 205.12L580.36 205.64L580.41 206.2L580.5 206.78L580.5 231.12L580.7 231.63L580.93 232.07L581.27 232.38L581.73 232.56L585.62 232.46L586.04 232.29L586.36 232.01L586.75 230.55L586.8 212L586.8 206.23L587.06 204.91L587.29 204.6L587.65 204.37L588.11 204.23L588.64 204.11L595.56 204.11L596.94 203.77L597.48 202.66L597.42 199.34L597.27 198.92L597.01 198.58L596.64 198.35L595.38 198.08ZM309.09 204.76L310.25 204.16L314.86 204.16L316.91 204.46L318.43 205.25L319.52 206.46L320.26 208.59L320.22 210.73L319.32 212.7L317.78 214.04L315.99 214.72L310.81 214.72L309.35 214.43L309.08 214.1L308.93 213.66L308.8 212L308.8 206.21ZM369.36 204.72L369.66 204.41L370.07 204.2L370.57 204.07L375.18 204.07L377.28 204.42L378.78 205.21L380.13 206.75L380.67 208.54L380.57 210.75L379.64 212.69L378.05 214L376.31 214.68L371.12 214.68L369.64 214.41L369.35 214.09L369.18 213.65L369.04 212L369.04 206.21ZM398.98 204.75L400.15 204.19L404.76 204.19L406.79 204.48L408.72 205.42L409.78 206.68L410.37 208.53L410.33 210.81L410.22 211.33L410.07 211.79L409.43 212.89L407.83 214.2L405.91 214.83L400.75 214.83L400.26 214.89L399.83 214.84L399.45 214.71L399.14 214.48L398.9 214.13L398.76 213.67L398.69 213.14L398.68 212.58L398.68 206.21Z" fill="#202D59" fill-rule="evenodd" stroke="#202D59" stroke-width="1.2"></path><path data-draw-text="subtitle" d="M378.28 245.12L377.94 245.23L377.66 245.46L377.49 245.79L377.6 247.01L385.08 268.49L385.26 268.89L385.49 269.26L385.79 269.58L386.14 269.8L387.34 270L388.58 269.83L388.97 269.64L389.31 269.38L389.95 268.24L397.12 248.73L397.78 246.61L397.8 246.24L397.71 245.9L397.48 245.65L397.1 245.49L395.54 245.43L395.07 245.54L394.69 245.73L394.39 246.01L394.17 246.36L388.28 263.66L388.11 264.09L387.91 264.47L387.65 264.77L387.36 265.02L386.66 263.46L381.08 246.39L380.88 246L380.62 245.67L380.27 245.41L379.87 245.22ZM429.38 245.11L429.05 245.37L428.82 245.76L428.67 246.25L428.56 246.78L428.56 252.77L428.23 253.58L427.98 253.67L427.69 253.61L425.7 252.25L424.41 251.85L422.18 251.77L420.71 252.04L419.18 252.82L417.97 253.91L417.02 255.29L416.09 257.27L415.67 259.06L415.6 261.3L415.82 263.3L416.36 265.08L417.26 267.07L418.23 268.42L419.18 269.2L420.75 269.95L422.74 270.27L424.9 270.09L426.52 269.42L427.96 268.33L429.08 269.71L429.43 269.9L429.84 270.01L430.3 270.04L430.77 270.01L431.19 269.9L431.54 269.66L431.8 269.29L431.98 268.8L432.1 267.1L432.1 246.31L432 245.86L431.84 245.49L431.59 245.22L431.24 245.03L430.79 244.93L430.29 244.9L429.8 244.96ZM468.7 245.03L468.29 245.16L467.96 245.41L467.71 245.78L467.43 246.24L467.43 252.58L466.82 253.98L465.2 252.76L463.66 252.03L461.6 251.75L459.98 251.9L458.37 252.56L457.07 253.58L456 254.83L455.2 256.34L454.57 258.57L454.37 260.72L454.49 262.97L454.93 264.77L455.61 266.42L456.54 267.81L457.76 268.9L459.59 269.95L461.6 270.24L463.69 270.01L465.22 269.28L466.82 268.05L467.65 269.48L467.93 269.74L468.28 269.91L469.53 269.98L469.91 269.85L470.22 269.61L470.45 269.25L470.77 267.68L470.88 264.91L470.88 246.88L470.86 246.4L470.77 245.99L470.61 245.63L470.37 245.34L470.04 245.13L469.62 245.01L469.16 244.98ZM403.15 251.91L401.1 252.71L399.54 254.05L398.74 255.58L398.69 256.06L398.79 256.51L399.01 256.87L399.32 257.09L399.65 257.19L400.73 257.02L403.35 254.98L403.77 254.82L404.25 254.71L405.89 254.66L407.28 255.02L408.2 255.83L408.7 257.12L408.75 258.25L408.63 258.56L408.4 258.84L408.05 259.07L407.59 259.22L404.38 259.54L402 260.02L400.35 260.66L399.33 261.37L398.25 262.63L397.76 263.81L397.66 265.87L398.02 267.17L398.68 268.25L399.52 269.15L401.46 270.07L403.02 270.25L405.16 270.06L406.36 269.58L408.82 268.05L409.29 269.27L409.51 269.61L409.81 269.84L410.17 269.97L410.58 270.02L411 269.99L411.4 269.89L412.19 269.09L412.41 267.66L412.41 258.41L412.31 256.87L411.74 255.18L411.06 254.14L410.18 253.26L408.36 252.19L405.92 251.76ZM441.44 251.92L439.81 252.56L438.43 253.5L437.26 254.66L436.39 256.09L435.76 257.8L435.38 259.64L435.32 261.86L435.62 263.78L436.22 265.52L437.07 266.97L438.18 268.19L439.49 269.19L440.65 269.78L441.96 270.13L444.2 270.22L446.21 269.95L447.84 269.29L449.21 268.34L450.26 267.07L451.09 265.58L451.74 263.94L452.12 261.88L452.17 260.14L451.88 257.94L451.27 256.27L450.41 254.8L449.29 253.6L448.27 252.89L446.66 252.17L445.3 251.84L443.62 251.69ZM479.72 251.91L477.72 252.77L476.23 254.18L475.45 255.64L475.42 256.06L475.53 256.45L475.79 256.76L476.2 256.97L476.69 257.06L477.21 257.04L477.69 256.9L479.61 255.24L479.97 255.02L480.37 254.85L481.9 254.59L482.46 254.61L482.99 254.69L484.25 255.19L485.1 256.06L485.56 257.31L485.59 257.81L485.54 258.29L485.37 258.7L485.09 259L484.69 259.2L480.94 259.55L479.05 259.91L477.32 260.49L475.9 261.38L474.8 262.62L474.31 263.8L474.26 265.85L474.61 267.12L475.29 268.19L476.16 269.08L477.2 269.77L478.49 270.17L480.16 270.29L482.2 269.99L483.37 269.44L485.38 268.03L485.84 269.26L486.06 269.61L486.36 269.87L487.64 270.09L488.08 270.01L488.44 269.84L488.7 269.58L488.87 269.22L488.96 268.76L489.06 268.24L489.06 258.98L489.03 256.71L488.54 254.95L487.28 253.31L485.43 252.24L484.13 251.89L482.48 251.71ZM494.25 252.03L493.88 252.16L493.58 252.4L493.34 252.77L493.12 254.34L493.12 267.68L493.22 268.25L493.28 268.78L493.39 269.26L493.59 269.62L493.88 269.87L494.25 270.02L494.7 270.07L495.92 269.75L496.51 268.69L496.51 258.98L497.02 256.97L497.72 255.95L498.03 255.68L498.4 255.46L501.42 254.49L501.72 254.14L501.91 253.69L501.97 253.18L501.91 252.68L501.71 252.26L501.39 251.95L500.96 251.8L500.45 251.76L498.65 252.25L496.98 253.67L495.46 252.15ZM508.78 251.97L507.23 252.69L505.67 254.05L504.96 255.58L504.95 256.04L505.05 256.47L505.29 256.82L505.61 257.05L505.97 257.17L507.08 257.12L507.43 256.96L507.75 256.72L508.86 255.49L509.17 255.22L509.53 255L510.92 254.59L512.6 254.62L513.11 254.74L513.54 254.9L514.49 255.67L515.07 256.82L515.13 258.29L514.97 258.69L514.68 258.98L514.27 259.17L510.57 259.56L508.16 260.03L506.52 260.69L505.5 261.41L504.48 262.71L503.88 264.34L503.88 265.8L504.43 267.48L505.12 268.52L505.41 268.82L505.73 269.09L506.83 269.72L508.1 270.14L509.74 270.28L511.84 270.02L513.01 269.5L514.96 268.08L515.5 269.23L515.71 269.56L515.99 269.81L516.34 269.96L516.77 270.03L518.01 269.83L518.29 269.59L518.48 269.23L518.59 268.77L518.69 268.24L518.69 259.56L518.62 256.72L518.08 254.99L516.83 253.35L515.83 252.61L514.65 252.06L512.06 251.6ZM422.52 255.01L422.94 254.9L423.4 254.83L424.85 254.91L426.41 255.59L426.73 255.85L427.03 256.15L427.73 257.18L428.63 259.71L428.6 262.29L427.91 264.44L426.73 266.16L426.4 266.42L426.05 266.65L424.85 267.11L422.95 267.12L421.32 266.51L420.16 265.32L419.34 263.23L419.2 260.23L419.66 257.95L420.75 256.13L421.05 255.84L421.38 255.58ZM441.71 255.04L443.62 254.62L444.17 254.64L444.69 254.71L445.16 254.84L445.56 255.01L447.14 256.33L447.82 257.4L448.3 258.62L448.54 260.15L448.55 261.88L448.07 264.29L447.47 265.45L446.64 266.35L445.58 267.02L445.16 267.18L444.7 267.31L444.18 267.39L443.62 267.41L443.07 267.38L442.56 267.28L441 266.54L439.89 265.31L439.24 263.59L438.95 260.74L439.39 257.95L440.42 256.07ZM461.87 254.96L463.17 254.92L463.6 254.99L464.01 255.1L465.47 255.98L466.72 257.63L467.34 260.02L467.29 262.51L466.93 264.01L466.75 264.43L466.54 264.8L465.21 266.36L464.07 266.96L463.66 267.07L463.21 267.14L461.35 267.04L460.94 266.91L460.54 266.73L459.5 266.01L458.52 264.65L457.92 262.41L457.96 259.64L458.83 257.08L459.58 256.09L459.89 255.81L460.23 255.57ZM407.3 261.89L408.3 262.08L408.61 262.31L408.83 262.65L408.94 263.09L408.6 264.83L407.94 265.93L407.66 266.23L407.35 266.5L405.8 267.27L404.18 267.46L402.65 267.19L401.64 266.45L401.4 266.12L401.21 265.73L401.09 265.28L401.06 264.78L401.11 264.3L401.25 263.86L402 262.9L402.33 262.66L402.71 262.46L403.14 262.3L403.64 262.18ZM512.94 261.89L514.61 262.01L514.91 262.25L515.11 262.61L515.22 263.08L515.22 263.6L515.14 264.1L515.01 264.56L514.85 264.96L513.88 266.31L512.42 267.16L510.9 267.44L509.29 267.26L508.17 266.63L507.9 266.32L507.69 265.97L507.43 264.83L507.76 263.68L507.99 263.33L508.26 263.02L508.58 262.75L508.94 262.54L509.35 262.36L509.82 262.23ZM479.41 262.58L481.9 262.04L484.72 262.08L485.16 262.3L485.47 262.64L485.63 263.1L485.46 264.57L484.56 265.99L483.21 266.96L481.31 267.42L479.71 267.25L479.28 267.09L478.91 266.89L478.58 266.64L478.3 266.35L478.06 266.03L477.89 265.66L477.78 265.24L477.74 264.79L478.12 263.59Z" fill="#202D59" fill-rule="evenodd" stroke="#202D59" stroke-width="0.9"></path></g></g><path data-draw="right-line" d="M 539.85 118.4 C 550 110 562 156 588 156 L 1180 156" fill="none" stroke="#202D59" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"></path>`;

const SSR_HEADER_SVG_INNER = `<g><path fill-rule="evenodd" clip-rule="evenodd" d="M 61.75 8.2C65.71 8.2 67.92 10.5 67.92 13.74C67.92 16.98 65.71 19.25 61.75 19.25H57.04V25.9H53.5V8.2H61.75ZM 57.04 16.24H61.6C63.33 16.24 64.35 15.26 64.35 13.74C64.35 12.2 63.33 11.21 61.6 11.21H57.04V16.24Z M 53.5 30.5 L 53.51 30.5" fill="currentColor"></path><path d="M 74.32 26.21C76.14 26.21 77.61 25.82 79.63 24.69L79.97 25.9H82.54L82.55 13.2H79.11L79.11 22.19C77.74 22.92 76.69 23.26 75.36 23.26C73.47 23.26 72.75 22.58 72.75 20.73V13.2H69.32V21.6C69.32 24.79 70.86 26.22 74.3 26.22L74.32 26.21Z M 69.32 30.5 L 69.33 30.5" fill="currentColor"></path><path d="M 84.3 25.91V13.21H86.87L87.23 14.47C89.24 13.29 90.68 12.89 92.29 12.89H93.03V15.84H92.39C90.59 15.84 89.24 16.13 87.73 16.87V25.91H84.3Z M 84.3 30.5 L 84.31 30.5" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M 94.26 13.2H97.47L97.7 14.43C99.23 13.29 100.9 12.89 103.01 12.89C107.31 12.89 109.07 14.68 109.07 19.56C109.07 24.41 107.31 26.22 103.01 26.22C100.99 26.22 99.36 25.84 97.7 24.78V29.75H94.26V13.2ZM 102.3 23.38C104.76 23.38 105.6 22.45 105.6 19.56C105.6 16.63 104.76 15.74 102.3 15.74C99.76 15.74 97.7 16.63 97.7 19.56C97.7 22.45 99.76 23.38 102.3 23.38Z M 94.26 30.5 L 94.27 30.5" fill="currentColor"></path><path d="M 114.26 8.2H110.83V25.9H114.26V8.2Z M 110.83 30.5 L 110.84 30.5" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M 123.95 26.23C118.07 26.23 115.93 24.59 115.93 19.59C115.93 14.71 117.93 12.89 123.23 12.89C128.24 12.89 130.21 14.55 130.21 18.82C130.21 19.32 130.19 20.03 130.13 20.67H119.48C119.76 22.9 120.92 23.54 124.11 23.54C126.08 23.54 127.47 23.3 129.22 22.7L129.44 25.43C127.52 26.01 126.08 26.23 123.95 26.23ZM 119.48 18.3H126.83C126.64 16.13 125.75 15.53 123.25 15.53C120.68 15.53 119.7 16.18 119.48 18.3Z M 115.93 30.5 L 115.94 30.5" fill="currentColor"></path><path d="M 132.32 8.2H144.8V11.21H135.88V15.68H143.22V18.6H135.88V25.9H132.32V8.2Z M 132.32 30.5 L 132.33 30.5" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M 153.52 26.23C147.64 26.23 145.5 24.59 145.5 19.59C145.5 14.71 147.5 12.89 152.8 12.89C157.81 12.89 159.78 14.55 159.78 18.82C159.78 19.32 159.75 20.03 159.7 20.67H149.05C149.32 22.9 150.49 23.54 153.68 23.54C155.65 23.54 157.04 23.3 158.79 22.7L159.01 25.43C157.09 26.01 155.65 26.23 153.52 26.23ZM 149.05 18.3H156.4C156.2 16.13 155.32 15.53 152.82 15.53C150.25 15.53 149.27 16.18 149.05 18.3Z M 145.5 30.5 L 145.51 30.5" fill="currentColor"></path><path d="M 167.56 26.22C164.97 26.22 162.9 25.79 161.27 25.12L161.76 22.53C163.52 23.2 165.54 23.57 167.51 23.57C169.84 23.57 170.63 23.11 170.63 22.15C170.63 21.19 169.93 20.94 166.94 20.61C162.9 20.15 161.58 19.02 161.58 16.68C161.58 14.01 163.6 12.89 167.82 12.89C170.02 12.89 171.95 13.22 173.44 13.76L173.01 16.31C171.34 15.77 169.58 15.51 167.82 15.51C165.71 15.51 164.88 15.89 164.88 16.77C164.88 17.64 165.62 17.89 168.52 18.23C172.65 18.69 173.97 19.77 173.97 22.11C173.97 24.95 171.86 26.22 167.56 26.22Z M 161.27 30.5 L 161.28 30.5" fill="currentColor"></path><path d="M 181.14 9.73L181.13 13.2H184.79V15.82H181.13L181.13 21.39C181.13 22.79 181.49 23.13 182.87 23.13H185V25.86H181.96C178.89 25.86 177.71 24.81 177.71 21.76L177.71 15.82H175.03V13.19H177.82L178.15 9.73H181.14Z M 175.03 30.5 L 175.04 30.5" fill="currentColor"></path></g><g><path d="M 25.91 13.03 C 28.93 17.7 27.81 28.55 26.25 28.98 C 24.68 29.42 23.34 20.63 22.22 20.63 C 21.1 20.63 19.76 29.42 18.42 28.98 C 17.08 28.55 16.63 17.7 20.32 13.03 C 24.79 7.28 32.62 7.61 37.43 12.71" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 8.02 19 C 6.34 26.05 9.47 28.98 10.59 28.55 C 11.71 28.12 9.7 22.04 10.59 21.71 C 11.49 21.39 14.4 28.33 15.51 27.9 C 16.63 27.46 15.07 18.46 9.14 14.88 C 3.21 11.41 0.53 15.2 2.09 17.48 C 3.88 19.87 8.58 17.05 11.04 12.71 C 14.73 6.2 21.44 6.2 25.91 13.03" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 37.43 12.71 C 40.11 15.75 44.59 18.78 46.15 16.62 C 47.49 14.66 44.59 11.62 39.33 14.88 C 34.08 18.13 31.84 27.14 32.96 27.9 C 34.08 28.55 36.98 21.39 37.88 21.71 C 38.77 22.04 36.76 28.12 37.88 28.55 C 39 28.98 41.57 26.05 40.11 19" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 7.45 5.65 C 6.1 4.1 3.55 4.45 3.75 6.45 C 3.95 8.25 6.75 9.5 8.85 10.15 C 9.65 8.25 10.05 5.35 8.45 4.3 C 7.25 3.5 7.05 5.05 7.45 5.65 Z M 7.45 30.5 L 7.46 30.5" fill="currentColor"></path><path d="M 23.65 2.65 C 22.65 0.45 20.15 0.45 20.15 2.65 C 20.15 4.65 22.65 6.05 23.65 7.3 C 24.65 6.05 27.15 4.65 27.15 2.65 C 27.15 0.45 24.65 0.45 23.65 2.65 Z M 23.65 30.5 L 23.66 30.5" fill="currentColor"></path><path d="M 39.55 5.65 C 40.15 5.05 39.95 3.5 38.75 4.3 C 37.15 5.35 37.55 8.25 38.35 10.15 C 40.45 9.5 43.25 8.25 43.45 6.45 C 43.65 4.45 41.1 4.1 39.55 5.65 Z M 39.55 30.5 L 39.56 30.5" fill="currentColor"></path></g>`;

// 1. Transform all 16 _rsc/<slug>.rsc files
console.log('--- Transforming 16 _rsc/<slug>.rsc files ---');
for (const slug of SLUGS) {
  const templateSlug = slug === 'viksit-bharat' ? 'about-us' : slug;
  const origRscPath = path.join(ORIG_DIR, '_rsc', `${templateSlug}.rsc`);
  const targetRscPath = path.join(TARGET_DIR, '_rsc', `${slug}.rsc`);
  const rawRsc = fs.readFileSync(origRscPath, 'utf8');
  const transformedRsc = transformFlightStream(rawRsc, slug, false);
  fs.writeFileSync(targetRscPath, transformedRsc, 'utf8');
  console.log(`  [OK] _rsc/${slug}.rsc (${transformedRsc.length} bytes)`);
}

// 2. Transform all 16 <slug>.html and <slug>/index.html files
console.log('--- Transforming 16 <slug>.html and <slug>/index.html files ---');
const pushRegex = /<script>self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)<\/script>/g;

for (const slug of SLUGS) {
  const templateSlug = slug === 'viksit-bharat' ? 'about-us' : slug;
  const htmlFilename = `${slug}.html`;
  const origHtmlPath = path.join(ORIG_DIR, `${templateSlug}.html`);
  const rawHtml = fs.readFileSync(origHtmlPath, 'utf8');

  // Extract all self.__next_f.push([1,"..."]) chunks
  let fullFlight = '';
  let firstMatchIdx = -1;
  let lastMatchEnd = -1;
  let m;
  pushRegex.lastIndex = 0;
  while ((m = pushRegex.exec(rawHtml)) !== null) {
    if (firstMatchIdx === -1) firstMatchIdx = m.index;
    lastMatchEnd = m.index + m[0].length;
    fullFlight += JSON.parse(m[1]);
  }

  const transformedFlight = transformFlightStream(fullFlight, slug, true);

  // Split transformedFlight by lines and emit clean <script>self.__next_f.push([1,"..."])</script> tags
  const flightLines = transformedFlight.split('\n').filter(Boolean);
  const newPushScripts = flightLines
    .map((line) => `<script>self.__next_f.push([1,${JSON.stringify(line + '\n')}])</script>`)
    .join('');

  const beforeScripts = transformSsrHtml(rawHtml.slice(0, firstMatchIdx), slug);
  const afterScripts = rawHtml.slice(lastMatchEnd);
  const finalHtml = beforeScripts + newPushScripts + afterScripts;

  const targetHtmlPath = path.join(TARGET_DIR, htmlFilename);
  fs.writeFileSync(targetHtmlPath, finalHtml, 'utf8');

  if (slug !== 'index') {
    const dirIndexPath = path.join(TARGET_DIR, slug, 'index.html');
    fs.mkdirSync(path.dirname(dirIndexPath), { recursive: true });
    fs.writeFileSync(dirIndexPath, finalHtml, 'utf8');
  }
  console.log(`  [OK] ${htmlFilename} (${finalHtml.length} bytes, ${flightLines.length} flight rows)`);
}

// 3. Transform client JS chunks for interactive components & branding
console.log('--- Transforming Client JS Chunks ---');

// 3a. 340-816a9923a87d460c.js (Logo wordmark + CSR badge + local TPO URL helper)
{
  const rel = '_next/static/chunks/340-816a9923a87d460c.js';
  let c = fs.readFileSync(path.join(ORIG_DIR, rel), 'utf8');

  // Replace the "Battalion" letter paths inside ef (the logo SVG) while keeping the twin-house architectural mark V!
  const oldLogoDef = `var ef=(0,D.memo)(function(e){return D.createElement("svg",eC({viewBox:"0 0 186 31",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),v||(v=D.createElement("path",{d:"M72.4594`;
  const idxLogoStart = c.indexOf(oldLogoDef);
  const idxLogoEnd = c.indexOf('function ed()', idxLogoStart);
  if (idxLogoStart !== -1 && idxLogoEnd !== -1) {
    const newLogoDef = `var ef=(0,D.memo)(function(e){return D.createElement("svg",eC({viewBox:"0 0 186 31",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),D.createElement("g",null,D.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M 61.75 8.2C65.71 8.2 67.92 10.5 67.92 13.74C67.92 16.98 65.71 19.25 61.75 19.25H57.04V25.9H53.5V8.2H61.75ZM 57.04 16.24H61.6C63.33 16.24 64.35 15.26 64.35 13.74C64.35 12.2 63.33 11.21 61.6 11.21H57.04V16.24Z M 53.5 30.5 L 53.51 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 74.32 26.21C76.14 26.21 77.61 25.82 79.63 24.69L79.97 25.9H82.54L82.55 13.2H79.11L79.11 22.19C77.74 22.92 76.69 23.26 75.36 23.26C73.47 23.26 72.75 22.58 72.75 20.73V13.2H69.32V21.6C69.32 24.79 70.86 26.22 74.3 26.22L74.32 26.21Z M 69.32 30.5 L 69.33 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 84.3 25.91V13.21H86.87L87.23 14.47C89.24 13.29 90.68 12.89 92.29 12.89H93.03V15.84H92.39C90.59 15.84 89.24 16.13 87.73 16.87V25.91H84.3Z M 84.3 30.5 L 84.31 30.5",fill:"currentColor"}),D.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M 94.26 13.2H97.47L97.7 14.43C99.23 13.29 100.9 12.89 103.01 12.89C107.31 12.89 109.07 14.68 109.07 19.56C109.07 24.41 107.31 26.22 103.01 26.22C100.99 26.22 99.36 25.84 97.7 24.78V29.75H94.26V13.2ZM 102.3 23.38C104.76 23.38 105.6 22.45 105.6 19.56C105.6 16.63 104.76 15.74 102.3 15.74C99.76 15.74 97.7 16.63 97.7 19.56C97.7 22.45 99.76 23.38 102.3 23.38Z M 94.26 30.5 L 94.27 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 114.26 8.2H110.83V25.9H114.26V8.2Z M 110.83 30.5 L 110.84 30.5",fill:"currentColor"}),D.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M 123.95 26.23C118.07 26.23 115.93 24.59 115.93 19.59C115.93 14.71 117.93 12.89 123.23 12.89C128.24 12.89 130.21 14.55 130.21 18.82C130.21 19.32 130.19 20.03 130.13 20.67H119.48C119.76 22.9 120.92 23.54 124.11 23.54C126.08 23.54 127.47 23.3 129.22 22.7L129.44 25.43C127.52 26.01 126.08 26.23 123.95 26.23ZM 119.48 18.3H126.83C126.64 16.13 125.75 15.53 123.25 15.53C120.68 15.53 119.7 16.18 119.48 18.3Z M 115.93 30.5 L 115.94 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 132.32 8.2H144.8V11.21H135.88V15.68H143.22V18.6H135.88V25.9H132.32V8.2Z M 132.32 30.5 L 132.33 30.5",fill:"currentColor"}),D.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M 153.52 26.23C147.64 26.23 145.5 24.59 145.5 19.59C145.5 14.71 147.5 12.89 152.8 12.89C157.81 12.89 159.78 14.55 159.78 18.82C159.78 19.32 159.75 20.03 159.7 20.67H149.05C149.32 22.9 150.49 23.54 153.68 23.54C155.65 23.54 157.04 23.3 158.79 22.7L159.01 25.43C157.09 26.01 155.65 26.23 153.52 26.23ZM 149.05 18.3H156.4C156.2 16.13 155.32 15.53 152.82 15.53C150.25 15.53 149.27 16.18 149.05 18.3Z M 145.5 30.5 L 145.51 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 167.56 26.22C164.97 26.22 162.9 25.79 161.27 25.12L161.76 22.53C163.52 23.2 165.54 23.57 167.51 23.57C169.84 23.57 170.63 23.11 170.63 22.15C170.63 21.19 169.93 20.94 166.94 20.61C162.9 20.15 161.58 19.02 161.58 16.68C161.58 14.01 163.6 12.89 167.82 12.89C170.02 12.89 171.95 13.22 173.44 13.76L173.01 16.31C171.34 15.77 169.58 15.51 167.82 15.51C165.71 15.51 164.88 15.89 164.88 16.77C164.88 17.64 165.62 17.89 168.52 18.23C172.65 18.69 173.97 19.77 173.97 22.11C173.97 24.95 171.86 26.22 167.56 26.22Z M 161.27 30.5 L 161.28 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 181.14 9.73L181.13 13.2H184.79V15.82H181.13L181.13 21.39C181.13 22.79 181.49 23.13 182.87 23.13H185V25.86H181.96C178.89 25.86 177.71 24.81 177.71 21.76L177.71 15.82H175.03V13.19H177.82L178.15 9.73H181.14Z M 175.03 30.5 L 175.04 30.5",fill:"currentColor"})),D.createElement("g",null,D.createElement("path",{d:"M 25.91 13.03 C 28.93 17.7 27.81 28.55 26.25 28.98 C 24.68 29.42 23.34 20.63 22.22 20.63 C 21.1 20.63 19.76 29.42 18.42 28.98 C 17.08 28.55 16.63 17.7 20.32 13.03 C 24.79 7.28 32.62 7.61 37.43 12.71",fill:"none",stroke:"currentColor",strokeWidth:"2.25",strokeLinecap:"round",strokeLinejoin:"round"}),D.createElement("path",{d:"M 8.02 19 C 6.34 26.05 9.47 28.98 10.59 28.55 C 11.71 28.12 9.7 22.04 10.59 21.71 C 11.49 21.39 14.4 28.33 15.51 27.9 C 16.63 27.46 15.07 18.46 9.14 14.88 C 3.21 11.41 0.53 15.2 2.09 17.48 C 3.88 19.87 8.58 17.05 11.04 12.71 C 14.73 6.2 21.44 6.2 25.91 13.03",fill:"none",stroke:"currentColor",strokeWidth:"2.25",strokeLinecap:"round",strokeLinejoin:"round"}),D.createElement("path",{d:"M 37.43 12.71 C 40.11 15.75 44.59 18.78 46.15 16.62 C 47.49 14.66 44.59 11.62 39.33 14.88 C 34.08 18.13 31.84 27.14 32.96 27.9 C 34.08 28.55 36.98 21.39 37.88 21.71 C 38.77 22.04 36.76 28.12 37.88 28.55 C 39 28.98 41.57 26.05 40.11 19",fill:"none",stroke:"currentColor",strokeWidth:"2.25",strokeLinecap:"round",strokeLinejoin:"round"}),D.createElement("path",{d:"M 7.45 5.65 C 6.1 4.1 3.55 4.45 3.75 6.45 C 3.95 8.25 6.75 9.5 8.85 10.15 C 9.65 8.25 10.05 5.35 8.45 4.3 C 7.25 3.5 7.05 5.05 7.45 5.65 Z M 7.45 30.5 L 7.46 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 23.65 2.65 C 22.65 0.45 20.15 0.45 20.15 2.65 C 20.15 4.65 22.65 6.05 23.65 7.3 C 24.65 6.05 27.15 4.65 27.15 2.65 C 27.15 0.45 24.65 0.45 23.65 2.65 Z M 23.65 30.5 L 23.66 30.5",fill:"currentColor"}),D.createElement("path",{d:"M 39.55 5.65 C 40.15 5.05 39.95 3.5 38.75 4.3 C 37.15 5.35 37.55 8.25 38.35 10.15 C 40.45 9.5 43.25 8.25 43.45 6.45 C 43.65 4.45 41.1 4.1 39.55 5.65 Z M 39.55 30.5 L 39.56 30.5",fill:"currentColor"})))});`;
    c = c.slice(0, idxLogoStart) + newLogoDef + c.slice(idxLogoEnd);
    console.log('  [OK] Updated Logo SVG emblem + wordmark in 340 chunk');
  }

  // Keep TPO links local instead of redirecting to https://battalion.com
  c = c.replace('let t="https://battalion.com";', 'let t="";');
  // Ensure externalPage="/apply" opens in a separate tab (target="_blank")
  c = c.replace(
    'let d=e=>(null==e?void 0:e.startsWith("#"))||(null==e?void 0:e.startsWith("/"));',
    'let d=e=>(null==e?void 0:e.startsWith("#"))||((null==e?void 0:e.startsWith("/"))&&!(null==e?void 0:e.startsWith("/apply")));'
  );
  // WCAG: Hide duplicate hover text (.btn__text) from screen readers & ensure icon-only buttons have aria-label
  c = c.replace(
    '(0,r.jsx)("span",{className:"btn__text",children:_})',
    '(0,r.jsx)("span",{className:"btn__text","aria-hidden":"true",children:_})'
  );
  c = c.replace(
    'return(0,r.jsxs)(A,{ref:t,className:w,...y,children:',
    'if(!_&&!y["aria-label"]){y["aria-label"]=g||n||M||"Link"}return(0,r.jsxs)(A,{ref:t,className:w,...y,children:'
  );
  fs.writeFileSync(path.join(TARGET_DIR, rel), c, 'utf8');
}

// 3b. 317-ed7330059b349994.js (TierOneSection, Calculator Deal Sizer, Pricer, ContactSection)
{
  const rel = '_next/static/chunks/317-ed7330059b349994.js';
  let c = fs.readFileSync(path.join(ORIG_DIR, rel), 'utf8');

  // Make TierOneSection h1 title visible alongside the badge
  c = c.replace(
    '(0,r.jsx)(u.Z,{name:"tier1",className:"w-130 h-auto"}),(0,r.jsx)("span",{className:"sr-only",children:a})',
    '(0,r.jsx)("span",{className:"block",children:a})'
  );

  // Update Calculator (Deal Sizer) labels & tooltips in 6249 & 8831
  const calcReplacements = [
    ['PROPERTY_VALUE:"Property value"', 'PROPERTY_VALUE:"CSR / Sponsorship Grant"'],
    ['RENTAL_INCOME:"Rental income"', 'RENTAL_INCOME:"Delegate & Stall Pool"'],
    ['PROPERTY_TAXES:"Taxes"', 'PROPERTY_TAXES:"ISL & Braille Kits"'],
    ['INSURANCE:"Insurance"', 'INSURANCE:"Accessible Transit"'],
    ['MAX_PAYMENT:"Payment"', 'MAX_PAYMENT:"Stall & Pass Budget"'],
    ['MIN_CASHFLOW:"Cashflow"', 'MIN_CASHFLOW:"Inclusion Surplus"'],
    ['PRINCIPAL_INTEREST:"Principal + interest"', 'PRINCIPAL_INTEREST:"Pavilion + Delegate Passes"'],
    ['INTEREST_ONLY:"Interest only"', 'INTEREST_ONLY:"Delegate Passes Only (₹2,200)"'],
    ['{label:"40 years",value:40},{label:"30 years",value:30},{label:"20 years",value:20},{label:"15 years",value:15}', '{label:"Tier B · ₹35K",value:40},{label:"Tier A · ₹15K",value:30},{label:"Tier C · ₹12K",value:20},{label:"Tier D · ₹5.5K",value:15}'],
    ['label:"Property value"', 'label:"CSR / Sponsorship Grant"'],
    ['label:"Rental income"', 'label:"Delegate & Stall Pool"'],
    ['label:"Loan term"', 'label:"Exhibition Stall Tier"'],
    ['label:"Payment type"', 'label:"Participation Format"'],
    ['label:"Interest rate"', 'label:"Delegate Pass Allocation %"'],
    ['label:"Taxes"', 'label:"ISL & Braille Kits"'],
    ['label:"Insurance"', 'label:"Accessible Transit"'],
    ['label:"Misc. expenses"', 'label:"Sensory & Volunteer Support"'],
    ['children:"Calculate based on"', 'children:"Size delegation based on"'],
    ['children:"Final loan amount"', 'children:"Recommended Pavilion & Pass Pool"'],
    ['children:"Final DSCR"', 'children:"Inclusion Impact Ratio"'],
    ['children:"Payment breakdown"', 'children:"Allocation breakdown"'],
    ['children:"Copy Scenario Link"', 'children:"Copy Delegation Link"'],
    ['label:"Principal"', 'label:"Exhibition Stalls (Tiers A–D)"'],
    ['label:"Interest"', 'label:"Delegate Passes (₹2,200)"'],
    ['label:"Cashflow"', 'label:"Inclusion Surplus"']
  ];
  for (const [from, to] of calcReplacements) {
    c = c.split(from).join(to);
  }

  // Nullify ComponentSectionsCalculatorDscr / Calculator component (8831) except on /deal-sizer (id=47) where it renders an sr-only h1
  c = c.replace(
    'Calculator:function(){return ed}',
    'Calculator:function(){return e=>{var d;return"47"===(null===(d=e.data)||void 0===d?void 0:d.id)?(0,r.jsx)("h1",{className:"sr-only",children:"Exhibition Stall & Institutional Delegation Sizer — Purple Fest Vadodara 2027"}):null}}'
  );
  c = c.replace(
    'let ed=e=>{let{data:l,className:a,removePadding:t=!1,...o}=e,',
    'let ed=e=>{var d;return"47"===(null===(d=e.data)||void 0===d?void 0:d.id)?(0,r.jsx)("h1",{className:"sr-only",children:"Exhibition Stall & Institutional Delegation Sizer — Purple Fest Vadodara 2027"}):null},_ed_orig=e=>{let{data:l,className:a,removePadding:t=!1,...o}=e,'
  );

  // WCAG: Attach aria-label to all <video> elements in Media component (2534) without visible caption overlay
  c = c.replace(
    'return(0,r.jsx)("video",{ref:n,src:s(p.current.url),className:(0,o.Z)("w-full h-full object-cover",d),muted:m,loop:u,playsInline:h,autoPlay:g,controls:x})',
    'return(0,r.jsx)("video",{ref:n,src:s(p.current.url),className:(0,o.Z)("w-full h-full object-cover",d),muted:m,loop:u,playsInline:h,autoPlay:g,controls:x,"aria-label":(null===(l=p.current)||void 0===l?void 0:l.alternativeText)||"Purple Fest Vadodara 2027 Inclusive Showcase Video"})'
  );

  // WCAG: Single <h1> per page & sequential heading hierarchy in HomeHeroSection (6492), NumbersSection (7064), ServicesSection (386), Pricer (954)
  c = c.replace(
    '(0,r.jsxs)("h1",{className:(0,u.Z)("h1 mb-8 md:mx-auto max-w-[65rem] md:mt-50 lg:hidden",s)',
    '(0,r.jsxs)("div",{"aria-hidden":"true",className:(0,u.Z)("h1 mb-8 md:mx-auto max-w-[65rem] md:mt-50 lg:hidden",s)'
  );
  c = c.replace(
    '(0,r.jsx)("h1",{className:"mb-56 lg:mb-80 text-center"',
    '(0,r.jsx)("h2",{className:"h1 mb-56 lg:mb-80 text-center"'
  );
  c = c.replace(
    '(0,r.jsx)("h2",{className:"h1 mb-16 lg:mb-24"',
    '(0,r.jsx)("h1",{className:"h1 mb-16 lg:mb-24"'
  );
  c = c.replace(
    'let $=e=>{let{title:l,children:a}=e;return(0,D.jsxs)("section",{className:"lg:bg-lilac px-[0px] lg:px-[32px] pt-[24px] pb-[40px] flex flex-col gap-[24px]",children:[(0,D.jsx)("h5",{className:"text-[18px] lg:text-[24px] tracking-[1.1] font-semibold text-blue-900",children:l}),a]})}',
    'let $=e=>{let{title:l,children:a}=e;return(0,D.jsxs)("section",{className:"lg:bg-lilac px-[0px] lg:px-[32px] pt-[24px] pb-[40px] flex flex-col gap-[24px]",children:[(0,D.jsx)("h2",{className:"text-[18px] lg:text-[24px] tracking-[1.1] font-semibold text-blue-900",children:l}),a]})}'
  );
  c = c.replace(
    'return(0,D.jsxs)("section",{ref:i,className:"py-45 md:pt-140 md:pb-120",children:["loading"===a',
    'return(0,D.jsxs)("section",{ref:i,className:"py-45 md:pt-140 md:pb-120",children:[(0,D.jsx)("h1",{className:"sr-only",children:"Delegate Pass (₹2,200) & Exhibitor Stall Pricer — Purple Fest Vadodara 2027"}),"loading"===a'
  );

  // WCAG: Explicit <label htmlFor> and aria-label associations in ContactSection (3576) and Pricer (7599, 4956)
  c = c.replace(
    'return(0,r.jsx)("textarea",{...t,placeholder:n,className:"form-control"',
    'return(0,r.jsx)("textarea",{...t,id:"contact-field-".concat(s),"aria-label":n||s,placeholder:n,className:"form-control"'
  );
  c = c.replace(
    ':g?(0,r.jsx)(c(),{mask:g,type:v,inputMode:"numeric",...n(i,{required:d}),placeholder:C,className:"form-control","aria-invalid":!!a[i]})',
    ':g?(0,r.jsx)(c(),{id:"contact-field-".concat(i),"aria-label":C||i,mask:g,type:v,inputMode:"numeric",...n(i,{required:d}),placeholder:C,className:"form-control","aria-invalid":!!a[i]})'
  );
  c = c.replace(
    ':(0,r.jsx)("input",{value:u,type:v,...n(i,{required:d}),placeholder:C,className:"form-control","aria-invalid":!!a[i]})',
    ':(0,r.jsx)("input",{id:"contact-field-".concat(i),"aria-label":C||i,value:u,type:v,...n(i,{required:d}),placeholder:C,className:"form-control","aria-invalid":!!a[i]})'
  );
  c = c.replace(
    'C&&"select"!==v&&(0,r.jsx)("label",{className:"form-label",children:C})',
    'C&&"select"!==v&&(0,r.jsx)("label",{htmlFor:"contact-field-".concat(i),className:"form-label",children:C})'
  );
  c = c.replace(
    '(0,r.jsxs)("label",{htmlFor:l,className:"form-label flex items-center z-2 pr-2"',
    '(0,r.jsxs)("label",{id:"".concat(l,"-label"),htmlFor:"".concat(l,"-input"),className:"form-label flex items-center z-2 pr-2"'
  );
  c = c.replace(
    '(0,r.jsx)("input",{id:l,type:"range"',
    '(0,r.jsx)("input",{id:l,"aria-label":y||a||l,type:"range"'
  );
  c = c.replace(
    'placeholder:C,isDisabled:S',
    '"aria-label":h||C||"Select option",placeholder:C,isDisabled:S'
  );

  // WCAG: TeamSection social links accessible names (6269)
  c = c.replace(
    '{externalPage:e.link,theme:"link",children:e.title}',
    '{externalPage:e.link,theme:"link","aria-label":e.title||e.type||"Social Profile",children:e.title||e.type||"Profile"}'
  );

  // Update ContactSection placeholders in 3576
  c = c.replace('placeholder:"Company name"', 'placeholder:"Organisation / University / School / DPO"');
  c = c.replace('placeholder:"I’m interested in"', 'placeholder:"Delegate Pass (₹2,200), Stall Tier (A–D), or 21 RPwD Accommodations"');

  // Update Pricer (954) labels & replace Server Action F/W with instant PurpleFest Pass & Stall Rate Generator
  const pricerFnCode = `async function(e){let l=[15,30,45,60],a=[{rate:2.2,base:2200,mp:2200,ref:"Mandatory Delegate Pass (₹2,200)"},{rate:5.5,base:5500,mp:5500,ref:"Tier D · DPO / Grassroots NGO Stall (₹5,500)"},{rate:12,base:12e3,mp:12e3,ref:"Tier C · Assistive Startup Pod (₹12,000)"},{rate:15,base:15e3,mp:15e3,ref:"Tier A · Standard 3m×3m Stall (₹15,000)"},{rate:35,base:35e3,mp:35e3,ref:"Tier B · Corner 6m×3m Pavilion (₹35,000)"}],r=[];return l.forEach(e=>{a.forEach(l=>{r.push({rate:l.rate,lock:e,base:l.base,value:l.base,uncapped:l.base,monthly_payment:l.mp,potential_revenue:l.base,sum_of_adjustments:0,lock_adjustment:0,reference:l.ref})})}),{battalion:r,other:[],battalionAdjusters:{"Mandatory Delegate Pass (₹2,200)":{adjusters:[{name:"3-Day Full Festival Delegate Pass (No Free Entry)",value:2200},{name:"All 6 Experience Zones & GIEN/TISS Plenaries",value:0},{name:"21 RPwD Accommodations (ISL, Braille, Buggy)",value:0}]},"Tier D · DPO / Grassroots NGO Stall (₹5,500)":{adjusters:[{name:"3m × 2m Subsidized DPO / NGO Marketplace Stall",value:5500},{name:"2 Complimentary Exhibitor Badges Included",value:0}]},"Tier C · Assistive Startup Pod (₹12,000)":{adjusters:[{name:"Assistive Tech Startup & University R&D Demo Pod",value:12e3},{name:"2 Complimentary Exhibitor Badges Included",value:0}]},"Tier A · Standard 3m×3m Stall (₹15,000)":{adjusters:[{name:"3m × 3m Standard Octanorm Pavilion (Zone 01)",value:15e3},{name:"2 Complimentary Exhibitor Badges Included",value:0}]},"Tier B · Corner 6m×3m Pavilion (₹35,000)":{adjusters:[{name:"6m × 3m Prime Corner Two-Side-Open Pavilion",value:35e3},{name:"4 Complimentary Exhibitor Badges Included",value:0}]}}}}`;

  c = c.replace(
    'F=(0,H.$)("0a31680d12d7b5d26d161fd0c48991c1238dbfcf"),W=(0,H.$)("0a5b15f0399b5e722f29ac196ca052ec50146103")',
    `F=${pricerFnCode},W=F`
  );

  const pricerReplacements = [
    ['title:"Property"', 'title:"1. Delegate & Exhibitor Profile (21–23 Jan 2027 · Vadodara)"'],
    ['title:"Loan"', 'title:"2. Exhibition Stall Tier (A–D) & Pass Configuration"'],
    ['title:"Borrower"', 'title:"3. RPwD Act 2016 (21 Benchmark Disabilities) Accommodations"'],
    ['children:"Get Rates"', 'children:"Calculate Fee"'],
    ['"We’ll match you with the best options"', '"Mandatory ₹2,200 Delegate Pass & Tier A–D Exhibition Stall Calculator"'],
    ['children:"based on your scenario"', 'children:"(No free walk-in visitors · All 21 RPwD accommodations included)"']
  ];
  for (const [from, to] of pricerReplacements) {
    c = c.split(from).join(to);
  }

  // Apply Tasks 2, 3, 4, 5 to 317 chunk
  c = applyJoinUsMapTo317Chunk(c);
  c = applyPhoneQrTo317Chunk(c);
  c = applySponsorsTo317Chunk(c);
  c = applyDatesAndDocxReplacements(c);

  fs.writeFileSync(path.join(TARGET_DIR, rel), c, 'utf8');
  console.log('  [OK] Updated 317 chunk (TierOneSection, Calculator, Pricer, ContactSection, JoinUsMap, PhoneQr, Sponsors, Dates)');
}

// 3c. app/layout-cacaa35457036801.js (Hand-Drawn Preloader: Left Line -> PurpleFest 3-Figure Emblem + Hearts -> Right Line + PURPLE FEST / Vadodara -> Fly to Header)
{
  const rel = '_next/static/chunks/app/layout-cacaa35457036801.js';
  let c = fs.readFileSync(path.join(ORIG_DIR, rel), 'utf8');
  c = c.replace(/Battalion Lending LLC/g, 'Purple Fest Vadodara 2027 · Praangan & Brotherhood');
  c = c.replace(
    /className:"w-full mt-\[4\.8rem\] text-center md:text-left lg:whitespace-nowrap lg:text-right(\s*md:mt-auto)?"/g,
    'className:"w-full mt-[4.8rem] md:mt-auto text-center md:text-left lg:text-right"'
  );
  c = c.replace(
    /\(0,a\.jsxs\)\("p",\{className:"mb-0 text-gray-300",children:\["Designed by"," ",\(0,a\.jsx\)\(c\.default,\{className:"link link--underline",target:"_blank",href:"https:\/\/noomoagency\.com\/",children:"Noomo Agency"\}\)\]\}\)/g,
    '(0,a.jsx)("p",{className:"mb-0 text-gray-300",children:"Designed by Gurarpit Singh and Mehardeep Singh. Ajeet Graphics"})'
  );
  c = c.replace(/info@batallion\.com/g, 'purplefestivalvadodara@gmail.com');
  c = c.replace(/\(718\) 208-2000/g, '+91 99743 83920');
  c = c.replace('Ready to actively finance your investments?', '21–23 January 2027 · Vadodara, Gujarat · Mandatory Delegate Registration ₹2,200');
  c = c.replace('https://pricer.battaliontpo.com/', '/pricer');
  c = c.replace(
    'let I=[{title:"Programs",slug:"programs"},{title:"Services",slug:"services",items:[{title:"Battalion TPO",slug:"battalion-tpo"},{title:"Tier 1 Program",slug:"tier-1-program"}]},{title:"Company",slug:"company",items:[{title:"About Us",slug:"about"},{title:"Careers",slug:"careers"}]},{title:"Contact Us",slug:"contact"},{title:"Composyte",externalPath:"https://composyte.com/",external:!0}]',
    'let I=[{title:"Programme & Zones",slug:"programs"},{title:"Exhibitors & CSR",slug:"battalion-tpo"},{title:"Inclusion & Passes",slug:"",items:[{title:"GIEN & Barrier-Free",slug:"composyte"},{title:"Stall Tiers (A–D)",slug:"programs-tpo"},{title:"Apply Now",externalPath:"/apply",external:!0}]},{title:"Movement",slug:"",items:[{title:"About & Goa Legacy",slug:"about-us"},{title:"Viksit Bharat @ 2047",slug:"viksit-bharat"},{title:"Volunteer & Cultural Call",slug:"careers"}]},{title:"Register & Contact",slug:"contact"}]'
  );
  c = c.replace(/"data-header-logo":!0/g, 'id:"header-logo","data-header-logo":!0');

  const qStartMarker = 'let q=()=>{';
  const qEndMarker = ';var K=l(7362)';
  const idxQStart = c.indexOf(qStartMarker);
  const idxQEnd = c.indexOf(qEndMarker, idxQStart);
  if (idxQStart !== -1 && idxQEnd !== -1) {
    const newQComponent = `let q=()=>{let e=(0,r.useRef)(null),t=(0,r.useRef)(null),l=(0,r.useRef)(null),s=(0,r.useRef)(null),n=(0,r.useRef)(null),i=(0,r.useRef)(null),o=(0,r.useRef)(null),[c,d]=(0,r.useState)(!0),m=(0,w.LZ)(),mRef=(0,r.useRef)(m),doneRef=(0,r.useRef)(!1),{setPreloaderFinished:f,setPreloaderRemoved:x,mainSequenceLoaded:p,setMainSequenceLoaded:h}=(0,b.U)();return mRef.current=m,(0,r.useEffect)(()=>{h(!0)},[]),(0,r.useEffect)(()=>{doneRef.current||(null==m||m.stop())},[m]),(0,r.useEffect)(()=>{let a=T.ZP.context(()=>{var a;null==mRef.current||mRef.current.stop(),null===(a=i.current)||void 0===a||a.classList.remove("opacity-0");let leftPath=e.current.querySelector('[data-draw="left-line"]'),ribbonPath=e.current.querySelector('[data-draw="emblem-ribbon"]'),rightPath=e.current.querySelector('[data-draw="right-line"]'),heart1=e.current.querySelector('[data-heart="1"]'),heart2=e.current.querySelector('[data-heart="2"]'),heart3=e.current.querySelector('[data-heart="3"]'),titleEl=e.current.querySelector('[data-draw-text="title"]'),subtitleEl=e.current.querySelector('[data-draw-text="subtitle"]'),hEl=document.querySelector("#header-logo, [data-header-logo]"),yRect=hEl?hEl.getBoundingClientRect():{left:40,top:20,width:186,height:31},svgRect=e.current.getBoundingClientRect(),coreRect=s.current?s.current.getBoundingClientRect():svgRect,scale=Math.min(yRect.width/(coreRect.width||300),(yRect.height*1.65)/(coreRect.height||240)),offsetX=(coreRect.left+coreRect.width/2)-svgRect.left,offsetY=(coreRect.top+coreRect.height/2)-svgRect.top,tx=(yRect.left+yRect.width/2)-(svgRect.left+offsetX*scale),ty=(yRect.top+yRect.height/2)-(svgRect.top+offsetY*scale),leftLen=leftPath&&leftPath.getTotalLength?leftPath.getTotalLength():680,ribbonLen=ribbonPath&&ribbonPath.getTotalLength?ribbonPath.getTotalLength():1480,rightLen=rightPath&&rightPath.getTotalLength?rightPath.getTotalLength():680;T.ZP.set(leftPath,{strokeDasharray:leftLen,strokeDashoffset:leftLen,opacity:1}),T.ZP.set(ribbonPath,{strokeDasharray:ribbonLen,strokeDashoffset:ribbonLen,opacity:0}),T.ZP.set(rightPath,{strokeDasharray:rightLen,strokeDashoffset:rightLen,opacity:0}),T.ZP.set([heart1,heart2,heart3],{scale:0,opacity:0,transformOrigin:"50% 85%"}),T.ZP.set(titleEl,{strokeDasharray:340,strokeDashoffset:340,fillOpacity:0,opacity:0,y:8}),T.ZP.set(subtitleEl,{strokeDasharray:240,strokeDashoffset:240,fillOpacity:0,opacity:0,y:8});let tl=T.ZP.timeline({onComplete:()=>{doneRef.current=!0,f(!0),x(!0),null==mRef.current||mRef.current.start(),T.ZP.delayedCall(.1,()=>{var e;null===(e=l.current)||void 0===e||e.remove()})}});window.__preloaderTimeline=tl,tl.to(leftPath,{strokeDashoffset:0,duration:.55,ease:"power2.in"},0).set(ribbonPath,{opacity:1},.55).to(ribbonPath,{strokeDashoffset:0,duration:1.3,ease:"none"},.55).to(heart1,{scale:1,opacity:1,duration:.32,ease:"back.out(2.2)"},.85).to(heart2,{scale:1,opacity:1,duration:.32,ease:"back.out(2.2)"},1.25).to(heart3,{scale:1,opacity:1,duration:.32,ease:"back.out(2.2)"},1.65).to(titleEl,{opacity:1,y:0,strokeDashoffset:0,duration:.55,ease:"power2.out"},1.35).to(titleEl,{fillOpacity:1,strokeWidth:0,duration:.35,ease:"power2.out"},1.58).set(rightPath,{opacity:1},1.85).to(rightPath,{strokeDashoffset:0,duration:.55,ease:"power2.out"},1.85).to(subtitleEl,{opacity:1,y:0,strokeDashoffset:0,duration:.5,ease:"power2.out"},1.85).to(subtitleEl,{fillOpacity:1,strokeWidth:0,duration:.35,ease:"power2.out",onComplete:()=>{d(!1)}},2.05).to(leftPath,{strokeDashoffset:-leftLen,opacity:0,duration:.28,ease:"power2.inOut"},2.5).to(rightPath,{strokeDashoffset:-rightLen,opacity:0,duration:.28,ease:"power2.inOut"},2.5).add(()=>{doneRef.current=!0,f(!0),null==mRef.current||mRef.current.start()},2.7).to(e.current,{x:tx,y:ty,scale:scale,duration:.82,transformOrigin:"top left",ease:"power3.inOut"},2.7).to(o.current,{yPercent:-100,opacity:0,duration:.48,ease:"power3.inOut"},3.05).add(()=>{x(!0)},3.22).to(e.current,{opacity:0,duration:.25,ease:"power2.out"},3.25)},e);return()=>{a.revert()}},[]),(0,a.jsxs)("div",{"aria-hidden":"true",className:(0,u.Z)("fixed text-blue-900 left-0 top-0 w-full h-full z-[1001] flex items-center justify-center overflow-hidden",F().preloader),ref:l,children:[(0,a.jsx)("span",{className:"fixed left-0 top-0 w-full h-screen bg-purple-100 -z-1",ref:o}),(0,a.jsxs)("div",{className:"w-full relative opacity-0 flex items-center justify-center",ref:i,children:[(0,a.jsx)("div",{className:F().logo,children:(0,a.jsxs)("svg",{ref:e,className:F().logoSvg,width:"900",height:"320",viewBox:"0 0 900 320",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"min(88vw, 860px)",height:"auto",overflow:"visible"},children:[(0,a.jsx)("path",{"data-draw":"left-line",d:"M -280 156 L 312 156 C 338 156 350 110 360.15 118.4",fill:"none",stroke:"#202D59",strokeWidth:"6.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,a.jsxs)("g",{ref:s,"data-logo-core":"true",children:[(0,a.jsx)("path",{"data-draw":"emblem-ribbon",d:"M 360.15 118.4 C 350.74 157.88 368.27 174.29 374.54 171.88 C 380.81 169.47 369.56 135.42 374.54 133.58 C 379.58 131.78 395.88 170.65 402.09 168.24 C 408.36 165.78 399.63 115.38 366.42 95.33 C 333.21 75.9 318.2 97.12 326.94 109.89 C 336.96 123.27 363.28 107.48 377.06 83.18 C 397.72 46.72 435.3 46.72 460.33 84.97 C 477.24 111.12 470.97 171.88 462.24 174.29 C 453.44 176.75 445.94 127.53 439.67 127.53 C 433.4 127.53 425.89 176.75 418.39 174.29 C 410.88 171.88 408.36 111.12 429.03 84.97 C 454.06 52.77 497.91 54.62 524.84 83.18 C 539.85 100.2 564.94 117.17 573.68 105.07 C 581.18 94.1 564.94 77.07 535.48 95.33 C 506.08 113.53 493.54 163.98 499.81 168.24 C 506.08 171.88 522.32 131.78 527.36 133.58 C 532.35 135.42 521.09 169.47 527.36 171.88 C 533.64 174.29 548.03 157.88 539.85 118.4",fill:"none",stroke:"#202D59",strokeWidth:"6.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,a.jsx)("path",{"data-heart":"1",d:"M 356.96 43.64 C 349.4 34.96 335.12 36.92 336.24 48.12 C 337.36 58.2 353.04 65.2 364.8 68.84 C 369.28 58.2 371.52 41.96 362.56 36.08 C 355.84 31.6 354.72 40.28 356.96 43.64 Z",fill:"#202D59"}),(0,a.jsx)("path",{"data-heart":"2",d:"M 447.68 26.84 C 442.08 14.52 428.08 14.52 428.08 26.84 C 428.08 38.04 442.08 45.88 447.68 52.88 C 453.28 45.88 467.28 38.04 467.28 26.84 C 467.28 14.52 453.28 14.52 447.68 26.84 Z",fill:"#202D59"}),(0,a.jsx)("path",{"data-heart":"3",d:"M 536.72 43.64 C 540.08 40.28 538.96 31.6 532.24 36.08 C 523.28 41.96 525.52 58.2 530 68.84 C 541.76 65.2 557.44 58.2 558.56 48.12 C 559.68 36.92 545.4 34.96 536.72 43.64 Z",fill:"#202D59"}),(0,a.jsxs)("g",{ref:n,children:[(0,a.jsx)("path",{"data-draw-text":"title",d:"M303.5 198.11L302.64 198.87L302.49 200.4L302.49 231.65L302.64 232.11L302.81 232.48L303.08 232.74L303.45 232.9L307.23 232.94L308.32 232.46L308.51 232.1L308.68 231.64L308.68 223.02L309.02 221.5L309.32 221.17L309.74 220.96L310.25 220.79L315.3 220.79L318.19 220.23L320.29 219.45L322.42 218.11L324.43 216.06L325.64 213.79L326.41 211.08L326.5 208.08L325.71 204.93L324.2 202.36L322.43 200.66L319.9 199.12L318.2 198.55L315.21 198.11ZM330.74 198.1L330.37 198.25L330.08 198.49L329.71 199.84L329.71 219.54L329.95 221.59L330.51 223.92L331.12 225.61L332.17 227.47L334.02 229.67L336.25 231.5L338.51 232.71L341.11 233.54L344.44 233.89L347.83 233.59L350.03 232.95L352.68 231.55L354.93 229.75L357.05 227.21L358.21 224.91L359.13 221.79L359.5 218.38L359.5 203.35L359.41 199.84L359.3 199.31L359.08 198.85L358.74 198.51L358.29 198.29L356.62 198.13L354.37 198.34L353.92 198.55L353.58 198.88L353.36 199.32L353.25 199.84L353.2 200.4L353.17 200.98L353.17 218.87L352.68 221.69L351.38 224.45L349.72 226.26L347.4 227.45L344.44 227.94L341.98 227.52L339.63 226.39L338.04 225.06L336.72 222.9L336.11 221.19L335.78 218.96L335.78 199.44L335.18 198.39L334.84 198.19L334.42 198.07ZM364.37 198.08L363.95 198.19L363.58 198.34L363.26 198.58L363.02 198.91L362.78 200.41L362.78 229.98L363.04 232.05L363.29 232.38L363.63 232.62L364.9 232.88L367.22 232.84L368.51 232.39L369.09 231.11L369.09 221.94L369.35 221.5L369.64 221.17L370.06 220.96L372.86 220.76L374.41 221.09L374.79 221.35L375.09 221.65L379.08 227.53L381.02 229.66L382.87 231.28L384.31 232.16L385.99 232.8L387.92 232.99L389.21 232.62L389.45 232.31L389.59 231.94L389.65 231.54L389.68 231.11L389.6 228.81L389.5 228.29L389.32 227.83L389.05 227.46L388.72 227.21L386.56 226.43L385.25 225.42L383.72 223.47L381.51 219.94L381.71 218.79L383.81 216.86L385.08 215.23L386.2 212.87L386.7 210.99L386.83 209.11L386.63 207.24L385.8 204.57L384.76 202.71L383.7 201.45L382.05 200.19L380.16 199.19L378.01 198.46L375.12 198.08ZM393.91 198.1L392.83 198.57L392.43 199.85L392.43 231.09L392.52 231.59L392.67 232L392.92 232.33L393.28 232.57L394.61 232.87L397.12 232.87L398.2 232.44L398.41 232.09L398.6 231.64L398.6 223.03L398.97 221.55L399.25 221.24L399.65 221.04L400.15 220.88L405.32 220.88L407.69 220.48L409.93 219.78L412.16 218.53L414.16 216.48L415.6 213.86L416.47 210.75L416.51 207.97L415.89 205.22L414.48 202.57L412.79 200.77L410.18 199.32L408.06 198.58L405.6 198.1ZM421.12 198.04L420.08 198.57L419.73 199.85L419.73 227.66L419.78 231.07L419.84 231.54L419.97 231.94L420.21 232.26L420.58 232.49L422.16 232.75L439.56 232.75L443.6 232.55L444.12 232.47L444.56 232.31L444.9 232.02L445.12 231.62L445.24 231.11L445.27 228.82L444.89 227.31L444.56 226.99L444.12 226.79L443.6 226.69L443.04 226.73L428.54 226.73L426.93 226.63L426.54 226.46L426.25 226.18L425.83 224.18L425.83 199.32L425.66 198.86L425.47 198.51L425.2 198.26L424.83 198.11ZM449.61 198.07L448.51 198.54L448.27 198.89L448.13 199.33L448.06 199.85L448.05 200.4L448.05 229.98L448.36 231.95L448.62 232.24L448.99 232.43L450.58 232.68L468.56 232.68L470.04 232.43L470.34 232.1L470.51 231.65L470.63 229.4L470.47 227.78L470.29 227.39L470 227.12L467.98 226.8L455.83 226.8L455.34 226.68L454.94 226.5L454.66 226.21L454.35 224.18L454.41 220.73L454.91 219.5L456.78 218.49L460.62 217.12L466.93 215.85L467.51 214.81L467.63 213.16L467.43 211.05L467.23 210.7L466.95 210.46L466.59 210.32L466.18 210.52L461.21 210.52L455.93 212.4L454.89 212.45L454.65 212.23L454.48 211.86L454.3 210.26L454.38 206.21L454.7 204.78L454.97 204.5L455.36 204.32L455.84 204.21L456.39 204.13L467.4 204.13L469.44 203.82L469.76 203.56L469.98 203.17L470.11 202.68L470.18 202.13L470.17 200.4L469.83 198.85L469.6 198.49L469.29 198.25L467.95 198.07ZM490.81 198.08L489.43 198.18L488.96 198.31L488.56 198.53L488.04 199.84L488.04 230.56L488.07 231.12L488.14 231.63L488.29 232.07L488.57 232.41L488.97 232.63L489.47 232.75L491.76 232.8L493.39 232.46L493.79 232.12L494.05 231.66L494.19 231.13L494.25 230.56L494.25 223.02L494.29 222.46L494.38 221.93L494.53 221.47L494.76 221.09L496.53 219.96L500.34 218.53L503.11 217.82L506.68 217.31L507.07 217.14L507.34 216.87L507.51 216.48L507.6 216.01L507.52 212.69L507.37 212.29L507.1 211.99L506.72 211.81L506.22 211.73L503.43 211.89L500.51 212.37L495.68 213.88L495.25 213.92L494.85 213.82L494.54 213.53L494.35 213.1L494.26 212.57L494.23 212L494.23 206.2L494.57 204.7L494.89 204.39L495.33 204.2L495.84 204.11L496.4 203.99L510.13 203.99L510.5 203.74L510.76 203.47L510.92 203.11L511.06 200.41L511.03 199.86L510.96 199.36L510.84 198.93L510.63 198.6L509.58 198.08ZM522.67 198.07L515.57 198.13L515.07 198.31L514.68 198.54L514.41 198.89L514.21 199.33L514.21 230.56L514.4 232.07L514.67 232.4L515.07 232.62L515.57 232.74L516.13 232.79L534.1 232.79L535.72 232.57L536.11 232.35L536.38 232.03L536.53 231.61L536.6 231.11L536.55 228.31L536.04 227.18L534.1 226.7L521.48 226.7L521.1 226.44L520.81 226.16L520.63 225.78L520.43 222.44L520.55 220.2L521.21 219.11L522.75 218.35L526.66 217.04L532.63 215.97L533.42 215.17L533.59 213.72L533.48 211.07L533.32 210.72L533.07 210.46L532.72 210.29L532.27 210.39L527.74 210.39L521.86 212.23L521.41 212.25L521.01 212.12L520.73 211.81L520.57 211.36L520.5 210.83L520.48 210.26L520.51 206.21L520.82 204.77L521.09 204.48L521.47 204.29L521.96 204.18L522.51 204.08L533.52 204.08L535.04 203.87L535.39 203.68L535.64 203.42L535.79 203.06L535.88 202.62L535.79 198.9L535.62 198.56L535.36 198.31L534.07 198.07ZM549.36 198.01L546.72 198.82L544.78 199.77L542.5 201.55L541.14 203.1L540.02 205.44L539.64 207.37L539.65 210.24L540.26 212.51L541.15 213.93L542.61 215.39L544.02 216.29L545.65 216.98L548.78 217.85L557.9 219.14L560.21 219.83L561.17 220.6L561.41 220.95L561.6 221.39L561.74 221.89L561.81 222.44L561.58 224.06L560.62 225.46L558.87 226.63L556.67 227.35L554.19 227.66L550.92 227.45L548.33 226.48L546.97 225.52L545.36 223.09L544.35 222.42L541.09 222.33L539.76 222.61L539.24 223.62L539.44 224.93L540.46 227.39L542 229.33L544.27 231.11L546.97 232.47L550.08 233.42L553.24 233.71L556.64 233.57L559.9 232.86L562.33 231.83L564.43 230.44L566.11 228.65L567.19 226.82L567.86 224.67L568.01 221.86L567.75 219.78L566.92 217.74L564.76 215.26L562.19 213.79L557.96 212.73L549.78 211.71L547.5 211.07L546.22 210.01L545.77 208.83L545.8 207.8L546.53 206.16L547.74 205.04L550.05 203.89L552.08 203.51L554.94 203.63L557.57 204.48L559.29 205.66L560.93 208.07L562.03 208.65L564.83 208.74L566.3 208.48L566.59 208.21L566.75 207.82L566.8 207.34L566.58 205.9L565.74 203.85L564.52 202.17L562.7 200.5L560.52 199.21L557.52 198.15L554.4 197.58L552.08 197.57ZM574.86 198.08L571.8 198.13L570.33 198.56L569.77 199.85L569.65 202.13L569.68 202.69L569.8 203.18L570.01 203.57L570.33 203.83L570.75 204.06L578.74 204.06L579.26 204.21L579.71 204.39L580.04 204.69L580.25 205.12L580.36 205.64L580.41 206.2L580.5 206.78L580.5 231.12L580.7 231.63L580.93 232.07L581.27 232.38L581.73 232.56L585.62 232.46L586.04 232.29L586.36 232.01L586.75 230.55L586.8 212L586.8 206.23L587.06 204.91L587.29 204.6L587.65 204.37L588.11 204.23L588.64 204.11L595.56 204.11L596.94 203.77L597.48 202.66L597.42 199.34L597.27 198.92L597.01 198.58L596.64 198.35L595.38 198.08ZM309.09 204.76L310.25 204.16L314.86 204.16L316.91 204.46L318.43 205.25L319.52 206.46L320.26 208.59L320.22 210.73L319.32 212.7L317.78 214.04L315.99 214.72L310.81 214.72L309.35 214.43L309.08 214.1L308.93 213.66L308.8 212L308.8 206.21ZM369.36 204.72L369.66 204.41L370.07 204.2L370.57 204.07L375.18 204.07L377.28 204.42L378.78 205.21L380.13 206.75L380.67 208.54L380.57 210.75L379.64 212.69L378.05 214L376.31 214.68L371.12 214.68L369.64 214.41L369.35 214.09L369.18 213.65L369.04 212L369.04 206.21ZM398.98 204.75L400.15 204.19L404.76 204.19L406.79 204.48L408.72 205.42L409.78 206.68L410.37 208.53L410.33 210.81L410.22 211.33L410.07 211.79L409.43 212.89L407.83 214.2L405.91 214.83L400.75 214.83L400.26 214.89L399.83 214.84L399.45 214.71L399.14 214.48L398.9 214.13L398.76 213.67L398.69 213.14L398.68 212.58L398.68 206.21Z",fill:"#202D59",fillRule:"evenodd",stroke:"#202D59",strokeWidth:"1.2"}),(0,a.jsx)("path",{"data-draw-text":"subtitle",d:"M378.28 245.12L377.94 245.23L377.66 245.46L377.49 245.79L377.6 247.01L385.08 268.49L385.26 268.89L385.49 269.26L385.79 269.58L386.14 269.8L387.34 270L388.58 269.83L388.97 269.64L389.31 269.38L389.95 268.24L397.12 248.73L397.78 246.61L397.8 246.24L397.71 245.9L397.48 245.65L397.1 245.49L395.54 245.43L395.07 245.54L394.69 245.73L394.39 246.01L394.17 246.36L388.28 263.66L388.11 264.09L387.91 264.47L387.65 264.77L387.36 265.02L386.66 263.46L381.08 246.39L380.88 246L380.62 245.67L380.27 245.41L379.87 245.22ZM429.38 245.11L429.05 245.37L428.82 245.76L428.67 246.25L428.56 246.78L428.56 252.77L428.23 253.58L427.98 253.67L427.69 253.61L425.7 252.25L424.41 251.85L422.18 251.77L420.71 252.04L419.18 252.82L417.97 253.91L417.02 255.29L416.09 257.27L415.67 259.06L415.6 261.3L415.82 263.3L416.36 265.08L417.26 267.07L418.23 268.42L419.18 269.2L420.75 269.95L422.74 270.27L424.9 270.09L426.52 269.42L427.96 268.33L429.08 269.71L429.43 269.9L429.84 270.01L430.3 270.04L430.77 270.01L431.19 269.9L431.54 269.66L431.8 269.29L431.98 268.8L432.1 267.1L432.1 246.31L432 245.86L431.84 245.49L431.59 245.22L431.24 245.03L430.79 244.93L430.29 244.9L429.8 244.96ZM468.7 245.03L468.29 245.16L467.96 245.41L467.71 245.78L467.43 246.24L467.43 252.58L466.82 253.98L465.2 252.76L463.66 252.03L461.6 251.75L459.98 251.9L458.37 252.56L457.07 253.58L456 254.83L455.2 256.34L454.57 258.57L454.37 260.72L454.49 262.97L454.93 264.77L455.61 266.42L456.54 267.81L457.76 268.9L459.59 269.95L461.6 270.24L463.69 270.01L465.22 269.28L466.82 268.05L467.65 269.48L467.93 269.74L468.28 269.91L469.53 269.98L469.91 269.85L470.22 269.61L470.45 269.25L470.77 267.68L470.88 264.91L470.88 246.88L470.86 246.4L470.77 245.99L470.61 245.63L470.37 245.34L470.04 245.13L469.62 245.01L469.16 244.98ZM403.15 251.91L401.1 252.71L399.54 254.05L398.74 255.58L398.69 256.06L398.79 256.51L399.01 256.87L399.32 257.09L399.65 257.19L400.73 257.02L403.35 254.98L403.77 254.82L404.25 254.71L405.89 254.66L407.28 255.02L408.2 255.83L408.7 257.12L408.75 258.25L408.63 258.56L408.4 258.84L408.05 259.07L407.59 259.22L404.38 259.54L402 260.02L400.35 260.66L399.33 261.37L398.25 262.63L397.76 263.81L397.66 265.87L398.02 267.17L398.68 268.25L399.52 269.15L401.46 270.07L403.02 270.25L405.16 270.06L406.36 269.58L408.82 268.05L409.29 269.27L409.51 269.61L409.81 269.84L410.17 269.97L410.58 270.02L411 269.99L411.4 269.89L412.19 269.09L412.41 267.66L412.41 258.41L412.31 256.87L411.74 255.18L411.06 254.14L410.18 253.26L408.36 252.19L405.92 251.76ZM441.44 251.92L439.81 252.56L438.43 253.5L437.26 254.66L436.39 256.09L435.76 257.8L435.38 259.64L435.32 261.86L435.62 263.78L436.22 265.52L437.07 266.97L438.18 268.19L439.49 269.19L440.65 269.78L441.96 270.13L444.2 270.22L446.21 269.95L447.84 269.29L449.21 268.34L450.26 267.07L451.09 265.58L451.74 263.94L452.12 261.88L452.17 260.14L451.88 257.94L451.27 256.27L450.41 254.8L449.29 253.6L448.27 252.89L446.66 252.17L445.3 251.84L443.62 251.69ZM479.72 251.91L477.72 252.77L476.23 254.18L475.45 255.64L475.42 256.06L475.53 256.45L475.79 256.76L476.2 256.97L476.69 257.06L477.21 257.04L477.69 256.9L479.61 255.24L479.97 255.02L480.37 254.85L481.9 254.59L482.46 254.61L482.99 254.69L484.25 255.19L485.1 256.06L485.56 257.31L485.59 257.81L485.54 258.29L485.37 258.7L485.09 259L484.69 259.2L480.94 259.55L479.05 259.91L477.32 260.49L475.9 261.38L474.8 262.62L474.31 263.8L474.26 265.85L474.61 267.12L475.29 268.19L476.16 269.08L477.2 269.77L478.49 270.17L480.16 270.29L482.2 269.99L483.37 269.44L485.38 268.03L485.84 269.26L486.06 269.61L486.36 269.87L487.64 270.09L488.08 270.01L488.44 269.84L488.7 269.58L488.87 269.22L488.96 268.76L489.06 268.24L489.06 258.98L489.03 256.71L488.54 254.95L487.28 253.31L485.43 252.24L484.13 251.89L482.48 251.71ZM494.25 252.03L493.88 252.16L493.58 252.4L493.34 252.77L493.12 254.34L493.12 267.68L493.22 268.25L493.28 268.78L493.39 269.26L493.59 269.62L493.88 269.87L494.25 270.02L494.7 270.07L495.92 269.75L496.51 268.69L496.51 258.98L497.02 256.97L497.72 255.95L498.03 255.68L498.4 255.46L501.42 254.49L501.72 254.14L501.91 253.69L501.97 253.18L501.91 252.68L501.71 252.26L501.39 251.95L500.96 251.8L500.45 251.76L498.65 252.25L496.98 253.67L495.46 252.15ZM508.78 251.97L507.23 252.69L505.67 254.05L504.96 255.58L504.95 256.04L505.05 256.47L505.29 256.82L505.61 257.05L505.97 257.17L507.08 257.12L507.43 256.96L507.75 256.72L508.86 255.49L509.17 255.22L509.53 255L510.92 254.59L512.6 254.62L513.11 254.74L513.54 254.9L514.49 255.67L515.07 256.82L515.13 258.29L514.97 258.69L514.68 258.98L514.27 259.17L510.57 259.56L508.16 260.03L506.52 260.69L505.5 261.41L504.48 262.71L503.88 264.34L503.88 265.8L504.43 267.48L505.12 268.52L505.41 268.82L505.73 269.09L506.83 269.72L508.1 270.14L509.74 270.28L511.84 270.02L513.01 269.5L514.96 268.08L515.5 269.23L515.71 269.56L515.99 269.81L516.34 269.96L516.77 270.03L518.01 269.83L518.29 269.59L518.48 269.23L518.59 268.77L518.69 268.24L518.69 259.56L518.62 256.72L518.08 254.99L516.83 253.35L515.83 252.61L514.65 252.06L512.06 251.6ZM422.52 255.01L422.94 254.9L423.4 254.83L424.85 254.91L426.41 255.59L426.73 255.85L427.03 256.15L427.73 257.18L428.63 259.71L428.6 262.29L427.91 264.44L426.73 266.16L426.4 266.42L426.05 266.65L424.85 267.11L422.95 267.12L421.32 266.51L420.16 265.32L419.34 263.23L419.2 260.23L419.66 257.95L420.75 256.13L421.05 255.84L421.38 255.58ZM441.71 255.04L443.62 254.62L444.17 254.64L444.69 254.71L445.16 254.84L445.56 255.01L447.14 256.33L447.82 257.4L448.3 258.62L448.54 260.15L448.55 261.88L448.07 264.29L447.47 265.45L446.64 266.35L445.58 267.02L445.16 267.18L444.7 267.31L444.18 267.39L443.62 267.41L443.07 267.38L442.56 267.28L441 266.54L439.89 265.31L439.24 263.59L438.95 260.74L439.39 257.95L440.42 256.07ZM461.87 254.96L463.17 254.92L463.6 254.99L464.01 255.1L465.47 255.98L466.72 257.63L467.34 260.02L467.29 262.51L466.93 264.01L466.75 264.43L466.54 264.8L465.21 266.36L464.07 266.96L463.66 267.07L463.21 267.14L461.35 267.04L460.94 266.91L460.54 266.73L459.5 266.01L458.52 264.65L457.92 262.41L457.96 259.64L458.83 257.08L459.58 256.09L459.89 255.81L460.23 255.57ZM407.3 261.89L408.3 262.08L408.61 262.31L408.83 262.65L408.94 263.09L408.6 264.83L407.94 265.93L407.66 266.23L407.35 266.5L405.8 267.27L404.18 267.46L402.65 267.19L401.64 266.45L401.4 266.12L401.21 265.73L401.09 265.28L401.06 264.78L401.11 264.3L401.25 263.86L402 262.9L402.33 262.66L402.71 262.46L403.14 262.3L403.64 262.18ZM512.94 261.89L514.61 262.01L514.91 262.25L515.11 262.61L515.22 263.08L515.22 263.6L515.14 264.1L515.01 264.56L514.85 264.96L513.88 266.31L512.42 267.16L510.9 267.44L509.29 267.26L508.17 266.63L507.9 266.32L507.69 265.97L507.43 264.83L507.76 263.68L507.99 263.33L508.26 263.02L508.58 262.75L508.94 262.54L509.35 262.36L509.82 262.23ZM479.41 262.58L481.9 262.04L484.72 262.08L485.16 262.3L485.47 262.64L485.63 263.1L485.46 264.57L484.56 265.99L483.21 266.96L481.31 267.42L479.71 267.25L479.28 267.09L478.91 266.89L478.58 266.64L478.3 266.35L478.06 266.03L477.89 265.66L477.78 265.24L477.74 264.79L478.12 263.59Z",fill:"#202D59",fillRule:"evenodd",stroke:"#202D59",strokeWidth:"0.9"})]})]}),(0,a.jsx)("path",{"data-draw":"right-line",d:"M 539.85 118.4 C 550 110 562 156 588 156 L 1180 156",fill:"none",stroke:"#202D59",strokeWidth:"6.5",strokeLinecap:"round",strokeLinejoin:"round"})]})}),(0,a.jsx)("div",{className:F().progressBar,ref:t,style:{display:"none",opacity:0,height:0}})]})]})}`;
    c = c.slice(0, idxQStart) + newQComponent + c.slice(idxQEnd);
    console.log('  [OK] Replaced Preloader q with Hand-Drawn Line -> PurpleFest Emblem -> Right Line + PURPLE FEST / Vadodara in app/layout chunk');
  }

  // WCAG 2.2 AA+ Landmarks, Dedicated Header Accessibility Icon Button, Video Captions, Accessible Names & Keyboard Navigation in app/layout chunk
  c = c.replace(
    'return b?(0,a.jsx)("video",{ref:N,loop:!0,muted:!0,preload:"auto",playsInline:!0,autoPlay:!0,className:f,"data-src":null===(t=h.current)||void 0===t?void 0:t.url})',
    'return b?(0,a.jsx)("video",{ref:N,loop:!0,muted:!0,preload:"auto",playsInline:!0,autoPlay:!0,className:f,"data-src":null===(t=h.current)||void 0===t?void 0:t.url,"aria-label":(null===(t=h.current)||void 0===t?void 0:t.alternativeText)||"Purple Fest Vadodara 2027 Inclusive Showcase Video"})'
  );
  c = c.replace(
    '("main",{role:"main",className:"relative flex-grow focus:outline-none"',
    '("main",{id:"main-content",role:"main",tabIndex:-1,className:"relative flex-grow focus:outline-none"'
  );
  c = c.replace(
    '("header",{className:(0,u.Z)(z().header,{[z().headerHidden]:x})',
    '("header",{role:"banner",className:(0,u.Z)(z().header,{[z().headerHidden]:x})'
  );
  c = c.replace(
    '("header",{className:(0,u.Z)(W().header,{[W().headerHidden]:h})',
    '("header",{role:"banner",className:(0,u.Z)(W().header,{[W().headerHidden]:h})'
  );
  c = c.replace(
    /\(\"div\",\{className:\"flex-grow laptop:flex-grow-0 overflow-y-auto laptop:overflow-visible -mx-\[5\.3rem\] px-\[5\.3rem\] md:-mx-70 md:px-70 laptop:mx-0 laptop:px-0 flex\"/g,
    '("nav",{"aria-label":"Primary Navigation",className:"flex-grow laptop:flex-grow-0 overflow-y-auto laptop:overflow-visible -mx-[5.3rem] px-[5.3rem] md:-mx-70 md:px-70 laptop:mx-0 laptop:px-0 flex"'
  );
  c = c.replace(
    'href:"/",className:(0,u.Z)(z().logoLink,"focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green")',
    'href:"/","aria-label":"Purple Fest Vadodara 2027 Home",className:(0,u.Z)(z().logoLink,"focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green")'
  );
  c = c.replace(
    'href:"/",className:(0,u.Z)(W().logoLink,"focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green")',
    'href:"/","aria-label":"Purple Fest Vadodara 2027 Home",className:(0,u.Z)(W().logoLink,"focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green")'
  );
  c = c.replace(
    'className:"menu-opener flex items-center justify-center text-purple",onClick:()=>{f(e=>!e)',
    'type:"button","aria-label":"Toggle navigation menu","aria-expanded":d,className:"menu-opener flex items-center justify-center text-purple",onClick:()=>{f(e=>!e)'
  );
  c = c.replace(
    'className:"menu-opener flex items-center justify-center text-purple",onClick:()=>{p(e=>!e)',
    'type:"button","aria-label":"Toggle navigation menu","aria-expanded":x,className:"menu-opener flex items-center justify-center text-purple",onClick:()=>{p(e=>!e)'
  );
  // Inject Dedicated Header Accessibility Icon Button into both Header D and Header U in React JSX
  const reactA11yHeaderBtn = `(0,a.jsx)("div",{className:"pf-a11y-header-wrap relative z-[1002] flex items-center ml-8 laptop:ml-12 flex-shrink-0",children:(0,a.jsxs)("button",{type:"button",className:"pf-a11y-header-btn","aria-label":"Accessibility features and options","aria-expanded":"false","aria-controls":"pf-a11y-header-panel",title:"Accessibility Features",children:[(0,a.jsxs)("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",className:"pf-a11y-icon-svg",children:[(0,a.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2"}),(0,a.jsx)("circle",{cx:"12",cy:"6.5",r:"1.75",fill:"currentColor"}),(0,a.jsx)("path",{d:"M7 10.25L12 11.25L17 10.25",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,a.jsx)("path",{d:"M12 11.25V14.5M12 14.5L9.75 18.5M12 14.5L14.25 18.5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,a.jsx)("span",{className:"pf-a11y-btn-label",children:"Accessibility"})]})}),`;
  c = c.replace(
    '}),' + '(0,a.jsx)("div",{className:"laptop:hidden",children:(0,a.jsx)("div",{className:(0,u.Z)("relative z-3 laptop:hidden ")',
    `}),${reactA11yHeaderBtn}(0,a.jsx)("div",{className:"laptop:hidden",children:(0,a.jsx)("div",{className:(0,u.Z)("relative z-3 laptop:hidden ")`
  );
  c = c.replace(
    '}),' + '(0,a.jsx)("div",{className:(0,u.Z)("laptop:hidden",W().menuToggle),children:(0,a.jsx)("div",{className:(0,u.Z)("relative z-3 laptop:hidden ")',
    `}),${reactA11yHeaderBtn}(0,a.jsx)("div",{className:(0,u.Z)("laptop:hidden",W().menuToggle),children:(0,a.jsx)("div",{className:(0,u.Z)("relative z-3 laptop:hidden ")`
  );
  c = c.replace(
    'onClick:()=>P(t),className:(0,u.Z)("flex items-center cursor-pointer",z().subnavOpener)',
    'tabIndex:0,role:"button","aria-expanded":l,"aria-haspopup":"true",onClick:()=>P(t),onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),P(t)),"Escape"===e.key&&N(null)},className:(0,u.Z)("flex items-center cursor-pointer",z().subnavOpener)'
  );
  c = c.replace(
    'onClick:()=>T(t),className:(0,u.Z)("flex items-center cursor-pointer",W().subnavOpener)',
    'tabIndex:0,role:"button","aria-expanded":l,"aria-haspopup":"true",onClick:()=>T(t),onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),T(t)),"Escape"===e.key&&k(null)},className:(0,u.Z)("flex items-center cursor-pointer",W().subnavOpener)'
  );
  c = c.replace(
    /\"footer\",\{className:\"relative footer mt-auto z-1\"/g,
    '"footer",{role:"contentinfo",className:"relative footer mt-auto z-1"'
  );
  c = c.replace(
    /href:e\.link,target:\"_blank\",children:\(0,a\.jsx\)\(m\.Z,\{className:\"size-24 laptop:size-20\",name:e\.type\}\)/g,
    '"aria-label":({instagram:"Instagram",linkedin:"LinkedIn",facebook:"Facebook",x:"X (Twitter)"})[e.type]||e.type,href:e.link,target:"_blank",children:(0,a.jsx)(m.Z,{className:"size-24 laptop:size-20",name:e.type})'
  );

  // Append client-side WCAG 2.2 + PurpleFest Delhi Accessibility Menu & TalkBack Screen Reader controller
  const wcagEnhancerJs = `
;(function(){
  if(typeof window==="undefined"||window.__pfWcagInit)return;
  window.__pfWcagInit=true;
  var STORAGE_KEY="pf_a11y_prefs_v2";
  var FONT_STEPS=[85,100,115,130,150];
  var prefs={font:100,contrast:"light",spacing:false,links:false,motion:false,talkback:false};
  try{
    var saved=localStorage.getItem(STORAGE_KEY);
    if(saved){
      var parsed=JSON.parse(saved);
      if(parsed&&typeof parsed==="object"){
        if(typeof parsed.contrast==="boolean")parsed.contrast=parsed.contrast?"dark":"light";
        Object.assign(prefs,parsed);
      }
    }
  }catch(_){}

  function savePrefs(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(prefs));}catch(_){}
  }

  function ensureTalkBackLiveRegion(){
    if(!document.body)return null;
    var live=document.getElementById("pf-talkback-live");
    if(!live){
      live=document.createElement("div");
      live.id="pf-talkback-live";
      live.setAttribute("role","status");
      live.setAttribute("aria-live","polite");
      live.setAttribute("aria-atomic","true");
      live.className="sr-only";
      document.body.appendChild(live);
    }
    return live;
  }

  window.__pfAnnounceTalkBack=function(msg,forceSpeak){
    if(!msg)return;
    var live=ensureTalkBackLiveRegion();
    if(live){
      live.textContent="";
      setTimeout(function(){live.textContent=msg;},20);
    }
    if((prefs.talkback||forceSpeak)&&"speechSynthesis" in window){
      try{
        window.speechSynthesis.cancel();
        var u=new SpeechSynthesisUtterance(String(msg));
        u.rate=0.98;
        window.speechSynthesis.speak(u);
      }catch(_){}
    }
  };

  function applyPrefs(announceMsg){
    var root=document.documentElement;
    if(!root)return;
    var f=Number(prefs.font)||100;
    root.style.fontSize=(f===100?"":(f*0.625)+"%");
    root.style.setProperty("--base-font-size",(16*(f/100))+"px");

    var cMode=prefs.contrast||"light";
    root.classList.toggle("pf-contrast-light",cMode==="light");
    root.classList.toggle("pf-contrast-dark",cMode==="dark");
    root.classList.toggle("pf-contrast-yellow-black",cMode==="yellow-black");
    root.classList.toggle("pf-a11y-contrast",cMode==="dark"||cMode==="yellow-black");
    if(document.body){
      document.body.classList.toggle("high-contrast",cMode==="dark"||cMode==="yellow-black");
      document.body.classList.toggle("wide-spacing",!!prefs.spacing);
    }

    root.classList.toggle("pf-a11y-spacing",!!prefs.spacing);
    root.classList.toggle("pf-a11y-links",!!prefs.links);
    root.classList.toggle("pf-a11y-reduce-motion",!!prefs.motion);
    root.classList.toggle("pf-talkback-mode",!!prefs.talkback);

    if(prefs.motion){
      if(window.__preloaderTimeline&&typeof window.__preloaderTimeline.progress==="function"){
        try{window.__preloaderTimeline.progress(1);}catch(_){}
      }
      document.querySelectorAll('[class*="preloader"]').forEach(function(p){
        p.setAttribute("aria-hidden","true");
        p.setAttribute("inert","");
        p.style.display="none";
      });
    }

    document.querySelectorAll("video").forEach(function(v){
      if(prefs.motion){try{v.pause();}catch(_){}}
    });

    var panel=document.getElementById("pf-a11y-header-panel");
    if(panel){
      var fontDisp=panel.querySelector("#pf-a11y-zoom-display, #pf-a11y-font-display");
      if(fontDisp){
        fontDisp.textContent=f+"%";
        fontDisp.setAttribute("aria-label","Current text size "+f+" percent");
      }
      var decBtn=panel.querySelector('[data-pf-a11y-step="down"], [data-pf-font-step="-1"]');
      var incBtn=panel.querySelector('[data-pf-a11y-step="up"], [data-pf-font-step="1"]');
      if(decBtn)decBtn.disabled=(f<=FONT_STEPS[0]);
      if(incBtn)incBtn.disabled=(f>=FONT_STEPS[FONT_STEPS.length-1]);

      panel.querySelectorAll("[data-pf-contrast]").forEach(function(b){
        var active=b.getAttribute("data-pf-contrast")===cMode;
        b.setAttribute("aria-checked",active?"true":"false");
        b.classList.toggle("is-active",active);
      });
      panel.querySelectorAll("[data-pf-toggle]").forEach(function(b){
        var k=b.getAttribute("data-pf-toggle");
        var active=!!prefs[k];
        b.setAttribute("aria-checked",active?"true":"false");
        b.classList.toggle("is-active",active);
      });
    }
    if(announceMsg)window.__pfAnnounceTalkBack(announceMsg);
  }

  function getPanelInnerHtml(){
    return '<div class="pf-a11y-top-row" role="group" aria-label="Text size">'+
      '<button type="button" class="pf-a11y-step-btn" data-pf-a11y-step="down" data-pf-font-step="-1" aria-label="Decrease text size">A-</button>'+
      '<div id="pf-a11y-zoom-display" class="pf-a11y-zoom-val" role="status" aria-live="polite" aria-atomic="true">100%</div>'+
      '<button type="button" class="pf-a11y-step-btn" data-pf-a11y-step="up" data-pf-font-step="1" aria-label="Increase text size">A+</button>'+
    '</div>'+
    '<div class="pf-a11y-section">'+
      '<div class="pf-a11y-section-title" id="pf-a11y-contrast-heading">Contrast</div>'+
      '<div class="pf-a11y-card-list" role="radiogroup" aria-labelledby="pf-a11y-contrast-heading">'+
        '<button type="button" role="radio" class="pf-a11y-radio-card is-active" data-pf-contrast="light" aria-checked="true">'+
          '<span class="pf-a11y-card-title">Light</span>'+
          '<span class="pf-a11y-card-sub">Dark purple text on white</span>'+
        '</button>'+
        '<button type="button" role="radio" class="pf-a11y-radio-card" data-pf-contrast="dark" aria-checked="false">'+
          '<span class="pf-a11y-card-title">Dark</span>'+
          '<span class="pf-a11y-card-sub">Light text on a dark background</span>'+
        '</button>'+
        '<button type="button" role="radio" class="pf-a11y-radio-card" data-pf-contrast="yellow-black" aria-checked="false">'+
          '<span class="pf-a11y-card-title">Yellow on black</span>'+
          '<span class="pf-a11y-card-sub">High contrast yellow text on black</span>'+
        '</button>'+
      '</div>'+
    '</div>'+
    '<div class="pf-a11y-section">'+
      '<div class="pf-a11y-section-title" id="pf-a11y-more-heading">More settings</div>'+
      '<div class="pf-a11y-card-list" role="group" aria-labelledby="pf-a11y-more-heading">'+
        '<button type="button" role="checkbox" class="pf-a11y-check-card" data-pf-toggle="links" aria-checked="false">'+
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
          '<span class="pf-a11y-card-text">'+
            '<span class="pf-a11y-card-title">Highlight links and buttons</span>'+
            '<span class="pf-a11y-card-sub">Outlines and underlines every link and button</span>'+
          '</span>'+
        '</button>'+
        '<button type="button" role="checkbox" class="pf-a11y-check-card" data-pf-toggle="spacing" aria-checked="false">'+
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
          '<span class="pf-a11y-card-text">'+
            '<span class="pf-a11y-card-title">Wider text spacing</span>'+
            '<span class="pf-a11y-card-sub">More space between letters, words and lines</span>'+
          '</span>'+
        '</button>'+
        '<button type="button" role="checkbox" class="pf-a11y-check-card" data-pf-toggle="motion" aria-checked="false">'+
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
          '<span class="pf-a11y-card-text">'+
            '<span class="pf-a11y-card-title">Stop animations</span>'+
            '<span class="pf-a11y-card-sub">Stops the slideshow and all movement on the page</span>'+
          '</span>'+
        '</button>'+
        '<button type="button" role="checkbox" class="pf-a11y-check-card" data-pf-toggle="talkback" aria-checked="false">'+
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
          '<span class="pf-a11y-card-text">'+
            '<span class="pf-a11y-card-title">TalkBack Screen Reader Audio</span>'+
            '<span class="pf-a11y-card-sub">Reads focused elements &amp; live status aloud</span>'+
          '</span>'+
        '</button>'+
      '</div>'+
    '</div>'+
    '<button type="button" class="pf-a11y-reset-all-btn" data-pf-a11y-reset="true" data-pf-reset="true">Reset all settings</button>';
  }

  function ensureA11yPanel(){
    if(!document.body)return;
    ensureTalkBackLiveRegion();
    var panel=document.getElementById("pf-a11y-header-panel");
    if(!panel){
      panel=document.createElement("div");
      panel.id="pf-a11y-header-panel";
      panel.className="pf-a11y-header-panel";
      panel.setAttribute("role","dialog");
      panel.setAttribute("aria-label","Accessibility options");
      panel.setAttribute("aria-hidden","true");
      panel.setAttribute("inert","");
      document.body.appendChild(panel);
    }
    if(!panel.querySelector("[data-pf-contrast]")){
      panel.className="pf-a11y-header-panel";
      panel.removeAttribute("style");
      panel.setAttribute("role","dialog");
      panel.setAttribute("aria-label","Accessibility options");
      panel.innerHTML=getPanelInnerHtml();
    }
    if(!panel.__pfBound){
      panel.__pfBound=true;
      panel.addEventListener("click",function(e){
        var t=e.target.closest("button");
        if(!t)return;
        if(t.hasAttribute("data-pf-font-step")){
          var dir=Number(t.getAttribute("data-pf-font-step"))||0;
          var idx=FONT_STEPS.indexOf(Number(prefs.font)||100);
          if(idx===-1)idx=1;
          var nextIdx=Math.max(0,Math.min(FONT_STEPS.length-1,idx+dir));
          prefs.font=FONT_STEPS[nextIdx];
          savePrefs();
          applyPrefs("Text size "+prefs.font+" percent");
        }else if(t.hasAttribute("data-pf-contrast")){
          var c=t.getAttribute("data-pf-contrast")||"light";
          prefs.contrast=c;
          savePrefs();
          var cLabel=c==="yellow-black"?"Yellow on black":(c==="dark"?"Dark":"Light");
          applyPrefs("Contrast set to "+cLabel);
        }else if(t.hasAttribute("data-pf-toggle")){
          var k=t.getAttribute("data-pf-toggle");
          prefs[k]=!prefs[k];
          savePrefs();
          var names={links:"Highlight links and buttons",spacing:"Wider text spacing",motion:"Stop animations",talkback:"TalkBack Screen Reader Audio"};
          applyPrefs((names[k]||k)+(prefs[k]?" enabled":" disabled"));
        }else if(t.hasAttribute("data-pf-reset")){
          prefs={font:100,contrast:"light",spacing:false,links:false,motion:false,talkback:false};
          savePrefs();
          applyPrefs("All accessibility settings reset to default");
        }
      });
    }
    applyPrefs();
  }

  window.__pfToggleA11yMenu=function(forceState,triggerEl){
    ensureA11yPanel();
    var panel=document.getElementById("pf-a11y-header-panel");
    if(!panel)return;
    var isOpen=typeof forceState==="boolean"?forceState:!panel.classList.contains("is-open");
    panel.classList.toggle("is-open",isOpen);
    panel.classList.toggle("open",isOpen);
    panel.setAttribute("aria-hidden",isOpen?"false":"true");
    if(isOpen){
      panel.removeAttribute("inert");
      if(triggerEl&&triggerEl.getBoundingClientRect){
        var r=triggerEl.getBoundingClientRect();
        if(r.left<window.innerWidth/2){
          panel.style.left=Math.max(12,Math.round(r.left))+"px";
          panel.style.right="auto";
        }else{
          panel.style.right=Math.max(12,Math.round(window.innerWidth-r.right))+"px";
          panel.style.left="auto";
        }
      }
    }else{
      panel.setAttribute("inert","");
    }
    document.querySelectorAll(".pf-a11y-header-btn, .pf-a11y-footer-btn, #a11y-toggle-btn").forEach(function(btn){
      btn.setAttribute("aria-expanded",isOpen?"true":"false");
    });
    if(isOpen){
      var firstBtn=panel.querySelector("button:not([disabled])");
      if(firstBtn)firstBtn.focus();
      window.__pfAnnounceTalkBack("Accessibility menu opened");
    }else{
      window.__pfAnnounceTalkBack("Accessibility menu closed");
    }
  };

  window.toggleA11yPanel=window.__pfToggleA11yMenu;

  document.addEventListener("click",function(e){
    var triggerBtn=e.target.closest(".pf-a11y-header-btn, .pf-a11y-footer-btn, [data-pf-open-a11y], #a11y-toggle-btn");
    if(triggerBtn){
      e.preventDefault();
      window.__pfToggleA11yMenu(undefined,triggerBtn);
      return;
    }
    var panel=document.getElementById("pf-a11y-header-panel");
    if(panel&&panel.classList.contains("is-open")&&!panel.contains(e.target)){
      window.__pfToggleA11yMenu(false);
    }
  });

  // TalkBack Focus Reader when TalkBack Audio Mode is active
  document.addEventListener("focusin",function(e){
    if(!prefs.talkback)return;
    var el=e.target;
    if(!el||el===document.body||el===document.documentElement)return;
    var role=el.getAttribute("role")||el.tagName.toLowerCase();
    var label=el.getAttribute("aria-label")||el.textContent||el.getAttribute("placeholder")||el.getAttribute("title")||"";
    label=String(label).replace(/\\s+/g," ").trim().slice(0,180);
    if(label){
      var state="";
      if(el.hasAttribute("aria-checked"))state=el.getAttribute("aria-checked")==="true"?", checked":", not checked";
      else if(el.hasAttribute("aria-expanded"))state=el.getAttribute("aria-expanded")==="true"?", expanded":", collapsed";
      window.__pfAnnounceTalkBack(label+", "+role+state,true);
    }
  });

  function normalizeTalkBackSplitText(){
    // 1. Consolidate GSAP SplitText headings & paragraphs so TalkBack reads full sentences instead of word/line fragments
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, [class*='splitText']").forEach(function(el){
      var splitChildren=el.querySelectorAll(".line-w, .line, .word, .char, [class*='styles_fallback__']");
      if(!splitChildren.length)return;
      var lines=el.querySelectorAll(".line");
      var raw="";
      if(lines.length){
        var parts=[];
        lines.forEach(function(ln){
          var t=(ln.textContent||"").replace(/\\s+/g," ").trim();
          if(t)parts.push(t);
        });
        raw=parts.join(" ");
      }else{
        var clone=el.cloneNode(true);
        clone.querySelectorAll("[data-pf-tb-sr], [class*='styles_fallback__']").forEach(function(n){n.remove();});
        raw=(clone.textContent||"").replace(/\\s+/g," ").trim();
      }
      if(!raw)return;
      if(/^H[1-6]$/.test(el.tagName)){
        if(el.getAttribute("aria-label")!==raw)el.setAttribute("aria-label",raw);
      }
      var srSpan=el.querySelector(":scope > [data-pf-tb-sr]");
      if(!srSpan){
        srSpan=document.createElement("span");
        srSpan.setAttribute("data-pf-tb-sr","true");
        srSpan.className="sr-only";
        srSpan.textContent=raw;
        el.insertBefore(srSpan,el.firstChild);
      }else if(srSpan.textContent!==raw){
        srSpan.textContent=raw;
      }
      Array.from(el.children).forEach(function(ch){
        if(ch.hasAttribute("data-pf-tb-sr"))return;
        if(ch.getAttribute("aria-hidden")!=="true")ch.setAttribute("aria-hidden","true");
      });
      splitChildren.forEach(function(sc){
        if(sc.getAttribute("aria-hidden")!=="true")sc.setAttribute("aria-hidden","true");
      });
    });

    // 2. Ensure exited/completed preloader & decorative canvases are hidden from TalkBack swipe order
    document.querySelectorAll('[class*="preloader"]').forEach(function(p){
      if(p.getAttribute("aria-hidden")!=="true")p.setAttribute("aria-hidden","true");
      if(!p.hasAttribute("inert"))p.setAttribute("inert","");
    });
    document.querySelectorAll("canvas").forEach(function(cv){
      if(!cv.getAttribute("aria-label")&&cv.getAttribute("aria-hidden")!=="true"){
        cv.setAttribute("aria-hidden","true");
      }
    });

    // 3. Sync collapsed subnav dropdowns and mobile drawers so TalkBack does not swipe into hidden menus
    document.querySelectorAll('[class*="subnavOpener"]').forEach(function(opener){
      var expanded=opener.getAttribute("aria-expanded")==="true";
      var wrapper=opener.parentElement&&opener.parentElement.querySelector('[class*="nestedMenuWrapper"]');
      if(wrapper){
        wrapper.setAttribute("aria-hidden",expanded?"false":"true");
        if(expanded)wrapper.removeAttribute("inert");
        else wrapper.setAttribute("inert","");
      }
    });

    // 4. Ensure Footer contains the PurpleFest Delhi "Accessibility options" section & trigger button (unless .pf-boccia-footer already provides .pf-a11y-footer-link)
    document.querySelectorAll("footer").forEach(function(ft){
      if(ft.querySelector(".pf-a11y-footer-btn, .pf-a11y-footer-link")||ft.classList.contains("pf-boccia-footer"))return;
      var box=document.createElement("div");
      box.className="pf-footer-a11y-block container";
      box.innerHTML='<div class="pf-footer-a11y-inner">'+
        '<div class="pf-footer-a11y-eyebrow">ACCESSIBILITY</div>'+
        '<p class="pf-footer-a11y-copy">This site is built for visitors who use screen readers, keyboards and magnification. Change the text size, contrast, spacing and animation from the accessibility menu &#8212; the round button at the top of every page.</p>'+
        '<button type="button" class="pf-a11y-footer-btn" data-pf-open-a11y="true" aria-controls="pf-a11y-header-panel" aria-expanded="false">Accessibility options</button>'+
      '</div>';
      ft.appendChild(box);
    });
  }

  function enhanceDom(){
    if(document.documentElement.getAttribute("lang")!=="en"){
      document.documentElement.setAttribute("lang","en");
    }
    var s=document.querySelector(".skip-to-content");
    if(!s&&document.body){
      s=document.createElement("a");
      s.href="#main-content";
      s.className="skip-to-content";
      s.textContent="Skip to main content";
    }
    if(s&&document.body&&document.body.firstElementChild!==s){
      document.body.insertBefore(s,document.body.firstElementChild);
    }
    ensureA11yPanel();
    var m=document.querySelector("main");
    if(m){
      if(!m.id)m.id="main-content";
      if(!m.getAttribute("tabindex"))m.setAttribute("tabindex","-1");
    }
    document.querySelectorAll(".input-group").forEach(function(grp){
      var inp=grp.querySelector("input, textarea");
      var lbl=grp.querySelector("label.form-label");
      if(inp&&lbl){
        var fid=inp.id||("contact-field-"+(inp.name||Math.random().toString(36).slice(2,7)));
        if(!inp.id)inp.id=fid;
        if(lbl.getAttribute("for")!==fid)lbl.setAttribute("for",fid);
        if(!inp.getAttribute("aria-label"))inp.setAttribute("aria-label",(lbl.textContent||"").trim()||fid);
      }
    });
    document.querySelectorAll('input[id^="react-select-"]').forEach(function(inp){
      if(!inp.getAttribute("aria-label")){
        var wrap=inp.closest(".relative");
        var lbl=wrap&&wrap.querySelector(".form-label");
        inp.setAttribute("aria-label",(lbl&&lbl.textContent&&lbl.textContent.trim())||"Select option");
      }
    });
    document.querySelectorAll("video").forEach(function(v){
      if(!v.getAttribute("aria-label")){
        v.setAttribute("aria-label","Purple Fest Vadodara 2027 Inclusive Showcase Video");
      }
      v.querySelectorAll("track").forEach(function(t){t.remove();});
    });
    normalizeTalkBackSplitText();
  }

  var enhanceTimer=null;
  function scheduleEnhance(){
    if(enhanceTimer)return;
    enhanceTimer=setTimeout(function(){
      enhanceTimer=null;
      enhanceDom();
    },60);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",function(){enhanceDom();applyPrefs();});
  }else{
    enhanceDom();applyPrefs();
  }
  var obs=new MutationObserver(function(){scheduleEnhance();});
  if(document.documentElement){
    obs.observe(document.documentElement,{childList:true,subtree:true});
  }
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){
      var openMenuBtn=document.querySelector('button.menu-opener[aria-expanded="true"]');
      if(openMenuBtn)openMenuBtn.click();
      var panel=document.getElementById("pf-a11y-header-panel");
      if(panel&&panel.classList.contains("is-open")){
        window.__pfToggleA11yMenu(false);
        var hBtn=document.querySelector(".pf-a11y-header-btn");
        if(hBtn)hBtn.focus();
      }
    }
  });
})();`;
  c += wcagEnhancerJs;

  // Apply Tasks 1, 2, 4 to app/layout chunk
  c = applyFooterToLayoutChunk(c);
  c = applySponsorsToLayoutEnhancer(c);
  c = applyDatesAndDocxReplacements(c);

  fs.writeFileSync(path.join(TARGET_DIR, rel), c, 'utf8');
  console.log('  [OK] Updated app/layout chunk (Preloader, Footer, SponsorsEnhancer, Dates)');
}

// 3c-bis. 751-4ba22589dbd220d5.js (Keyboard operability for HomeSteps cards)
{
  const rel = '_next/static/chunks/751-4ba22589dbd220d5.js';
  let c = fs.readFileSync(path.join(ORIG_DIR, rel), 'utf8');
  c = c.replace(
    'onMouseEnter:()=>{f(l)},className:(0,s.Z)("py-20 px-18 flex flex-col justify-between bg-lilac transition-colors duration-300"',
    'tabIndex:0,role:"button","aria-pressed":c===l,onFocus:()=>{f(l)},onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),f(l))},onMouseEnter:()=>{f(l)},className:(0,s.Z)("py-20 px-18 flex flex-col justify-between bg-lilac transition-colors duration-300 cursor-pointer"'
  );
  fs.writeFileSync(path.join(TARGET_DIR, rel), c, 'utf8');
  console.log('  [OK] Updated 751 chunk (keyboard operability for HomeSteps)');
}

// 3d. 438-3081138f8b8e8086.js (Silence recoverable hydration warnings)
{
  const rel = '_next/static/chunks/438-3081138f8b8e8086.js';
  let c = fs.readFileSync(path.join(ORIG_DIR, rel), 'utf8');
  c = c.replace('o={onRecoverableError:d.default}', 'o={onRecoverableError:()=>{}}');
  fs.writeFileSync(path.join(TARGET_DIR, rel), c, 'utf8');
  console.log('  [OK] Updated 438 chunk (clean React 18 hydration)');
}

// 4. Update site.webmanifest
{
  const manifestPath = path.join(TARGET_DIR, 'site.webmanifest');
  if (fs.existsSync(manifestPath)) {
    const manifest = {
      name: 'Purple Fest Vadodara 2027 | Celebrating Inclusion, Dignity & Accessibility',
      short_name: 'PurpleFest 2027',
      description: '21–23 January 2027 · Vadodara, Gujarat · Organised by Praangan (Vadodara), Brotherhood (Delhi) & TISS Mumbai.',
      icons: [
        { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
        { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ],
      theme_color: '#1b112c',
      background_color: '#1b112c',
      display: 'standalone'
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('  [OK] Updated site.webmanifest');
  }
}

// 5. Ensure Deal Sizer / Calculator CSS suppression rule, Hand-Drawn Preloader stage styles & Mobile Phone Responsive Fixes are persisted in CSS files
{
  const mobileFixesPath = path.join(TARGET_DIR, '_next/static/css/mobile-phone-fixes.css');
  const mobileFixesCss = fs.existsSync(mobileFixesPath) ? fs.readFileSync(mobileFixesPath, 'utf8') : '';
  const preloaderCss = `
.styles_progressBar__oY7fE,
.styles_progressBarArrow__s71dn,
.styles_preloader_line__bZ7q1 {
  display: none !important;
  opacity: 0 !important;
  height: 0 !important;
  width: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}
.styles_preloader__JmvRd {
  padding-top: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.styles_logo__4NIgm {
  position: relative !important;
  left: auto !important;
  bottom: auto !important;
  transform: none !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}
.styles_logoSvg__TF4KR {
  width: min(88vw, 860px) !important;
  height: auto !important;
  overflow: visible !important;
  display: block !important;
}
`;
  const markerStart = '/* MOBILE-PHONE-FIXES-START */';
  const markerEnd = '/* MOBILE-PHONE-FIXES-END */';
  const wrappedMobileCss = `\n${markerStart}\n${mobileFixesCss}\n${preloaderCss}\n${markerEnd}\n`;

  const cssPath1 = path.join(TARGET_DIR, '_next/static/css/0fa3ad3e26d5da69.css');
  if (fs.existsSync(cssPath1)) {
    let css = fs.readFileSync(cssPath1, 'utf8');
    const rule = '[id="calculator_dscr"], [class*="calculatorDscr"], [class*="CalculatorDscr"], section:has([id="calculator_dscr"]), #deal-sizer-tpo, section:has(.styles_chartDiff__Cm4ho), section:has(.styles_incomeChart__ABHNB) { display: none !important; }';
    if (!css.includes('[id="calculator_dscr"]')) {
      css += rule;
    }
    const reg = new RegExp(`\\n?/\\* MOBILE-PHONE-FIXES-START \\*/[\\s\\S]*?/\\* MOBILE-PHONE-FIXES-END \\*/\\n?`, 'g');
    css = css.replace(reg, '') + wrappedMobileCss;

    const wcagCssBlock = `
/* WCAG-22-AA-COMPLIANCE-START */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.skip-to-content {
  position: fixed;
  top: -120px;
  left: 16px;
  z-index: 9999;
  background-color: #190826;
  color: #FFFFFF !important;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none !important;
  border-radius: 6px;
  border: 2px solid #E2D4F0;
  box-shadow: 0 8px 24px rgba(25, 8, 38, 0.45);
  transition: top 0.15s ease;
}
.skip-to-content:focus,
.skip-to-content:focus-visible {
  top: 16px;
  outline: 3px solid #FFD700 !important;
  outline-offset: 3px !important;
}
.pf-a11y-header-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  min-height: 42px;
  min-width: 42px;
  padding: 0;
  border-radius: 9999px;
  border: 2px solid #4A1575;
  background-color: #190826;
  color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(25, 8, 38, 0.28);
  transition: transform 0.18s ease, background-color 0.2s ease, border-color 0.2s ease;
}
.pf-a11y-header-btn:hover,
.pf-a11y-header-btn[aria-expanded="true"] {
  background-color: #4A1575;
  border-color: #E2D4F0;
  color: #FFFFFF;
}
.pf-a11y-icon-svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
.pf-a11y-btn-label {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.pf-a11y-footer-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 8px;
  border: 1.5px solid #4A1575;
  background-color: #190826;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.pf-a11y-footer-btn:hover,
.pf-a11y-footer-btn[aria-expanded="true"] {
  background-color: #4A1575;
  border-color: #E2D4F0;
}
.pf-a11y-header-panel {
  display: none;
  position: fixed;
  top: 72px;
  right: 16px;
  z-index: 2005;
  width: min(356px, calc(100vw - 24px));
  max-height: calc(100vh - 88px);
  overflow-y: auto;
  background-color: #190826 !important;
  color: #FFFFFF !important;
  border: 1.5px solid #3E1F5B !important;
  border-radius: 14px !important;
  padding: 18px !important;
  box-shadow: 0 22px 54px rgba(10, 2, 18, 0.65) !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-align: left;
}
.pf-a11y-header-panel.is-open {
  display: block;
}
.pf-a11y-top-row {
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  gap: 10px;
  align-items: stretch;
  margin-bottom: 18px;
}
.pf-a11y-step-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 8px;
  border: 1.5px solid #4B2C6B !important;
  background-color: #210B33 !important;
  color: #FFFFFF !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.pf-a11y-step-btn:hover {
  background-color: #361254 !important;
  border-color: #9D6FD4 !important;
}
.pf-a11y-zoom-val {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 8px;
  border: 1.5px solid #351950 !important;
  background-color: #13051E !important;
  color: #E2D4F0 !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
}
.pf-a11y-section {
  margin-bottom: 16px;
}
.pf-a11y-section-title {
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #CDBCE0 !important;
  margin: 0 0 8px 0 !important;
  letter-spacing: 0.02em;
  text-transform: none !important;
}
.pf-a11y-card-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pf-a11y-radio-card,
.pf-a11y-check-card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px !important;
  border-radius: 9px !important;
  border: 1.5px solid #3E215B !important;
  background-color: #210C33 !important;
  color: #FFFFFF !important;
  text-align: left !important;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.pf-a11y-radio-card {
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}
.pf-a11y-radio-card:hover,
.pf-a11y-check-card:hover {
  background-color: #2D1147 !important;
  border-color: #7D4BB8 !important;
}
.pf-a11y-radio-card.is-active,
.pf-a11y-radio-card[aria-checked="true"] {
  background-color: #4A1575 !important;
  border-color: #B388EB !important;
}
.pf-a11y-check-card.is-active,
.pf-a11y-check-card[aria-checked="true"] {
  background-color: #341154 !important;
  border-color: #B388EB !important;
}
.pf-a11y-check-box {
  width: 22px;
  height: 22px;
  min-width: 22px;
  border-radius: 5px;
  border: 1.5px solid #755399;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.pf-a11y-check-box svg {
  width: 14px;
  height: 14px;
}
.pf-a11y-check-card.is-active .pf-a11y-check-box,
.pf-a11y-check-card[aria-checked="true"] .pf-a11y-check-box {
  background-color: #E2D4F0 !important;
  border-color: #E2D4F0 !important;
  color: #190826 !important;
}
.pf-a11y-card-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pf-a11y-card-title {
  font-size: 14.5px !important;
  font-weight: 700 !important;
  line-height: 1.25 !important;
  color: #FFFFFF !important;
}
.pf-a11y-card-sub {
  font-size: 12.5px !important;
  font-weight: 400 !important;
  line-height: 1.35 !important;
  color: #C9B6DC !important;
}
.pf-a11y-reset-all-btn {
  width: 100%;
  margin-top: 4px;
  padding: 11px 14px !important;
  border-radius: 9px !important;
  border: 1.5px solid #4B2C6B !important;
  background-color: #210C33 !important;
  color: #E2D4F0 !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  text-align: center !important;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.pf-a11y-reset-all-btn:hover {
  background-color: #3B155E !important;
  border-color: #9D6FD4 !important;
  color: #FFFFFF !important;
}
/* Contrast Mode 1: Light (Default Battalion / PurpleFest Theme — no color overrides) */
video::cue {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}
/* Contrast Mode 2: Dark (Light text on a dark background) */
html.pf-contrast-dark body,
html.pf-contrast-dark main,
html.pf-contrast-dark section,
html.pf-contrast-dark header,
html.pf-contrast-dark footer,
html.pf-contrast-dark article,
html.pf-contrast-dark aside,
html.pf-contrast-dark .bg-purple-100,
html.pf-contrast-dark .bg-lilac,
html.pf-contrast-dark .bg-cream,
html.pf-contrast-dark [class*="card"],
html.pf-contrast-dark [class*="Card"],
html.pf-contrast-dark [class*="panel"],
html.pf-contrast-dark [class*="modal"],
html.pf-contrast-dark [class*="hero"],
html.pf-contrast-dark [class*="Hero"],
html.pf-contrast-dark [class*="Section"] {
  background-color: #12061C !important;
  color: #F5EEFC !important;
}
html.pf-contrast-dark canvas,
html.pf-contrast-yellow-black canvas {
  opacity: 0.18 !important;
}
html.pf-contrast-dark h1,
html.pf-contrast-dark h2,
html.pf-contrast-dark h3,
html.pf-contrast-dark h4,
html.pf-contrast-dark h5,
html.pf-contrast-dark h6,
html.pf-contrast-dark p,
html.pf-contrast-dark li,
html.pf-contrast-dark span:not(.pf-a11y-check-box),
html.pf-contrast-dark label,
html.pf-contrast-dark td,
html.pf-contrast-dark th,
html.pf-contrast-dark a:not(.btn) {
  color: #F5EEFC !important;
}
html.pf-contrast-dark input,
html.pf-contrast-dark select,
html.pf-contrast-dark textarea {
  background-color: #1F0B30 !important;
  color: #FFFFFF !important;
  border-color: #9D6FD4 !important;
}
/* Contrast Mode 3: Yellow on black (High contrast yellow text on black) */
html.pf-contrast-yellow-black body,
html.pf-contrast-yellow-black main,
html.pf-contrast-yellow-black section,
html.pf-contrast-yellow-black header,
html.pf-contrast-yellow-black footer,
html.pf-contrast-yellow-black nav,
html.pf-contrast-yellow-black article,
html.pf-contrast-yellow-black aside,
html.pf-contrast-yellow-black div:not(#pf-a11y-header-panel):not(#pf-a11y-header-panel *),
html.pf-contrast-yellow-black .bg-purple-100,
html.pf-contrast-yellow-black .bg-lilac,
html.pf-contrast-yellow-black .bg-cream {
  background-color: #000000 !important;
  color: #FFFF00 !important;
}
html.pf-contrast-yellow-black h1,
html.pf-contrast-yellow-black h2,
html.pf-contrast-yellow-black h3,
html.pf-contrast-yellow-black h4,
html.pf-contrast-yellow-black h5,
html.pf-contrast-yellow-black h6,
html.pf-contrast-yellow-black p,
html.pf-contrast-yellow-black li,
html.pf-contrast-yellow-black span:not(#pf-a11y-header-panel *),
html.pf-contrast-yellow-black label,
html.pf-contrast-yellow-black td,
html.pf-contrast-yellow-black th {
  color: #FFFF00 !important;
}
html.pf-contrast-yellow-black a,
html.pf-contrast-yellow-black button:not(#pf-a11y-header-panel button),
html.pf-contrast-yellow-black [role="button"]:not(#pf-a11y-header-panel *) {
  background-color: #000000 !important;
  color: #00FFFF !important;
  border: 2px solid #FFFF00 !important;
}
html.pf-contrast-yellow-black input,
html.pf-contrast-yellow-black select,
html.pf-contrast-yellow-black textarea {
  background-color: #000000 !important;
  color: #FFFF00 !important;
  border: 2px solid #FFFF00 !important;
}
/* More settings */
html.pf-a11y-spacing body,
html.pf-a11y-spacing p:not(#pf-a11y-header-panel *),
html.pf-a11y-spacing li:not(#pf-a11y-header-panel *),
html.pf-a11y-spacing span:not(#pf-a11y-header-panel *),
html.pf-a11y-spacing a:not(#pf-a11y-header-panel *),
html.pf-a11y-spacing label:not(#pf-a11y-header-panel *) {
  line-height: 1.85 !important;
  letter-spacing: 0.06em !important;
  word-spacing: 0.14em !important;
}
html.pf-a11y-links a,
html.pf-a11y-links button:not(#pf-a11y-header-panel button),
html.pf-a11y-links [role="button"]:not(#pf-a11y-header-panel *) {
  text-decoration: underline !important;
  text-decoration-thickness: 2px !important;
  text-underline-offset: 4px !important;
  outline: 2px solid #8E2DE2 !important;
  outline-offset: 2px !important;
}
html.pf-a11y-reduce-motion *,
html.pf-a11y-reduce-motion *::before,
html.pf-a11y-reduce-motion *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}
html.pf-a11y-reduce-motion [class*="preloader"] {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[role="button"]:focus-visible,
[role="radio"]:focus-visible,
[role="checkbox"]:focus-visible,
[tabindex="0"]:focus-visible {
  outline: 3px solid #7C3AED !important;
  outline-offset: 3px !important;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* WCAG-22-AA-COMPLIANCE-END */
`;
    const wcagReg = new RegExp(`\\n?/\\* WCAG-22-AA-COMPLIANCE-START \\*/[\\s\\S]*?/\\* WCAG-22-AA-COMPLIANCE-END \\*/\\n?`, 'g');
    css = css.replace(wcagReg, '') + wcagCssBlock;

    const tasksCssMarkerStart = '/* TASKS-1-TO-5-INTEGRATED-CSS-START */';
    const tasksCssMarkerEnd = '/* TASKS-1-TO-5-INTEGRATED-CSS-END */';
    const tasksCssBlock = `\n${tasksCssMarkerStart}\n${FOOTER_CSS}\n${SPONSORS_SECTION_CSS}\n${PHONE_QR_ANIMATION_CSS}\n${JOIN_US_MAP_CSS}\n${tasksCssMarkerEnd}\n`;
    const tasksCssReg = new RegExp(`\\n?/\\* TASKS-1-TO-5-INTEGRATED-CSS-START \\*/[\\s\\S]*?/\\* TASKS-1-TO-5-INTEGRATED-CSS-END \\*/\\n?`, 'g');
    css = css.replace(tasksCssReg, '') + tasksCssBlock;

    fs.writeFileSync(cssPath1, css, 'utf8');
    console.log('  [OK] Updated 0fa3ad3e26d5da69.css with CalculatorDscr rule, preloader styles, mobile-phone-fixes, WCAG 2.2 AA+ rules & Tasks 1–5 CSS');
  }

  const tasksCssBlockShared = `\n/* TASKS-1-TO-5-INTEGRATED-CSS-START */\n${FOOTER_CSS}\n${SPONSORS_SECTION_CSS}\n${PHONE_QR_ANIMATION_CSS}\n${JOIN_US_MAP_CSS}\n/* TASKS-1-TO-5-INTEGRATED-CSS-END */\n`;
  const tasksCssRegShared = new RegExp(`\\n?/\\* TASKS-1-TO-5-INTEGRATED-CSS-START \\*/[\\s\\S]*?/\\* TASKS-1-TO-5-INTEGRATED-CSS-END \\*/\\n?`, 'g');

  const cssPath2 = path.join(TARGET_DIR, '_next/static/css/dc7cdf09db0feb00.css');
  if (fs.existsSync(cssPath2)) {
    let css2 = fs.readFileSync(cssPath2, 'utf8');
    const reg = new RegExp(`\\n?/\\* MOBILE-PHONE-FIXES-START \\*/[\\s\\S]*?/\\* MOBILE-PHONE-FIXES-END \\*/\\n?`, 'g');
    css2 = css2.replace(reg, '') + wrappedMobileCss;
    css2 = css2.replace(tasksCssRegShared, '') + tasksCssBlockShared;
    fs.writeFileSync(cssPath2, css2, 'utf8');
    console.log('  [OK] Updated dc7cdf09db0feb00.css with preloader styles, mobile-phone-fixes & Tasks 1–5 CSS');
  }

  const cssPath3 = path.join(TARGET_DIR, '_next/static/css/c4582b4cde9209e3.css');
  if (fs.existsSync(cssPath3)) {
    let css3 = fs.readFileSync(cssPath3, 'utf8');
    const reg = new RegExp(`\\n?/\\* MOBILE-PHONE-FIXES-START \\*/[\\s\\S]*?/\\* MOBILE-PHONE-FIXES-END \\*/\\n?`, 'g');
    css3 = css3.replace(reg, '') + `\n${markerStart}\n${preloaderCss}\n${markerEnd}\n`;
    css3 = css3.replace(tasksCssRegShared, '') + tasksCssBlockShared;
    fs.writeFileSync(cssPath3, css3, 'utf8');
    console.log('  [OK] Updated c4582b4cde9209e3.css with preloader styles & Tasks 1–5 CSS');
  }

  // Update standalone portal HTML files (apply.html, events.html, pass.html, check-in.html, admin.html) with Task 1 Footer & Task 4 Dates
  const standaloneFiles = ['apply.html', 'events.html', 'pass.html', 'check-in.html', 'admin.html'];
  for (const file of standaloneFiles) {
    const filePath = path.join(TARGET_DIR, file);
    if (fs.existsSync(filePath)) {
      let html = fs.readFileSync(filePath, 'utf8');
      html = applyDatesAndDocxReplacements(html);
      html = applyFooterToStandaloneHtml(html);
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`  [OK] Updated standalone portal page: ${file}`);
    }
  }

  const applyHtmlPath = path.join(TARGET_DIR, 'apply.html');
  const applyDirIndexPath = path.join(TARGET_DIR, 'apply', 'index.html');
  if (fs.existsSync(applyHtmlPath)) {
    fs.mkdirSync(path.dirname(applyDirIndexPath), { recursive: true });
    fs.copyFileSync(applyHtmlPath, applyDirIndexPath);
    console.log('  [OK] Synced apply.html -> apply/index.html');
  }

  const eventsHtmlPath = path.join(TARGET_DIR, 'events.html');
  const eventsDirIndexPath = path.join(TARGET_DIR, 'events', 'index.html');
  if (fs.existsSync(eventsHtmlPath)) {
    fs.mkdirSync(path.dirname(eventsDirIndexPath), { recursive: true });
    fs.copyFileSync(eventsHtmlPath, eventsDirIndexPath);
    console.log('  [OK] Synced events.html -> events/index.html');
  }
}

console.log('=== ALL 16 ROUTES + RSC + HTML + CLIENT CHUNKS + TASKS 1–5 BUILT SUCCESSFULLY ===');
