import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const EMAILS_DIR = path.join(DATA_DIR, 'emails');
const DB_PATH = path.join(DATA_DIR, 'purplefest.sqlite');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(EMAILS_DIR, { recursive: true });

export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode and foreign keys
db.exec(`PRAGMA journal_mode = WAL;`);
db.exec(`PRAGMA synchronous = NORMAL;`);
db.exec(`PRAGMA foreign_keys = ON;`);

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE,
      title TEXT,
      subtitle TEXT,
      category TEXT,
      venue TEXT,
      event_date TEXT,
      event_time TEXT,
      fee_inr INTEGER,
      min_fee_inr INTEGER,
      capacity INTEGER,
      description TEXT,
      custom_fields_json TEXT,
      accessibility_features_json TEXT,
      is_active INTEGER DEFAULT 1,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id TEXT UNIQUE,
      event_slug TEXT,
      event_title TEXT,
      registration_type TEXT,
      full_name TEXT,
      email TEXT,
      phone TEXT,
      organization TEXT,
      city_state TEXT,
      stall_name TEXT,
      stall_about TEXT,
      stall_place TEXT,
      disability_category TEXT,
      accessibility_needs_json TEXT,
      custom_answers_json TEXT,
      coupon_code TEXT,
      amount_inr INTEGER,
      payment_status TEXT,
      razorpay_order_id TEXT,
      razorpay_payment_id TEXT,
      razorpay_signature TEXT,
      qr_token TEXT UNIQUE,
      qr_svg TEXT,
      checked_in INTEGER DEFAULT 0,
      checked_in_at TEXT,
      checked_in_gate TEXT,
      checked_in_by TEXT,
      email_sent INTEGER DEFAULT 0,
      resend_email_id TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id TEXT,
      razorpay_order_id TEXT,
      razorpay_payment_id TEXT,
      razorpay_signature TEXT,
      amount_paise INTEGER,
      currency TEXT,
      status TEXT,
      method TEXT,
      verified_at TEXT
    );

    CREATE TABLE IF NOT EXISTS checkins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id TEXT,
      qr_token TEXT,
      scan_result TEXT,
      gate_name TEXT,
      operator_name TEXT,
      scanned_at TEXT
    );

    CREATE TABLE IF NOT EXISTS coupons (
      code TEXT PRIMARY KEY,
      discount_percent INTEGER,
      description TEXT,
      max_uses INTEGER,
      used_count INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id TEXT,
      recipient_email TEXT,
      subject TEXT,
      resend_id TEXT,
      status TEXT,
      preview_url TEXT,
      sent_at TEXT
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value_json TEXT,
      updated_at TEXT
    );
  `);

  seedEvents();
  seedCoupons();
  seedSettings();
}

const INITIAL_EVENTS = [
  {
    slug: 'purple-fest-delegate-2027',
    title: 'Purple Fest Vadodara 2027 · Full 3-Day Delegate Pass',
    subtitle: 'All-Access Accreditation to Plenaries, Assistive Tech Expo, Cultural Gala & Hospitality',
    category: 'Delegate Accreditation',
    venue: 'Akota Stadium & Sir Sayajirao Nagar Gruh, Vadodara',
    event_date: '21–23 January 2027',
    event_time: '09:00 AM – 08:30 PM IST',
    fee_inr: 2200,
    min_fee_inr: 2200,
    capacity: 2500,
    description:
      'Official 3-Day Delegate Accreditation for Purple Fest Vadodara 2027 under the Viksit Bharat @ 2047 national inclusion mandate. Includes entry to all 6 Experience Zones, GIEN & TISS academic plenaries, complimentary tea & lunch coupons across all 3 festival days, accessible EV buggy transit, and full RPwD Act 2016 accommodations.',
    custom_fields: [
      {
        id: 'delegate_role',
        label: 'Delegate Representation Category',
        type: 'select',
        required: true,
        options: [
          'Individual Delegate / Citizen',
          'Divyangjan Self-Advocate',
          'DPO / NGO Leadership',
          'Corporate CSR & HR Inclusion Lead',
          'Academic / Special Educator / Researcher',
          'Government / District Official',
          'Caregiver / Escort Companion',
        ],
      },
      {
        id: 'dietary_preference',
        label: 'Hospitality Meal Coupon Preference (Tea & Lunch Included)',
        type: 'select',
        required: true,
        options: [
          'Standard Gujarati Vegetarian Thali',
          'Jain Vegetarian (No Root Vegetables)',
          'Diabetic-Friendly Low-GI Vegetarian',
          'Soft / Assisted Swallowing Diet',
        ],
      },
      {
        id: 'udid_number',
        label: 'UDID / RPwD Certificate No. (Optional for Priority Desk)',
        type: 'text',
        required: false,
        placeholder: 'e.g. GJ0610219950012345',
      },
    ],
    accessibility_features: [
      'ISL Sign Language Interpretation on All Stages',
      'Braille & Tactile Campus Maps + Embossed Delegate Kit',
      'Dedicated Accessible EV Buggy & Wheelchair Escort Bay',
      'Sensory-Safe Quiet Room & Neurodivergent Rest Pod',
      'Complimentary Caregiver / Escort Companion Pass Support',
    ],
  },
  {
    slug: 'assistive-tech-stall-expo',
    title: 'Assistive Technology & Inclusive Innovation Stall Expo',
    subtitle: 'Zone 01 Octanorm Exhibition Pavilion · Startups, DPOs, MedTech & Inclusive Enterprises',
    category: 'Stall & Exhibition',
    venue: 'Zone 01 · Grand Exhibition Pavilion, Akota Stadium, Vadodara',
    event_date: '21–23 January 2027',
    event_time: '09:30 AM – 07:30 PM IST',
    fee_inr: 15000,
    min_fee_inr: 8500,
    capacity: 120,
    description:
      'Book an official exhibition stall at Western India’s premier Assistive Technology, Prosthetics, AI Accessibility & DPO Livelihood Marketplace. Every stall includes fascia branding, plug-and-play power sockets, barrier-free ramped aisle frontage, exhibitor lunch coupons, and B2B/CSR buyer matchmaking.',
    custom_fields: [
      {
        id: 'stall_tier',
        label: 'Exhibition Pavilion Stall Tier',
        type: 'select',
        required: true,
        options: [
          'Tier D · Subsidized DPO / Grassroots NGO Stall (Min ₹8,500)',
          'Tier C · Assistive Startup & University R&D Pod (₹12,000)',
          'Tier A · Standard 3m×3m Octanorm Pavilion (₹15,000)',
          'Tier B · Prime Corner 6m×3m Two-Side Pavilion (₹35,000)',
        ],
      },
      {
        id: 'power_requirement',
        label: 'Electrical & Demo Infrastructure Requirement',
        type: 'select',
        required: true,
        options: [
          'Standard 5A Plug Point + LED Spotlights',
          '15A Heavy Assistive Hardware / Charging Bay',
          'High-Bandwidth Wi-Fi + Screen Mount Setup',
        ],
      },
      {
        id: 'exhibitor_badges_count',
        label: 'Number of Exhibitor Crew Badges Required',
        type: 'select',
        required: true,
        options: ['2 Exhibitor Badges (Included)', '3 Exhibitor Badges', '4 Exhibitor Badges (Corner Pavilion)'],
      },
    ],
    accessibility_features: [
      '2.4m Wide Step-Free Wheelchair Turning Aisles',
      'Lowered 760mm Accessible Demo Counters',
      'On-Call ISL Interpreter for Exhibitor Demos',
      'Braille Stall Fascia Numbering & Audio Beacon Tags',
    ],
  },
  {
    slug: 'gien-global-inclusion-summit',
    title: 'GIEN Global Inclusion & Universal Design Conclave',
    subtitle: 'International Policy, Inclusive Education & Workplace Accessibility Plenary',
    category: 'Conclave & Summit',
    venue: 'Sir Sayajirao Nagar Gruh Main Auditorium, Akota, Vadodara',
    event_date: '21–22 January 2027',
    event_time: '10:00 AM – 05:30 PM IST',
    fee_inr: 1500,
    min_fee_inr: 1500,
    capacity: 600,
    description:
      'Co-convened with Global Inclusive Education Network (GIEN), Brotherhood, and Praangan. Brings together international accessibility architects, special educators, CSR heads, and policy leaders to chart India’s roadmap toward Viksit Bharat @ 2047.',
    custom_fields: [
      {
        id: 'summit_track',
        label: 'Primary Plenary Track Selection',
        type: 'select',
        required: true,
        options: [
          'Track 1 · Universal Design & Barrier-Free Smart Cities',
          'Track 2 · Inclusive Education & NEP 2020 Implementation',
          'Track 3 · AI, Digital Accessibility (WCAG / IS 17802) & Assistive Tech',
          'Track 4 · Corporate ESG, Equal Opportunity & DEI Hiring',
        ],
      },
      {
        id: 'certificate_type',
        label: 'Continuing Professional Participation Certificate',
        type: 'select',
        required: true,
        options: [
          'Digital + Embossed Print Certificate',
          'RCI / Academic Credit Attendance Record',
          'Standard Delegate Participation Record',
        ],
      },
    ],
    accessibility_features: [
      'Real-Time AI Live Captioning (CART) in English, Hindi & Gujarati',
      'Dual Stage ISL Interpreters with Dedicated Spotlight',
      'Induction Hearing Loop & FM Assistive Listening Headsets',
      'Wheelchair Stage Ramp & Accessible Podium',
    ],
  },
  {
    slug: 'national-para-sports-championship',
    title: 'National Para-Sports & Adaptive Athletics Arena',
    subtitle: 'Wheelchair Basketball, Blind Cricket, Boccia & Para-Badminton Showcases',
    category: 'Para-Sports',
    venue: 'Akota Main Turf & Indoor Adaptive Sports Complex, Vadodara',
    event_date: '22–23 January 2027',
    event_time: '07:30 AM – 06:00 PM IST',
    fee_inr: 500,
    min_fee_inr: 500,
    capacity: 800,
    description:
      'High-energy competitive and exhibition para-sports tournaments celebrating Paralympic excellence in Gujarat. Open to competing para-athletes, coaches, technical officials, and accredited spectators.',
    custom_fields: [
      {
        id: 'sport_discipline',
        label: 'Para-Sport Discipline',
        type: 'select',
        required: true,
        options: [
          'Wheelchair Basketball',
          'Boccia ( Severe Motor Impairment )',
          'Blind Cricket / Tactile Sound Ball',
          'Para-Badminton & Para-Table Tennis',
          'Adaptive Track & Field / Spectator Pass',
        ],
      },
      {
        id: 'athlete_role',
        label: 'Arena Participation Category',
        type: 'select',
        required: true,
        options: [
          'Competing Para-Athlete',
          'Coach / Sports Physio / Escort',
          'Technical Classifier / Referee',
          'Accredited Arena Spectator',
        ],
      },
    ],
    accessibility_features: [
      'Dedicated Prosthetic & Sports Wheelchair Repair Pit-Stop',
      'Accessible Locker Rooms, Roll-In Showers & Hydration Bays',
      'Tactile Sideline Guides & Audio Play-by-Play Commentary',
      'Sports Medical & Physiotherapy Recovery Tent',
    ],
  },
  {
    slug: 'purple-kaleidoscope-cultural-gala',
    title: 'Purple Kaleidoscope · Inclusive Cultural & Sensory Evening Gala',
    subtitle: 'Sign-Choreographed Dance, Classical Fusion on Wheels & Multi-Sensory Art',
    category: 'Cultural Gala',
    venue: 'Main Amphitheatre & Sensory Pavilion, Akota Stadium, Vadodara',
    event_date: '22 January 2027',
    event_time: '06:00 PM – 09:30 PM IST',
    fee_inr: 750,
    min_fee_inr: 750,
    capacity: 1200,
    description:
      'An unforgettable evening celebrating India’s finest Divyangjan performing artists—featuring Bharatanatyam and Sufiana dance on wheelchairs, visually impaired symphony ensembles, and deaf visual theatre with live audio description.',
    custom_fields: [
      {
        id: 'seating_zone',
        label: 'Accessible Amphitheatre Seating Bay',
        type: 'select',
        required: true,
        options: [
          'Zone A · Front-Row Direct ISL Interpreter Line-of-Sight',
          'Zone B · Level Wheelchair Bay + Companion Seat',
          'Zone C · Live Audio-Description Headset Bay',
          'Zone D · Low-Stimulation Sensory Buffer Seating',
          'Zone E · General Accredited Seating',
        ],
      },
      {
        id: 'dinner_box',
        label: 'Gala Evening Hospitality Box',
        type: 'select',
        required: true,
        options: ['Traditional Vadodara Festive Vegetarian Box', 'Jain Festive Box', 'No Food Box Required'],
      },
    ],
    accessibility_features: [
      'Live Poetic Audio Description via Wireless Headsets',
      'Sub-Bass Vibrating Tactile Floor Zone for Deaf Guests',
      'Strobe-Free Stage Lighting (Photosensitive Epilepsy Safe)',
      'Step-Free Amphitheatre Ramps & Companion Seating',
    ],
  },
  {
    slug: '21-benchmark-disabilities-dialogue',
    title: '21 Benchmark Disabilities (RPwD Act 2016) National Policy Dialogue',
    subtitle: 'Complimentary Grassroots Self-Advocate & District Administration Roundtable',
    category: 'Policy Dialogue (Fee Waived)',
    venue: 'Viksit Bharat @ 2047 Convention Hall, Vadodara',
    event_date: '23 January 2027',
    event_time: '10:30 AM – 04:30 PM IST',
    fee_inr: 0,
    min_fee_inr: 0,
    capacity: 500,
    description:
      'statutory open-house consultation covering all 21 benchmark disabilities recognized under the Rights of Persons with Disabilities (RPwD) Act 2016. Registration fee is 100% waived to ensure barrier-free grassroots representation.',
    custom_fields: [
      {
        id: 'working_group',
        label: 'RPwD 21-Disability Working Group',
        type: 'select',
        required: true,
        options: [
          'Locomotor, Cerebral Palsy, Dwarfism & Muscular Dystrophy',
          'Blindness & Low-Vision Assistive Ecosystem',
          'Deaf, Hard of Hearing & Speech-Language Disability',
          'Autism Spectrum, Intellectual & Specific Learning Disabilities',
          'Thalassemia, Hemophilia, Sickle Cell & Multiple Disabilities',
          'District Collectorate, Legal Aid & UDID Implementation',
        ],
      },
      {
        id: 'brief_format',
        label: 'Policy Dossier Format Preference',
        type: 'select',
        required: true,
        options: [
          'Standard Print + Tagged Accessible PDF',
          'Braille Embossed Policy Dossier (Grade 2)',
          'Large Print (18pt High Contrast) Edition',
          'DAISY Audio + Screen-Reader EPUB',
        ],
      },
    ],
    accessibility_features: [
      '100% Statutory Fee Waived Credential (Instant QR Pass)',
      'Braille, Large Print & Easy-Read Pictorial Dossiers',
      'Simultaneous ISL, Hindi, Gujarati & English Interpretation',
      'Dedicated Support Assistant & Quiet Decompression Lounge',
    ],
  },
];

const INITIAL_COUPONS = [
  {
    code: 'PURPLEFREE27',
    discount_percent: 100,
    description: 'Official Purple Fest Vadodara 2027 Secretariat 100% Fee Waiver',
    max_uses: 500,
    used_count: 0,
    is_active: 1,
  },
  {
    code: 'DIVYANGJAN100',
    discount_percent: 100,
    description: 'Divyangjan Self-Advocate & Grassroots DPO 100% Fellowship Grant',
    max_uses: 1000,
    used_count: 0,
    is_active: 1,
  },
  {
    code: 'NABDELHI50',
    discount_percent: 50,
    description: 'Co-Organizer & Partner Network 50% Concession (Praangan / Brotherhood / GIEN)',
    max_uses: 500,
    used_count: 0,
    is_active: 1,
  },
  {
    code: 'EARLYBIRD25',
    discount_percent: 25,
    description: 'Early Bird Delegate & Exhibitor 25% Concession',
    max_uses: 1000,
    used_count: 0,
    is_active: 1,
  },
];

const INITIAL_SETTINGS = {
  festival_title: 'Purple Fest Vadodara 2027',
  festival_subtitle: 'National Festival of Inclusion · Viksit Bharat @ 2047',
  festival_dates: '21–23 January 2027',
  festival_venue: 'Akota Stadium & Sir Sayajirao Nagar Gruh, Vadodara, Gujarat',
  registration_open: true,
  hospitality_note: 'Complimentary Tea & Lunch Coupons included for all accredited delegates and stall crew.',
  secretariat_email: 'secretariat@purplefestvadodara.org',
  secretariat_phone: '+91 265 234 2027',
  organizers: ['Praangan (Vadodara)', 'Brotherhood (New Delhi)', 'GIEN', 'Purple Fest Goa Legacy'],
};

function seedEvents() {
  const now = new Date().toISOString();
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO events (
      slug, title, subtitle, category, venue, event_date, event_time,
      fee_inr, min_fee_inr, capacity, description,
      custom_fields_json, accessibility_features_json, is_active, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `);

  for (const ev of INITIAL_EVENTS) {
    insertStmt.run(
      ev.slug,
      ev.title,
      ev.subtitle,
      ev.category,
      ev.venue,
      ev.event_date,
      ev.event_time,
      ev.fee_inr,
      ev.min_fee_inr,
      ev.capacity,
      ev.description,
      JSON.stringify(ev.custom_fields || []),
      JSON.stringify(ev.accessibility_features || []),
      now
    );
  }
}

