/**
 * Task 4 — Festival Dates & Official Docx Metadata Synchronization Module
 * =========================================================================
 * Enforces official Purple Fest Vadodara 2027 dates (21–23 January 2027)
 * and official .docx metadata (Organisers, Knowledge Partner, Venue Partners,
 * Secretariat Address, Contacts, Phones, Email, Website, and Organising Committee).
 */

export const DOCX_OFFICIAL_METADATA = {
  dates: '21–23 January 2027',
  datesShort: '21–23 Jan 2027',
  datesLong: 'January 21–23, 2027',
  day1: '21 January 2027',
  day2: '22 January 2027',
  day3: '23 January 2027',
  setupDate: '20 January 2027',
  organisers: [
    'Praangan, Vadodara, Gujarat',
    'Brotherhood, Delhi',
    'Centre for Disabilities Studies and Action, School of Social Work, Tata Institute of Social Sciences, Mumbai',
  ],
  knowledgePartner: 'State Commission for Persons with Disabilities, Goa',
  venuePartners: [
    'The Maharaja Sayajirao University, Vadodara',
    'GMERS Medical College, Gotri, Vadodara',
  ],
  secretariatAddress:
    'Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat',
  contacts: {
    radhaTandon: {
      name: 'Radha Tandon',
      role: 'Director',
      phone: '+91 99743 83920',
    },
    satishKapoor: {
      name: 'Satish Kapoor',
      role: 'Coordinator',
      phones: ['+91 98994 72065', '+91 92117 60202'],
    },
  },
  email: 'purplefestivalvadodara@gmail.com',
  website: 'www.purplefestivalvadodara.com',
  committee: {
    chairperson: 'To Be Confirmed (TBC)',
    director:
      'Radha Tandon, Founder and Director of Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat',
    coordinator:
      'Satish Kapoor, Founding President, Brotherhood, Global Inclusive Education Network, We Care Film Festival on Disabilities and Brotherhood Development Initiative, Delhi',
    advisors: [
      'Dr. Nitin Malik, Registrar, Gujarat National Law University, Gandhinagar',
      'Dr. Ravinder Singh, Director, ICMR, Delhi',
    ],
    mediaAdvisor: 'Deepak Parvatiyaar, Founder and Chief Editor of Global Bihari, Delhi',
  },
};

export const DATE_AND_DOCX_REPLACEMENTS = [
  // Multi-day ranges
  ['14–16 January 2027', '21–23 January 2027'],
  ['14-16 January 2027', '21–23 January 2027'],
  ['14 – 16 January 2027', '21 – 23 January 2027'],
  ['14 - 16 January 2027', '21 – 23 January 2027'],
  ['14–16 Jan 2027', '21–23 Jan 2027'],
  ['14-16 Jan 2027', '21–23 Jan 2027'],
  ['14 – 16 Jan 2027', '21 – 23 Jan 2027'],
  ['14–16 Jan', '21–23 Jan'],
  ['14-16 Jan', '21–23 Jan'],
  ['14, 15 & 16 January 2027', '21, 22 & 23 January 2027'],
  ['14, 15, and 16 January 2027', '21, 22, and 23 January 2027'],
  ['14 to 16 January 2027', '21 to 23 January 2027'],
  ['January 14–16, 2027', 'January 21–23, 2027'],
  ['January 14-16, 2027', 'January 21–23, 2027'],
  ['Jan 14–16, 2027', 'Jan 21–23, 2027'],
  ['Jan 14-16, 2027', 'Jan 21–23, 2027'],
  ['Nov 27–29, 2026', 'January 21–23, 2027'],
  ['Nov 27-29, 2026', 'January 21–23, 2027'],

  // Two-day sub-ranges & setup dates
  ['13–14 January 2027', '20–21 January 2027'],
  ['13-14 January 2027', '20–21 January 2027'],
  ['14–15 January 2027', '21–22 January 2027'],
  ['14-15 January 2027', '21–22 January 2027'],
  ['15–16 January 2027', '22–23 January 2027'],
  ['15-16 January 2027', '22–23 January 2027'],
  ['13 January 2027', '20 January 2027'],
  ['13 Jan 2027', '20 Jan 2027'],

  // Individual festival days
  ['14 Jan 2027 (Uttarayan)', '21 Jan 2027'],
  ['14 January 2027 (Uttarayan)', '21 January 2027'],
  ['14 January 2027', '21 January 2027'],
  ['15 January 2027', '22 January 2027'],
  ['16 January 2027', '23 January 2027'],
  ['14 Jan 2027', '21 Jan 2027'],
  ['15 Jan 2027', '22 Jan 2027'],
  ['16 Jan 2027', '23 Jan 2027'],

  // ISO dates
  ['2027-01-14', '2027-01-21'],
  ['2027-01-15', '2027-01-22'],
  ['2027-01-16', '2027-01-23'],

  // Official email & contact sync
  ['purplefestvadodara@gmail.com', 'purplefestivalvadodara@gmail.com'],
  ['info@purplefestvadodara.org', 'purplefestivalvadodara@gmail.com'],
  ['delegate@purplefestvadodara.org', 'purplefestivalvadodara@gmail.com'],
  ['+91 98250 93918', '+91 99743 83920'],
  ['+919825093918', '+919974383920'],
  ['+91-265-242-7700', '+91 99743 83920'],
];

/**
 * Applies all festival date and official .docx metadata replacements to a string.
 * @param {string} str
 * @returns {string}
 */
export function applyDatesAndDocxReplacements(str) {
  if (typeof str !== 'string' || !str) return str;
  let out = str;
  for (const [target, replacement] of DATE_AND_DOCX_REPLACEMENTS) {
    if (out.includes(target)) {
      out = out.split(target).join(replacement);
    }
  }
  return out;
}

export default applyDatesAndDocxReplacements;