function seedCoupons() {
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO coupons (code, discount_percent, description, max_uses, used_count, is_active)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  for (const c of INITIAL_COUPONS) {
    insertStmt.run(c.code, c.discount_percent, c.description, c.max_uses, c.used_count, c.is_active);
  }
}

function seedSettings() {
  const now = new Date().toISOString();
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO site_settings (key, value_json, updated_at)
    VALUES (?, ?, ?)
  `);
  for (const [k, v] of Object.entries(INITIAL_SETTINGS)) {
    insertStmt.run(k, JSON.stringify(v), now);
  }
}

function safeJsonParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function hydrateEventRow(row) {
  if (!row) return null;
  const regCountRow = db
    .prepare(`SELECT COUNT(*) AS count FROM registrations WHERE event_slug = ? AND payment_status IN ('PAID', 'WAIVED')`)
    .get(row.slug);
  const registered_count = regCountRow ? Number(regCountRow.count) : 0;
  return {
    ...row,
    is_active: Boolean(row.is_active),
    custom_fields: safeJsonParse(row.custom_fields_json, []),
    accessibility_features: safeJsonParse(row.accessibility_features_json, []),
    registered_count,
    seats_remaining: Math.max(0, Number(row.capacity || 0) - registered_count),
  };
}

export function hydrateRegistrationRow(row) {
  if (!row) return null;
  return {
    ...row,
    checked_in: Boolean(row.checked_in),
    email_sent: Boolean(row.email_sent),
    accessibility_needs: safeJsonParse(row.accessibility_needs_json, []),
    custom_answers: safeJsonParse(row.custom_answers_json, {}),
    email_preview_url: `/api/registrations/${encodeURIComponent(row.registration_id)}/email-preview`,
    qr_svg_url: `/api/registrations/${encodeURIComponent(row.registration_id)}/qr.svg`,
    pass_url: `/pass?id=${encodeURIComponent(row.registration_id)}`,
    checkin_url: `/check-in?id=${encodeURIComponent(row.registration_id)}`,
  };
}

export function listEvents({ includeInactive = false } = {}) {
  const rows = includeInactive
    ? db.prepare(`SELECT * FROM events ORDER BY id ASC`).all()
    : db.prepare(`SELECT * FROM events WHERE is_active = 1 ORDER BY id ASC`).all();
  return rows.map(hydrateEventRow);
}

export function getEventBySlug(slugOrId) {
  if (slugOrId === undefined || slugOrId === null) return null;
  const bySlug = db.prepare(`SELECT * FROM events WHERE slug = ?`).get(String(slugOrId));
  if (bySlug) return hydrateEventRow(bySlug);
  if (/^\d+$/.test(String(slugOrId))) {
    const byId = db.prepare(`SELECT * FROM events WHERE id = ?`).get(Number(slugOrId));
    if (byId) return hydrateEventRow(byId);
  }
  return null;
}

export function upsertEvent(payload) {
  const now = new Date().toISOString();
  const slug =
    (payload.slug || payload.title || 'event-' + Date.now())
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'custom-event';

  const existing = getEventBySlug(payload.id || slug);
  const customFields = Array.isArray(payload.custom_fields)
    ? JSON.stringify(payload.custom_fields)
    : typeof payload.custom_fields_json === 'string'
    ? payload.custom_fields_json
    : existing
    ? existing.custom_fields_json
    : '[]';

  const a11yFeatures = Array.isArray(payload.accessibility_features)
    ? JSON.stringify(payload.accessibility_features)
    : typeof payload.accessibility_features_json === 'string'
    ? payload.accessibility_features_json
    : existing
    ? existing.accessibility_features_json
    : '[]';

  const fee_inr = payload.fee_inr !== undefined ? Number(payload.fee_inr) : existing ? existing.fee_inr : 0;
  const min_fee_inr =
    payload.min_fee_inr !== undefined ? Number(payload.min_fee_inr) : existing ? existing.min_fee_inr : fee_inr;
  const capacity = payload.capacity !== undefined ? Number(payload.capacity) : existing ? existing.capacity : 500;
  const is_active =
    payload.is_active !== undefined ? (payload.is_active ? 1 : 0) : existing ? (existing.is_active ? 1 : 0) : 1;

  if (existing) {
    const targetSlug = payload.slug || existing.slug;
    db.prepare(`
      UPDATE events SET
        slug = ?,
        title = ?,
        subtitle = ?,
        category = ?,
        venue = ?,
        event_date = ?,
        event_time = ?,
        fee_inr = ?,
        min_fee_inr = ?,
        capacity = ?,
        description = ?,
        custom_fields_json = ?,
        accessibility_features_json = ?,
        is_active = ?,
        updated_at = ?
      WHERE id = ?
    `).run(
      targetSlug,
      payload.title ?? existing.title,
      payload.subtitle ?? existing.subtitle ?? '',
      payload.category ?? existing.category ?? 'General',
      payload.venue ?? existing.venue ?? 'Akota Stadium, Vadodara',
      payload.event_date ?? existing.event_date ?? '21–23 January 2027',
      payload.event_time ?? existing.event_time ?? '09:00 AM – 06:00 PM IST',
      fee_inr,
      min_fee_inr,
      capacity,
      payload.description ?? existing.description ?? '',
      customFields,
      a11yFeatures,
      is_active,
      now,
      existing.id
    );
    return getEventBySlug(existing.id);
  } else {
    db.prepare(`
      INSERT INTO events (
        slug, title, subtitle, category, venue, event_date, event_time,
        fee_inr, min_fee_inr, capacity, description,
        custom_fields_json, accessibility_features_json, is_active, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug,
      payload.title || 'New Purple Fest Event',
      payload.subtitle || '',
      payload.category || 'General',
      payload.venue || 'Akota Stadium, Vadodara',
      payload.event_date || '21–23 January 2027',
      payload.event_time || '09:00 AM – 06:00 PM IST',
      fee_inr,
      min_fee_inr,
      capacity,
      payload.description || '',
      customFields,
      a11yFeatures,
      is_active,
      now
    );
    return getEventBySlug(slug);
  }
}

export function deleteEvent(slugOrId) {
  const existing = getEventBySlug(slugOrId);
  if (!existing) return false;
  db.prepare(`DELETE FROM events WHERE id = ?`).run(existing.id);
  return true;
}

export function listCoupons() {
  return db
    .prepare(`SELECT * FROM coupons ORDER BY discount_percent DESC, code ASC`)
    .all()
    .map((c) => ({ ...c, is_active: Boolean(c.is_active) }));
}

export function getCoupon(code) {
  if (!code) return null;
  const clean = String(code).trim().toUpperCase();
  const row = db.prepare(`SELECT * FROM coupons WHERE UPPER(code) = ?`).get(clean);
  if (!row) return null;
  return { ...row, is_active: Boolean(row.is_active) };
}

export function upsertCoupon(payload) {
  const code = String(payload.code || '')
    .trim()
    .toUpperCase();
  if (!code) throw new Error('Coupon code is required');
  const discount = Math.max(0, Math.min(100, Number(payload.discount_percent ?? 0)));
  const maxUses = Number(payload.max_uses ?? 500);
  const desc = String(payload.description || `${discount}% Concession Coupon`);
  const isActive = payload.is_active === undefined ? 1 : payload.is_active ? 1 : 0;

  const existing = getCoupon(code);
  if (existing) {
    db.prepare(`
      UPDATE coupons SET discount_percent = ?, description = ?, max_uses = ?, is_active = ?
      WHERE code = ?
    `).run(discount, desc, maxUses, isActive, code);
  } else {
    db.prepare(`
      INSERT INTO coupons (code, discount_percent, description, max_uses, used_count, is_active)
      VALUES (?, ?, ?, ?, 0, ?)
    `).run(code, discount, desc, maxUses, isActive);
  }
  return getCoupon(code);
}

export function getSettings() {
  const rows = db.prepare(`SELECT key, value_json, updated_at FROM site_settings`).all();
  const out = {};
  for (const r of rows) {
    out[r.key] = safeJsonParse(r.value_json, r.value_json);
  }
  return out;
}

export function updateSettings(updates) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO site_settings (key, value_json, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = excluded.updated_at
  `);
  for (const [k, v] of Object.entries(updates || {})) {
    stmt.run(k, JSON.stringify(v), now);
  }
  return getSettings();
}

export function generateNextRegistrationId() {
  const countRow = db.prepare(`SELECT COUNT(*) AS count FROM registrations`).get();
  const seq = (countRow ? Number(countRow.count) : 0) + 1001;
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `PFV27-${seq}-${rand}`;
}

export function getRegistration(identifier) {
  if (!identifier) return null;
  const clean = String(identifier).trim();
  let row = db
    .prepare(
      `SELECT * FROM registrations WHERE registration_id = ? OR qr_token = ? OR razorpay_order_id = ?`
    )
    .get(clean, clean, clean);
  if (!row && /^\d+$/.test(clean)) {
    row = db.prepare(`SELECT * FROM registrations WHERE id = ?`).get(Number(clean));
  }
  return hydrateRegistrationRow(row);
}

export function listRegistrations(filters = {}) {
  const clauses = [];
  const params = [];

  if (filters.event_slug) {
    clauses.push(`event_slug = ?`);
    params.push(String(filters.event_slug));
  }
  if (filters.payment_status) {
    clauses.push(`payment_status = ?`);
    params.push(String(filters.payment_status).toUpperCase());
  }
  if (filters.checked_in !== undefined && filters.checked_in !== '') {
    clauses.push(`checked_in = ?`);
    params.push(filters.checked_in === true || filters.checked_in === '1' || filters.checked_in === 'true' ? 1 : 0);
  }
  if (filters.search) {
    const q = `%${String(filters.search).trim()}%`;
    clauses.push(
      `(registration_id LIKE ? OR full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR organization LIKE ? OR stall_name LIKE ?)`
    );
    params.push(q, q, q, q, q, q);
  }

  const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
  const limit = Math.min(500, Math.max(1, Number(filters.limit || 200)));
  const rows = db
    .prepare(`SELECT * FROM registrations ${whereSql} ORDER BY id DESC LIMIT ${limit}`)
    .all(...params);
  return rows.map(hydrateRegistrationRow);
}

export function insertRegistration(regData) {
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO registrations (
      registration_id, event_slug, event_title, registration_type,
      full_name, email, phone, organization, city_state,
      stall_name, stall_about, stall_place,
      disability_category, accessibility_needs_json, custom_answers_json,
      coupon_code, amount_inr, payment_status,
      razorpay_order_id, razorpay_payment_id, razorpay_signature,
      qr_token, qr_svg,
      checked_in, checked_in_at, checked_in_gate, checked_in_by,
      email_sent, resend_email_id, created_at
    ) VALUES (
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?
    )
  `).run(
    regData.registration_id,
    regData.event_slug,
    regData.event_title,
    regData.registration_type || 'DELEGATE',
    regData.full_name,
    regData.email,
    regData.phone || '',
    regData.organization || '',
    regData.city_state || '',
    regData.stall_name || '',
    regData.stall_about || '',
    regData.stall_place || '',
    regData.disability_category || 'None / Prefer Not to Disclose',
    JSON.stringify(Array.isArray(regData.accessibility_needs) ? regData.accessibility_needs : []),
    JSON.stringify(regData.custom_answers && typeof regData.custom_answers === 'object' ? regData.custom_answers : {}),
    regData.coupon_code || '',
    Number(regData.amount_inr || 0),
    regData.payment_status || 'PENDING',
    regData.razorpay_order_id || '',
    regData.razorpay_payment_id || '',
    regData.razorpay_signature || '',
    regData.qr_token || null,
    regData.qr_svg || '',
    regData.checked_in ? 1 : 0,
    regData.checked_in_at || null,
    regData.checked_in_gate || null,
    regData.checked_in_by || null,
    regData.email_sent ? 1 : 0,
    regData.resend_email_id || null,
    regData.created_at || now
  );

  return getRegistration(regData.registration_id);
}

export function recordPaymentAndIssueQR({
  registration_id,
  payment_status = 'PAID',
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount_paise,
  currency = 'INR',
  method = 'razorpay',
  qr_token,
  qr_svg,
}) {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE registrations SET
      payment_status = ?,
      razorpay_order_id = COALESCE(NULLIF(?, ''), razorpay_order_id),
      razorpay_payment_id = ?,
      razorpay_signature = ?,
      qr_token = ?,
      qr_svg = ?
    WHERE registration_id = ?
  `).run(
    payment_status,
    razorpay_order_id || '',
    razorpay_payment_id || '',
    razorpay_signature || '',
    qr_token,
    qr_svg,
    registration_id
  );

  db.prepare(`
    INSERT INTO payments (
      registration_id, razorpay_order_id, razorpay_payment_id, razorpay_signature,
      amount_paise, currency, status, method, verified_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    registration_id,
    razorpay_order_id || '',
    razorpay_payment_id || '',
    razorpay_signature || '',
    Number(amount_paise || 0),
    currency,
    payment_status,
    method,
    now
  );

  return getRegistration(registration_id);
}

export function recordEmailDispatch({
  registration_id,
  recipient_email,
  subject,
  resend_id,
  status = 'SENT',
  preview_url,
}) {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE registrations SET
      email_sent = 1,
      resend_email_id = ?
    WHERE registration_id = ?
  `).run(resend_id, registration_id);

  db.prepare(`
    INSERT INTO email_logs (
      registration_id, recipient_email, subject, resend_id, status, preview_url, sent_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(registration_id, recipient_email, subject, resend_id, status, preview_url, now);

  return getRegistration(registration_id);
}

export function performCheckIn({
  qr_token,
  registration_id,
  gate_name = 'Gate 01 · Main Akota Accessibility Desk',
  operator_name = 'Registration Desk Officer',
  commit_checkin = true,
}) {
  const now = new Date().toISOString();
  let reg = null;
  if (qr_token) {
    reg = getRegistration(qr_token);
  }
  if (!reg && registration_id) {
    reg = getRegistration(registration_id);
  }
  if (!reg && qr_token && qr_token.startsWith('PFV27.')) {
    const parts = qr_token.split('.');
    if (parts[1]) {
      reg = getRegistration(parts[1]);
    }
  }

  if (!reg) {
    db.prepare(`
      INSERT INTO checkins (registration_id, qr_token, scan_result, gate_name, operator_name, scanned_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(registration_id || 'UNKNOWN', qr_token || 'UNKNOWN', 'INVALID_NOT_FOUND', gate_name, operator_name, now);

    return {
      ok: false,
      verified: false,
      status: 'INVALID_NOT_FOUND',
      message: 'No matching credential found in Purple Fest Vadodara 2027 SQL registry.',
      registration: null,
    };
  }

  const isPaidOrWaived = reg.payment_status === 'PAID' || reg.payment_status === 'WAIVED';
  if (!isPaidOrWaived) {
    db.prepare(`
      INSERT INTO checkins (registration_id, qr_token, scan_result, gate_name, operator_name, scanned_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(reg.registration_id, reg.qr_token || qr_token || '', 'PAYMENT_PENDING', gate_name, operator_name, now);

    return {
      ok: false,
      verified: false,
      status: 'PAYMENT_PENDING',
      message: `Credential found (${reg.registration_id}), but payment status is ${reg.payment_status}. Please complete payment at the desk.`,
      registration: reg,
    };
  }

  if (reg.checked_in) {
    db.prepare(`
      INSERT INTO checkins (registration_id, qr_token, scan_result, gate_name, operator_name, scanned_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(reg.registration_id, reg.qr_token || qr_token || '', 'ALREADY_CHECKED_IN', gate_name, operator_name, now);

    return {
      ok: true,
      verified: true,
      already_checked_in: true,
      status: 'ALREADY_CHECKED_IN',
      message: `Delegate ${reg.full_name} was already checked in at ${reg.checked_in_at} (${reg.checked_in_gate || 'Main Gate'}).`,
      registration: reg,
    };
  }

  if (commit_checkin !== false) {
    db.prepare(`
      UPDATE registrations SET
        checked_in = 1,
        checked_in_at = ?,
        checked_in_gate = ?,
        checked_in_by = ?
      WHERE registration_id = ?
    `).run(now, gate_name, operator_name, reg.registration_id);

    db.prepare(`
      INSERT INTO checkins (registration_id, qr_token, scan_result, gate_name, operator_name, scanned_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(reg.registration_id, reg.qr_token || qr_token || '', 'VERIFIED_ADMITTED', gate_name, operator_name, now);

    const updated = getRegistration(reg.registration_id);
    return {
      ok: true,
      verified: true,
      already_checked_in: false,
      status: 'VERIFIED_ADMITTED',
      message: `Entry Verified & Checked In: ${updated.full_name} (${updated.registration_id})`,
      registration: updated,
    };
  }

  return {
    ok: true,
    verified: true,
    already_checked_in: false,
    status: 'VERIFIED_READY',
    message: `Credential Valid & Paid: ${reg.full_name} (${reg.registration_id}) — Ready for Check-In`,
    registration: reg,
  };
}

export function getAdminStats() {
  const totalRegs = db.prepare(`SELECT COUNT(*) AS count FROM registrations`).get()?.count || 0;
  const paidRegs =
    db.prepare(`SELECT COUNT(*) AS count FROM registrations WHERE payment_status IN ('PAID', 'WAIVED')`).get()?.count ||
    0;
  const pendingRegs =
    db.prepare(`SELECT COUNT(*) AS count FROM registrations WHERE payment_status = 'PENDING'`).get()?.count || 0;
  const checkedInRegs =
    db.prepare(`SELECT COUNT(*) AS count FROM registrations WHERE checked_in = 1`).get()?.count || 0;
  const revenueInr =
    db.prepare(`SELECT COALESCE(SUM(amount_inr), 0) AS total FROM registrations WHERE payment_status = 'PAID'`).get()
      ?.total || 0;
  const stallsBooked =
    db
      .prepare(
        `SELECT COUNT(*) AS count FROM registrations WHERE (registration_type = 'STALL' OR event_slug = 'assistive-tech-stall-expo') AND payment_status IN ('PAID', 'WAIVED')`
      )
      .get()?.count || 0;
  const emailsDispatched =
    db.prepare(`SELECT COUNT(*) AS count FROM email_logs`).get()?.count || 0;

  const byEvent = db
    .prepare(`
      SELECT
        e.slug,
        e.title,
        e.category,
        e.fee_inr,
        e.capacity,
        COUNT(r.id) AS total_registrations,
        SUM(CASE WHEN r.payment_status IN ('PAID', 'WAIVED') THEN 1 ELSE 0 END) AS confirmed_registrations,
        SUM(CASE WHEN r.checked_in = 1 THEN 1 ELSE 0 END) AS checked_in_count,
        SUM(CASE WHEN r.payment_status = 'PAID' THEN r.amount_inr ELSE 0 END) AS revenue_inr
      FROM events e
      LEFT JOIN registrations r ON r.event_slug = e.slug
      GROUP BY e.id
      ORDER BY e.id ASC
    `)
    .all();

  const recentCheckins = db
    .prepare(`SELECT * FROM checkins ORDER BY id DESC LIMIT 20`)
    .all();

  const recentEmails = db
    .prepare(`SELECT * FROM email_logs ORDER BY id DESC LIMIT 20`)
    .all();

  return {
    total_registrations: Number(totalRegs),
    confirmed_registrations: Number(paidRegs),
    pending_registrations: Number(pendingRegs),
    checked_in_count: Number(checkedInRegs),
    total_revenue_inr: Number(revenueInr),
    stalls_booked: Number(stallsBooked),
    emails_dispatched: Number(emailsDispatched),
    events_breakdown: byEvent.map((r) => ({
      ...r,
      total_registrations: Number(r.total_registrations || 0),
      confirmed_registrations: Number(r.confirmed_registrations || 0),
      checked_in_count: Number(r.checked_in_count || 0),
      revenue_inr: Number(r.revenue_inr || 0),
    })),
    recent_checkins: recentCheckins,
    recent_emails: recentEmails,
  };
}

initDatabase();
export { DATA_DIR, EMAILS_DIR, DB_PATH };
