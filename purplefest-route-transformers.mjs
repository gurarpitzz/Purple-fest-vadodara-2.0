import { makeMedia, makePageRef, TERMS_HTML, PRIVACY_HTML } from './purplefest-content-data.mjs';

export function transformRouteSections(slug, sections) {
  switch (slug) {
    case 'index': {
      // [0] ComponentSectionsHomeIntro
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Inclusion, celebrated.';
        d.subtitle = 'Purple Fest Vadodara 2027 · 14–16 January 2027 · Sanskari Nagari Vadodara, Gujarat · Hosted by Praangan & We Are Together (Brotherhood) with GIEN & TISS.';
        d.description = 'India’s landmark festival of inclusion, human dignity, assistive technology, Paralympic sport, and universal design across all 21 Benchmark Disabilities (RPwD Act 2016).';
        d.programs = [
          {
            documentId: 'pf_widget_pass',
            title: '3-Day Delegate Pass',
            value: '₹2,200',
            subtitle: 'Mandatory Registration (No Free Entry)',
            description: 'Full 3-day access to all 6 Experience Zones, GIEN & TISS Conclave, Purple Kaleidoscope & Para-Sports Arena.',
            reverseLabels: true,
            widgetTitle: '3-Day Delegate Pass (Mandatory)',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z'
          },
          {
            documentId: 'pf_widget_stall',
            title: 'Exhibition Stalls (Tiers A–D)',
            value: '₹5.5K–₹35K',
            subtitle: 'Assistive Tech, CSR, Startup & DPO Pavilions',
            description: 'Tier D DPO/NGO ₹5,500 · Tier C Startup ₹12,000 · Tier A Standard ₹15,000 · Tier B Prime Corner ₹35,000.',
            reverseLabels: false,
            widgetTitle: 'Exhibition Stalls (Tiers A–D)',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z'
          }
        ];
        d.medias = [
          makeMedia('indian_pwd_group_transparent.png', 'Indian Persons with Disabilities — Purple Fest Vadodara 2027', 2380, 886),
          makeMedia('indian_pwd_group_transparent.png', 'Indian Persons with Disabilities — Purple Fest Vadodara 2027', 2380, 886)
        ];
        d.button = {
          id: '1349',
          title: 'Apply Now',
          theme: 'primary',
          page: null,
          externalPage: '/apply',
          modal: false
        };
      }

      // [1] ComponentSectionsDefaultMessage
      if (sections[1]?.[3]?.data) {
        const d = sections[1][3].data;
        d.message = 'Born from the International Purple Fest in Goa and carried into Maharaja Sayajirao Gaekwad III’s reform capital Vadodara, Purple Fest 2027 unites 6 Experience Zones, 21 Benchmark Disabilities under the RPwD Act 2016, Indian Paralympic Champions, and global inclusive education leaders.';
        d.links = [
          {
            id: '1350',
            title: 'Explore 3-Day Schedule & 6 Zones',
            theme: 'link',
            page: makePageRef('programs', '3-Day Programme & 6 Zones'),
            externalPage: null,
            modal: false
          }
        ];
      }

      // [2] ComponentSectionsHomeBenefits
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.title = 'Why Purple Fest Vadodara 2027';
        d.media = makeMedia('indian_pwd_group_transparent.png', 'Indian Persons with Disabilities — Purple Fest Vadodara 2027', 2380, 886);
        d.mediaMobile = makeMedia('indian_pwd_group_transparent.png', 'Indian Persons with Disabilities — Purple Fest Vadodara 2027', 2380, 886);
        d.blocks = [
          {
            id: '532',
            title: 'All 21 RPwD Disabilities',
            description: 'Designed from the ground up around all 21 Benchmark Disabilities recognized by India’s Rights of Persons with Disabilities (RPwD) Act 2016—with zero charity framing and 100% human rights dignity.'
          },
          {
            id: '533',
            title: 'Goa Legacy Meets Sanskari Nagari',
            description: 'Bridging the historic International Purple Fest Goa movement with Maharaja Sayajirao Gaekwad III’s 1893 universal education mandate in Vadodara.'
          },
          {
            id: '534',
            title: 'GIEN & TISS Academic Rigor',
            description: 'Co-curated with the Global Inclusive Education Network (GIEN) and Tata Institute of Social Sciences (TISS) to turn Universal Design for Learning (UDL) into policy action.'
          },
          {
            id: '535',
            title: '100% Barrier-Free Architecture',
            description: 'Every stage, stall, washroom, and digital touchpoint enforces IS 4963 1:12 ramps, continuous tactile paving, Indian Sign Language (ISL), Braille directories, and Sensory Sanctuaries.'
          }
        ];
      }

      // [3] ComponentSectionsHomeMetrics
      if (sections[3]?.[3]?.data) {
        const d = sections[3][3].data;
        d.title = 'A National Convergence of Inclusion in Vadodara';
        d.blocks = [
          { id: '536', title: '10,000+', description: 'Registered Delegates, Educators, Innovators & Leaders across 3 Days (14–16 January 2027)' },
          { id: '537', title: '21', description: 'Benchmark Disabilities under the RPwD Act 2016 represented with full accessibility' },
          { id: '538', title: '6 Zones', description: 'Immersive Barrier-Free Experience Zones spanning Tech, Education, Arts, Sports & Nature' },
          { id: '539', title: '100+', description: 'Assistive Technology Exhibitors, DPO Collectives, Universities & CSR Pavilions' }
        ];
      }

      // [4] ComponentSectionsHomePrograms
      if (sections[4]?.[3]?.data) {
        const d = sections[4][3].data;
        d.homeProgramsBlocks = [
          {
            documentId: 'pf_hp_1',
            title: 'Zone 01 · Assistive Tech & Startup Expo',
            requirements: [
              { id: '210', title: 'AI Screen Readers & Refreshable Braille' },
              { id: '211', title: 'Bionic Prosthetics & All-Terrain Wheelchairs' },
              { id: '212', title: 'AAC Speech Devices & Smart Cane Radar' }
            ],
            variants: [],
            value: 'Tier A–D Stalls',
            subtitle: 'Starting at',
            description: 'Hands-on assistive technology showcase featuring 100+ startups, ALIMCO, IIT R&D labs, and grassroots DPOs. Stalls available in Tier D (₹5,500), Tier C (₹12,000), Tier A (₹15,000), and Tier B (₹35,000).',
            reverseLabels: true,
            widgetTitle: 'Assistive Tech Expo',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z',
            media: makeMedia('purple_expo.jpg', 'Assistive Technology & Bionic Prosthetics Expo', 2560, 1440),
            mediaMobile: makeMedia('purple_expo_mobile.jpg', 'Assistive Technology & Bionic Prosthetics Expo', 750, 1300),
            button: {
              id: '1396',
              title: 'Explore All 6 Zones',
              theme: null,
              page: makePageRef('programs', '3-Day Programme & 6 Zones'),
              externalPage: null,
              modal: false
            }
          },
          {
            documentId: 'pf_hp_2',
            title: 'Zone 02 · GIEN & TISS Inclusive Education Summit',
            requirements: [
              { id: '213', title: 'Universal Design for Learning (UDL) Labs' },
              { id: '214', title: 'NEP 2020 & RPwD Section 16 Implementation' },
              { id: '215', title: 'School Principal & Special Educator Roundtables' }
            ],
            variants: [],
            value: '₹2,200 Pass',
            subtitle: 'Included with',
            description: 'International academic conclave led by Prof. Anita Julka (GIEN), Prof. Bipin Jojo (TISS Mumbai), and Dr. Satendra Singh—equipping mainstream schools and universities with barrier-free pedagogy.',
            reverseLabels: true,
            widgetTitle: 'GIEN & TISS Summit',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z',
            media: makeMedia('pf_doc_isl_classroom.jpg', 'Indian Sign Language (ISL) Inclusive Classroom — GIEN & TISS Summit', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_isl_classroom.jpg', 'Indian Sign Language (ISL) Inclusive Classroom — GIEN & TISS Summit', 2560, 1440),
            button: {
              id: '1395',
              title: 'GIEN & Barrier-Free Specs',
              theme: null,
              page: makePageRef('composyte', 'GIEN & Barrier-Free Tech'),
              externalPage: null,
              modal: false
            }
          },
          {
            documentId: 'pf_hp_3',
            title: 'Zone 03 · Purple Kaleidoscope & Abhivyakti',
            requirements: [
              { id: '216', title: 'Wheelchair Bharatanatyam & Garba Raas' },
              { id: '217', title: 'ISL Sign-Song Symphony & Tactile Art Gallery' },
              { id: '218', title: 'Adaptive Fashion Runway & Accessible Cinema' }
            ],
            variants: [],
            value: '3 Evenings',
            subtitle: 'Live across',
            description: 'Evening cultural festival celebrating disabled classical dancers, Deaf theatre ensembles, blind percussionists, neurodivergent painters, and audio-described cinema under Vadodara’s Banyan canopy.',
            reverseLabels: true,
            widgetTitle: 'Purple Kaleidoscope',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z',
            media: makeMedia('purple_fest_hero.jpg', 'Wheelchair Cultural Dance Performance — Purple Kaleidoscope Stage', 2560, 1440),
            mediaMobile: makeMedia('purple_fest_hero_mobile.jpg', 'Wheelchair Cultural Dance Performance — Purple Kaleidoscope Stage', 750, 1300),
            button: {
              id: '1394',
              title: 'View Cultural Schedule',
              theme: null,
              page: makePageRef('programs', '3-Day Programme & 6 Zones'),
              externalPage: null,
              modal: false
            }
          },
          {
            documentId: 'pf_hp_4',
            title: 'Zone 04 · Para-Sports Arena & Champions',
            requirements: [
              { id: '219', title: 'Wheelchair Basketball, Boccia & Blind Football' },
              { id: '220', title: 'Sitting Volleyball, Para-Table Tennis & Para-Chess' },
              { id: '221', title: 'Meet Indian Paralympic Gold & Silver Medallists' }
            ],
            variants: [],
            value: '8+ Champions',
            subtitle: 'Honoring',
            description: 'High-octane adaptive sports tournaments and athlete clinics honoring Avani Lekhara, Sumit Antil, Devendra Jhajharia, Sheetal Devi, Dr. Deepa Malik, Bhavina Patel, Mariyappan Thangavelu & Praveen Kumar.',
            reverseLabels: false,
            widgetTitle: 'Para-Sports Arena',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z',
            media: makeMedia('purple_sports.jpg', 'Paralympic Wheelchair Basketball Championship — Para-Sports Arena', 2560, 1440),
            mediaMobile: makeMedia('purple_sports_mobile.jpg', 'Paralympic Wheelchair Basketball Championship — Para-Sports Arena', 750, 1300),
            button: {
              id: '1393',
              title: 'Meet Paralympic Champions',
              theme: null,
              page: makePageRef('tier-1-program', 'Paralympic Champions'),
              externalPage: null,
              modal: false
            }
          }
        ];
      }

      // [5] ComponentSectionsCalculatorDscr (Removed)
      if (sections[5]?.[3]?.data) {
        const d = sections[5][3].data;
        d.title = '';
        d.page = null;
      }

      // [6] ComponentSectionsHomeSteps
      if (sections[6]?.[3]?.data) {
        const d = sections[6][3].data;
        d.title = 'Four Steps to Join Purple Fest Vadodara 2027';
        d.description = 'Every participant attends as a registered delegate or exhibitor so we can guarantee uncompromised physical, sensory, and linguistic accessibility across all 3 days.';
        d.homeStepsBlocks = [
          {
            id: '546',
            label: '01',
            title: 'Choose Your Track',
            description: 'Select the Mandatory 3-Day Delegate Pass (₹2,200 per person — no free casual visitor entry) or an Exhibition Stall in Tier A (₹15,000), Tier B (₹35,000), Tier C (₹12,000), or Tier D (₹5,500).'
          },
          {
            id: '547',
            label: '02',
            title: 'Declare RPwD Accommodations',
            description: 'Indicate your requirements across all 21 Benchmark Disabilities (RPwD Act 2016)—including ISL interpretation, Braille/large-print kits, wheelchair charging, tactile escort, or sensory sanctuary access.'
          },
          {
            id: '548',
            label: '03',
            title: 'Receive QR + Braille Credential',
            description: 'Receive your instant festival confirmation, accessible Vadodara travel & hotel guide, and QR + Grade-1 Braille embossed Delegate Credential.'
          },
          {
            id: '549',
            label: '04',
            title: 'Converge in Vadodara (14–16 Jan 2027)',
            description: 'Experience 3 unforgettable days of assistive innovation, GIEN & TISS dialogues, Paralympic sport, and Purple Kaleidoscope cultural nights in Sanskari Nagari.'
          }
        ];
        d.button = {
          id: '1355',
          title: 'Apply Now',
          theme: 'primary',
          page: null,
          externalPage: '/apply',
          modal: false
        };
      }

      // [7] ComponentSectionsTestimonials
      if (sections[7]?.[3]?.data) {
        const d = sections[7][3].data;
        d.title = 'Voices of the Purple Movement';
        d.testimonialBlocks = [
          {
            id: '550',
            author: 'Dr. Satendra Singh',
            title: '“Purple Fest is not about sympathy or charity; it is a declaration of human dignity, joyful rebellion, and constitutional equality under the RPwD Act 2016.”',
            authorInfo: 'Co-Chair, Scientific Committee · Founder, Doctors with Disabilities'
          },
          {
            id: '551',
            author: 'Satish Kapoor',
            title: '“From New Delhi and Goa to Maharaja Sayajirao’s Vadodara, We Are Together (Brotherhood) and Praangan are proving that true inclusion leaves none of the 21 disabilities behind.”',
            authorInfo: 'Founder President, We Are Together (Brotherhood) · National Convenor'
          },
          {
            id: '552',
            author: 'Prof. Anita Julka',
            title: '“When educators, assistive technologists, and disabled youth sit as equals in the same pavilion, Universal Design for Learning stops being a theory and becomes lived reality.”',
            authorInfo: 'President, Global Inclusive Education Network (GIEN) · Former Dean, NCERT'
          },
          {
            id: '553',
            author: 'Guruprasad Pawaskar',
            title: '“The International Purple Fest in Goa ignited a national flame. Seeing Vadodara carry that torch with uncompromising barrier-free standards is a milestone for India.”',
            authorInfo: 'State Commissioner for Persons with Disabilities, Government of Goa'
          }
        ];
      }

      // [8] ComponentSectionsHomeTech
      if (sections[8]?.[3]?.data) {
        const d = sections[8][3].data;
        d.title = 'Engineered for Universal Accessibility';
        d.description = 'Built to WCAG 2.1 AA+, IS 4963, and Harmonised Guidelines 2021 so every physical and digital space works effortlessly for all 21 Benchmark Disabilities.';
        d.homeTechBlocks = [
          {
            id: '554',
            title: 'IS 4963 1:12 Ramps & Tactile Corridors',
            description: 'Zero-step thresholds, 1500 mm wheelchair turning circles, dual-height handrails, and continuous blister/corduroy tactile paving across all 6 zones.'
          },
          {
            id: '555',
            title: 'Live ISL, Open Captions & Audio Description',
            description: 'Dedicated spotlighted Indian Sign Language (ISL) interpreters, real-time speech-to-text LED captioning, and FM audio description on every stage.'
          },
          {
            id: '556',
            title: 'Zone 05 · Sensory Sanctuary & Neuro-Affirming Pods',
            description: 'Acoustically buffered <45 dB decompression suites with dimmable circadian lighting, weighted blankets, and AAC communication boards.'
          },
          {
            id: '557',
            title: ' Zone 06 · Accessible Heritage & Birding Trail',
            description: 'Wheelchair-accessible eco-trails with 3D-printed tactile bird models, ornithological audio guides, and Laxmi Vilas / Sayaji Baug heritage circuits.'
          }
        ];
        d.button = {
          id: '1356',
          title: 'Explore All 21 RPwD Accommodations',
          theme: 'primary',
          page: makePageRef('other-services', '21 RPwD Disabilities'),
          externalPage: null,
          modal: false
        };
        d.media = makeMedia('final.mp4', 'Purple Fest Vadodara 2027 Official Film');
      }

      // [9] ComponentSectionsCta
      if (sections[9]?.[3]?.data) {
        const d = sections[9][3].data;
        d.title = 'Ready to Join Purple Fest Vadodara 2027?';
        d.description = 'Secure your mandatory ₹2,200 3-Day Delegate Pass or book your Tier A–D Exhibition Stall for 14–16 January 2027 in Sanskari Nagari Vadodara.';
        d.buttons = [
          {
            id: '1357',
            title: 'Apply Now',
            theme: 'primary',
            page: null,
            externalPage: '/apply',
            modal: false
          }
        ];
      }
      break;
    }

    case 'about-us': {
      // [0] ComponentSectionsIntroDefault (stacked_building sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'From Goa’s Global Mandate to Sanskari Nagari Vadodara';
        d.description = 'Purple Fest Vadodara 2027 (14–16 January 2027) unites Praangan (Vadodara), We Are Together (Brotherhood), GIEN, TISS, DEPwD (Govt. of India), and the Goa State Commissioner’s Office to build a barrier-free India.';
        d.button = {
          id: '1361',
          title: 'Apply Now',
          theme: null,
          page: null,
          externalPage: '/apply',
          modal: false
        };
      }

      // [1] ComponentSectionsHomeSteps
      if (sections[1]?.[3]?.data) {
        const d = sections[1][3].data;
        d.title = 'Our Four Foundational Pillars';
        d.homeStepsBlocks = [
          {
            id: '558',
            label: null,
            title: 'Nothing About Us, Without Us',
            description: 'Persons with disabilities across all 21 RPwD categories lead every curatorial committee, plenary panel, cultural stage, and accessibility audit.'
          },
          {
            id: '559',
            label: null,
            title: 'Sayajirao Gaekwad III’s Reform Heritage',
            description: 'Rooted in Vadodara’s 130-year legacy of pioneering compulsory universal education (1893), inclusive libraries, and progressive social justice.'
          },
          {
            id: '560',
            label: null,
            title: 'Universal Design by Default',
            description: 'Accessibility is never an afterthought—every physical ramp, Braille directory, ISL interpreter, and sensory pod is engineered before day one.'
          },
          {
            id: '561',
            label: null,
            title: 'Coalition-Driven Policy Impact',
            description: 'Connecting grassroots DPOs with TISS, GIEN, DEPwD, and CSR leaders to translate festival dialogues into measurable education and livelihood outcomes.'
          }
        ];
      }

      // [2] ComponentSectionsDefaultMessage
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.message = 'What began in Panaji, Goa as India’s first international celebration of persons with disabilities now expands to Western India’s cultural & academic hub—bringing 10,000+ delegates, 21 RPwD categories, and 6 Experience Zones to Vadodara on 14–16 January 2027 in alignment with Hon’ble PM Shri Narendra Modi’s vision of Viksit Bharat @ 2047.';
        d.links = [
          {
            id: '13619',
            title: 'Explore Viksit Bharat @ 2047 Vision',
            theme: 'link',
            page: makePageRef('viksit-bharat', 'Viksit Bharat @ 2047'),
            externalPage: null,
            modal: false
          }
        ];
      }

      // [3] ComponentSectionsTimeline
      if (sections[3]?.[3]?.data) {
        const d = sections[3][3].data;
        d.timelineBlocks = [
          {
            id: '562',
            label: '1893 · Vadodara',
            title: 'Maharaja Sayajirao Gaekwad III’s Universal Education Mandate',
            description: 'Baroda State becomes the first territory in India to introduce free and compulsory primary education and public library networks accessible to every citizen—laying the philosophical bedrock of Sanskari Nagari.'
          },
          {
            id: '563',
            label: '2016 · Parliament of India',
            title: 'Enactment of the RPwD Act 2016 (21 Benchmark Disabilities)',
            description: 'India expands statutory recognition from 7 to 21 Benchmark Disabilities—aligning domestic law with the UNCRPD mandate of non-discrimination, inclusive education (Section 16), and barrier-free infrastructure.'
          },
          {
            id: '564',
            label: '2023 · Panaji, Goa',
            title: 'Inaugural Purple Fest Goa Ignites a National Movement',
            description: 'The Office of the State Commissioner for Persons with Disabilities, Goa, together with We Are Together (Brotherhood) and DEPwD, launches India’s first large-scale celebration of disability pride, sport, and culture.'
          },
          {
            id: '565',
            label: '2024 · International Purple Fest Goa',
            title: 'Global Convergence of Assistive Tech, Paralympic Sport & GIEN',
            description: 'Over 12,000 delegates from across India and the world gather in Goa for the International Purple Fest—establishing the gold standard for barrier-free public festivals and inclusive education summits.'
          },
          {
            id: '566',
            label: '2025–2026 · Vadodara Coalition',
            title: 'Praangan, Brotherhood, GIEN & TISS Forge the Vadodara Charter',
            description: 'Praangan (Vadodara) and We Are Together (Brotherhood) unite with the Global Inclusive Education Network (GIEN) and Tata Institute of Social Sciences (TISS) to bring Purple Fest to Gujarat.'
          },
          {
            id: '567',
            label: '14–16 Jan 2027 · Vadodara',
            title: 'Purple Fest Vadodara 2027: Celebrating Inclusion, Dignity & Accessibility',
            description: 'Three historic days across 6 Experience Zones in Vadodara—featuring 100+ assistive tech & DPO stalls (Tiers A–D), Indian Paralympic Champions, GIEN & TISS plenaries, and Purple Kaleidoscope.'
          }
        ];
      }

      // [4] ComponentSectionsTeam
      if (sections[4]?.[3]?.data) {
        const d = sections[4][3].data;
        d.title = 'Organising Committee & 6-Institution Coalition';
        d.description = 'Guided by disabled clinician-activists, national disability rights pioneers, inclusive education scholars, and institutional partners.';
        d.media = makeMedia('indian_pwd_group_transparent.png', 'Indian Persons with Disabilities — Purple Fest Vadodara 2027', 2380, 886);
        d.teamBlocks = [
          {
            id: '568',
            firstName: 'Dr. Satendra',
            lastName: 'Singh',
            position: 'Co-Chair, Scientific & Academic Committee · Director-Professor, UCMS Delhi · Henry Viscardi Achievement Awardee',
            socials: [{ id: '579', link: 'https://www.linkedin.com/', type: 'linkedin' }],
            media: makeMedia('purple_logo_transparent.png', 'Dr. Satendra Singh', 800, 1000)
          },
          {
            id: '569',
            firstName: 'Satish',
            lastName: 'Kapoor',
            position: 'National Convenor · Founder President, We Are Together (Brotherhood, New Delhi) · Co-Architect of Purple Fest',
            socials: [{ id: '580', link: 'https://www.linkedin.com/', type: 'linkedin' }],
            media: makeMedia('BH LOGO.jpg.jpeg', 'Satish Kapoor · Brotherhood', 800, 1000)
          },
          {
            id: '570',
            firstName: 'Praangan',
            lastName: 'Vadodara Secretariat',
            position: 'Host Institution · Inclusive Education, Cultural & Community Action Collective, Vadodara, Gujarat',
            socials: [{ id: '581', link: 'https://www.instagram.com/', type: 'instagram' }],
            media: makeMedia('PARANGAN LOGO.jpg.jpeg', 'Praangan Vadodara', 800, 1000)
          },
          {
            id: '571',
            firstName: 'Prof. Anita',
            lastName: 'Julka',
            position: 'Academic Chair · President, Global Inclusive Education Network (GIEN) · Former Dean of Research, NCERT',
            socials: [{ id: '582', link: 'https://www.linkedin.com/', type: 'linkedin' }],
            media: makeMedia('GIEN FINAL LOGO.jpg.jpeg', 'Prof. Anita Julka · GIEN', 800, 1000)
          },
          {
            id: '572',
            firstName: 'Prof. Bipin',
            lastName: 'Jojo',
            position: 'Academic Partner Lead · Tata Institute of Social Sciences (TISS Mumbai) · Inclusive Policy & Social Justice',
            socials: [{ id: '583', link: 'https://www.linkedin.com/', type: 'linkedin' }],
            media: makeMedia('gien_logo_rgb.jpg', 'Prof. Bipin Jojo · TISS', 800, 1000)
          },
          {
            id: '573',
            firstName: 'Guruprasad',
            lastName: 'Pawaskar',
            position: 'State Commissioner for Persons with Disabilities, Govt. of Goa · International Purple Fest Goa Mentor',
            socials: [{ id: '584', link: 'https://www.linkedin.com/', type: 'linkedin' }],
            media: makeMedia('GOA_BH_LOGO-removebg-preview.png', 'Guruprasad Pawaskar · Goa Commissioner', 800, 1000)
          },
          {
            id: '574',
            firstName: 'Taha',
            lastName: 'Haaziq',
            position: 'Secretary, Office of the State Commissioner for PwDs, Goa · Accessibility & Assistive Tech Advisor',
            socials: [{ id: '585', link: 'https://www.linkedin.com/', type: 'linkedin' }],
            media: makeMedia('GOA_BH_LOGO-removebg-preview.png', 'Taha Haaziq', 800, 1000)
          },
          {
            id: '575',
            firstName: 'DEPwD',
            lastName: 'Ministry of Social Justice',
            position: 'National Policy Alignment · Department of Empowerment of Persons with Disabilities, Government of India',
            socials: [],
            media: makeMedia('LOGO 2 (1).jpg.jpeg', 'DEPwD National Alignment', 800, 1000)
          },
          {
            id: '576',
            firstName: 'Shri Narendra',
            lastName: 'Modi (Viksit Bharat @ 2047)',
            position: 'National Inspiration · Hon’ble Prime Minister of India · Chief Architect of Viksit Bharat @ 2047, Sugamya Bharat Abhiyan & Divyangjan Dignity',
            socials: [],
            media: makeMedia('pm_narendra_modi_official.jpg', 'Hon’ble Prime Minister Shri Narendra Modi', 800, 1000)
          },
          {
            id: '577',
            firstName: 'Viksit Bharat',
            lastName: '@ 2047 Sankalp',
            position: 'National Centenary Mandate (1947–2047) · 100% Barrier-Free Infrastructure, Assistive Deep-Tech & Paralympic Excellence Across All 21 RPwD Disabilities',
            socials: [],
            media: makeMedia('viksit_bharat_2047_logo.png', 'Viksit Bharat @ 2047 Official Emblem', 800, 1000)
          }
        ];
      }

      // [5] ComponentSectionsCta (smile sequence)
      if (sections[5]?.[3]?.data) {
        const d = sections[5][3].data;
        d.title = 'Be Part of History in Sanskari Nagari Vadodara';
        d.description = 'Register your ₹2,200 3-Day Delegate Pass or book an Exhibition Stall (Tier A–D) to join 10,000+ changemakers on 14–16 January 2027.';
        d.buttons = [
          {
            id: '1362',
            title: 'Apply Now',
            theme: 'primary',
            page: null,
            externalPage: '/apply',
            modal: false
          }
        ];
      }
      break;
    }

    case 'viksit-bharat': {
      // [0] ComponentSectionsIntroDefault (stacked_building sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Viksit Bharat @ 2047: Divyangjan at the Heart of Developed India';
        d.description = 'Inspired by Hon’ble Prime Minister Shri Narendra Modi’s national vision of Viksit Bharat @ 2047 and Sugamya Bharat Abhiyan—transforming India from welfare to human dignity, assistive deep-tech, and Paralympic excellence across all 21 Benchmark Disabilities.';
        d.button = {
          id: '13610',
          title: 'Apply Now',
          theme: null,
          page: null,
          externalPage: '/apply',
          modal: false
        };
      }

      // [1] ComponentSectionsHomeSteps
      if (sections[1]?.[3]?.data) {
        const d = sections[1][3].data;
        d.title = 'Four Foundational Aims of Viksit Bharat @ 2047';
        d.homeStepsBlocks = [
          {
            id: '1558',
            label: '01',
            title: 'Sugamya Bharat Abhiyan (100% Barrier-Free India)',
            description: 'Universal accessibility across built infrastructure, public transport (Amrit Bharat Stations & accessible airports), and digital public infrastructure (WCAG 2.1 AA+ & IS 4963).'
          },
          {
            id: '1559',
            label: '02',
            title: 'From Viklang to Divyangjan: Constitutional Dignity (RPwD Act 2016)',
            description: 'Hon’ble PM Shri Narendra Modi’s historic shift recognizing Divyangjan (Persons with Divine Ability) and expanding statutory rights from 7 to 21 Benchmark Disabilities.'
          },
          {
            id: '1560',
            label: '03',
            title: 'Atmanirbhar Assistive Tech & Inclusive Education (NEP 2020)',
            description: 'Indigenous manufacturing of AI screen readers, bionic prosthetics, and ALIMCO assistive devices paired with NEP 2020 Universal Design for Learning (GIEN & TISS Conclave).'
          },
          {
            id: '1561',
            label: '04',
            title: 'Target Paralympic Podium & Global Sporting Superpower',
            description: 'Empowering India’s Paralympic Champions from Tokyo & Paris to the 2036 India Olympic & Paralympic vision in Gujarat.'
          }
        ];
      }

      // [2] ComponentSectionsDefaultMessage
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.message = '“Sabka Saath, Sabka Vikas, Sabka Vishwas, Sabka Prayas”—under Hon’ble Prime Minister Shri Narendra Modi’s leadership, Divyangjan Sashaktikaran stands at the core of Viksit Bharat @ 2047, uniting Sugamya Bharat Abhiyan, the RPwD Act 2016 (21 Benchmark Disabilities), and Purple Fest Vadodara 2027 (14–16 January 2027).';
        d.links = [
          {
            id: '13611',
            title: 'Explore All 21 RPwD Disabilities',
            theme: 'link',
            page: makePageRef('other-services', '21 RPwD Disabilities'),
            externalPage: null,
            modal: false
          }
        ];
      }

      // [3] ComponentSectionsTimeline
      if (sections[3]?.[3]?.data) {
        const d = sections[3][3].data;
        d.timelineBlocks = [
          {
            id: '1562',
            label: '2014 · Vadodara & New Delhi',
            title: 'Shri Narendra Modi Elected from Vadodara; Coins “Divyangjan”',
            description: 'Shri Narendra Modi is elected to the 16th Lok Sabha from Vadodara & Varanasi and coins “Divyangjan” (Persons with Divine Ability) to transform national mindset from sympathy to constitutional respect.'
          },
          {
            id: '1563',
            label: '2015 · Sugamya Bharat Abhiyan',
            title: 'Launch of the Accessible India Campaign',
            description: 'Launch of the Accessible India Campaign (Sugamya Bharat Abhiyan) for barrier-free buildings, public transport corridors, and accessible digital ecosystems.'
          },
          {
            id: '1564',
            label: '2016 · RPwD Act 2016',
            title: 'Parliament Enacts Rights of Persons with Disabilities Act (21 Disabilities)',
            description: 'Parliament enacts the Rights of Persons with Disabilities Act covering 21 Benchmark Disabilities, expanding reservations in higher education (5%) and government jobs (4%).'
          },
          {
            id: '1565',
            label: '2020 · NEP 2020 Inclusive Pedagogy',
            title: 'National Education Policy Mandates Barrier-Free Learning',
            description: 'National Education Policy 2020 mandates barrier-free, equitable education, Indian Sign Language (ISL) standardization, and Universal Design for Learning from foundational to higher learning.'
          },
          {
            id: '1566',
            label: '2024 · Historic Paris Paralympics & International Purple Fest',
            title: 'PM Modi Felicitates India’s Record-Breaking 29-Medal Paralympic Contingent',
            description: 'Hon’ble PM Shri Narendra Modi felicitates India’s record-breaking 29-medal Paris 2024 Paralympic contingent and champions the International Purple Fest movement.'
          },
          {
            id: '1567',
            label: '2027 → 2047 · Purple Fest Vadodara to Viksit Bharat @ 100',
            title: 'Sanskari Nagari Vadodara Hosts Purple Fest (14–16 Jan 2027) Toward 2047',
            description: 'Sanskari Nagari Vadodara hosts Purple Fest (14–16 Jan 2027) across 6 Barrier-Free Experience Zones as a flagship national milestone toward a 100% inclusive Developed India by 2047.'
          }
        ];
      }

      // [4] ComponentSectionsTeam
      if (sections[4]?.[3]?.data) {
        const d = sections[4][3].data;
        d.title = 'Hon’ble PM Shri Narendra Modi & Viksit Bharat @ 2047 Visual Showcase';
        d.description = 'Official visual chronicle of Hon’ble Prime Minister Shri Narendra Modi’s national missions for Divyangjan Sashaktikaran, Sugamya Bharat Abhiyan, assistive technology self-reliance, and Paralympic glory.';
        d.media = makeMedia('viksit_bharat_2047_banner.jpg', 'Hon’ble Prime Minister Shri Narendra Modi with Indian Paralympic Contingent — Viksit Bharat @ 2047', 2000, 1266);
        d.teamBlocks = [
          {
            id: '1568',
            firstName: 'Shri Narendra',
            lastName: 'Modi',
            position: 'Hon’ble Prime Minister of India · Visionary Architect of Viksit Bharat @ 2047, Sugamya Bharat Abhiyan & Divyangjan Sashaktikaran',
            socials: [],
            media: makeMedia('pm_narendra_modi_official.jpg', 'Hon’ble Prime Minister Shri Narendra Modi', 800, 1000)
          },
          {
            id: '1569',
            firstName: 'Viksit Bharat',
            lastName: '@ 2047 Sankalp',
            position: 'National Centenary Mission (1947–2047) · 100% Barrier-Free Infrastructure, Inclusive Growth & Dignity for All 21 Benchmark Disabilities',
            socials: [],
            media: makeMedia('viksit_bharat_2047_logo.png', 'Viksit Bharat @ 2047 Official Emblem', 800, 1000)
          },
          {
            id: '1570',
            firstName: 'Paris & Tokyo',
            lastName: 'Paralympic Champions',
            position: 'Hon’ble PM Shri Narendra Modi Felicitating India’s Record-Breaking Paralympic Medallists under Target Olympic & Paralympic Podium Scheme',
            socials: [],
            media: makeMedia('pm_modi_divyangjan_paralympians.jpg', 'PM Narendra Modi with Indian Paralympic Champions', 800, 1000)
          },
          {
            id: '1571',
            firstName: 'Sugamya Bharat',
            lastName: 'Abhiyan & ADIP',
            position: 'Accessible India Campaign & ALIMCO Assistive Device Distribution · Empowering Millions of Divyangjan with Modern Mobility & Digital Aids',
            socials: [],
            media: makeMedia('viksit_bharat_sugamya_bharat.jpg', 'PM Narendra Modi distributing assistive devices to Divyangjan', 800, 1000)
          },
          {
            id: '1572',
            firstName: 'Gujarat & Vadodara',
            lastName: 'Divyangjan Mission',
            position: 'PM Narendra Modi Interacting with Divyangjan Youth in Gujarat · Carrying Forward Vadodara’s Reform Heritage to the 2036 Paralympic Vision',
            socials: [],
            media: makeMedia('pm_modi_gujarat_divyangjan.jpg', 'PM Narendra Modi interacting with Divyangjan children in Gujarat', 800, 1000)
          },
          {
            id: '1573',
            firstName: 'Nari Shakti &',
            lastName: 'Purple Sports Icons',
            position: 'Hon’ble PM Shri Narendra Modi Honoring Paralympic Trailblazer Dr. Deepa Malik & Women Para-Athletes Leading Adaptive Sports Across India',
            socials: [],
            media: makeMedia('pm_modi_deepa_malik_paralympics.jpg', 'PM Narendra Modi felicitating Paralympic medallist Dr. Deepa Malik', 800, 1000)
          },
          {
            id: '1574',
            firstName: 'DEPwD',
            lastName: 'Ministry of Social Justice',
            position: 'Department of Empowerment of Persons with Disabilities, Government of India · RPwD Act 2016, UDID Card & National Divyangjan Mission',
            socials: [],
            media: makeMedia('LOGO 2 (1).jpg.jpeg', 'DEPwD National Alignment', 800, 1000)
          },
          {
            id: '1575',
            firstName: 'Vadodara’s Sankalp',
            lastName: 'for 2047',
            position: 'Purple Fest Vadodara 2027 (14–16 January 2027) · Praangan, We Are Together (Brotherhood), GIEN & TISS Co-Architecting an Inclusive India',
            socials: [],
            media: makeMedia('PARANGAN LOGO.jpg.jpeg', 'Purple Fest Vadodara 2027 Sankalp for 2047', 800, 1000)
          }
        ];
      }

      // [5] ComponentSectionsCta (smile sequence)
      if (sections[5]?.[3]?.data) {
        const d = sections[5][3].data;
        d.title = 'Advance Viksit Bharat @ 2047 at Purple Fest Vadodara 2027';
        d.description = 'Register your mandatory ₹2,200 3-Day Delegate Pass or book an Exhibition Stall (Tier A–D) to join 10,000+ changemakers in Sanskari Nagari Vadodara on 14–16 January 2027.';
        d.buttons = [
          {
            id: '13612',
            title: 'Apply Now',
            theme: 'primary',
            page: null,
            externalPage: '/apply',
            modal: false
          }
        ];
      }
      break;
    }

    case 'programs': {
      // [0] ComponentSectionsIntroDefault (key sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = '3-Day Festival Schedule & 6 Experience Zones';
        d.description = '14–16 January 2027 · Vadodara, Gujarat. Every ₹2,200 Delegate Pass unlocks all 3 festival days and all 6 barrier-free Experience Zones.';
        d.button = {
          id: '1369',
          title: 'Apply Now',
          theme: null,
          page: null,
          externalPage: '/apply',
          modal: false
        };
      }

      // [1] <section> containing ProgramBlock children
      const containerDiv = sections[1]?.[3]?.children?.[3]?.children?.[3]?.children;
      if (containerDiv?.[3]?.children && Array.isArray(containerDiv[3].children)) {
        const progTag = containerDiv[3].children[0][1]; // "$La" in .rsc, "$L13" in .html
        const blocksData = [
          {
            documentId: 'pf_prog_day1',
            title: 'Day 1 · 14 Jan 2027 (Uttarayan): Grand Inauguration & Assistive Tech Launch',
            requirementsList: [
              { id: '173', title: '09:00 AM Registration & Braille Kits' },
              { id: '174', title: '10:30 AM Grand Inaugural Plenary' },
              { id: '175', title: '06:30 PM Purple Kaleidoscope Opening Night' }
            ],
            features: [
              { id: '1983', title: '09:00 AM – 10:30 AM', description: 'Delegate Credentialing (₹2,200 Pass), Braille/ISL Kit Distribution & Inclusive Uttarayan Kite Utsav' },
              { id: '1984', title: '10:30 AM – 01:00 PM', description: 'Grand Inauguration: Goa-to-Vadodara Torch Relay & Opening of Zone 01 Assistive Tech Expo (100+ Stalls)' },
              { id: '1985', title: '02:00 PM – 05:00 PM', description: 'GIEN & TISS Plenary I: RPwD Act 2016 at 10 Years — Universal Design for Learning (UDL) in Indian Schools' },
              { id: '1986', title: '03:30 PM – 06:00 PM', description: 'Zone 04 Para-Sports Arena Kickoff: National Wheelchair Basketball & Boccia Opening Rounds' },
              { id: '1987', title: '06:30 PM – 09:00 PM', description: 'Zone 03 Purple Kaleidoscope Gala: Wheelchair Classical Dance, Deaf Theatre & Inclusive Garba Raas' }
            ],
            media: makeMedia('purple_fest_hero.jpg', 'Day 1 Grand Inauguration & Wheelchair Cultural Dance', 2560, 1440),
            mediaMobile: makeMedia('purple_fest_hero_mobile.jpg', 'Day 1 Grand Inauguration & Wheelchair Cultural Dance', 750, 1300),
            variants: []
          },
          {
            documentId: 'pf_prog_day2',
            title: 'Day 2 · 15 Jan 2027: Paralympic Champions Conclave, GIEN Labs & Startup Pitch',
            requirementsList: [
              { id: '176', title: '09:30 AM GIEN & TISS Paper Tracks' },
              { id: '177', title: '11:30 AM Paralympic Champions Dialogue' },
              { id: '178', title: '06:30 PM Adaptive Fashion & Sign Symphony' }
            ],
            features: [
              { id: '1988', title: '09:30 AM – 01:00 PM', description: 'GIEN & TISS Academic Conclave: 4 Parallel Research Tracks on Neurodiversity, Deaf Education, Braille & AAC' },
              { id: '1989', title: '11:30 AM – 01:30 PM', description: 'Indian Paralympic Champions Fireside: Avani Lekhara, Sumit Antil, Devendra Jhajharia, Sheetal Devi & Deepa Malik' },
              { id: '1990', title: '02:30 PM – 05:30 PM', description: 'Assistive Tech Startup Pitch & CSR Schedule VII Matchmaking + Blind Football & Para-Table Tennis Semifinals' },
              { id: '1991', title: '04:00 PM – 06:00 PM', description: 'Sensory Sanctuary Open House & Deafblind Tactile Art Workshop across all 21 RPwD Categories' },
              { id: '1992', title: '06:30 PM – 09:00 PM', description: 'Abhivyakti Night II: Adaptive Fashion Runway, ISL Sign-Song Symphony & Audio-Described Cinema' }
            ],
            media: makeMedia('pf_doc_sheetal_devi_archery.jpg', 'Day 2 Paralympic Champions Conclave — Sheetal Devi & Rakesh Kumar India Para-Archery', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_sheetal_devi_archery.jpg', 'Day 2 Paralympic Champions Conclave — Sheetal Devi & Rakesh Kumar India Para-Archery', 2560, 1440),
            variants: []
          },
          {
            documentId: 'pf_prog_day3',
            title: 'Day 3 · 16 Jan 2027: Accessible Birding Trail, Vadodara Declaration & Finale',
            requirementsList: [
              { id: '179', title: '07:00 AM Accessible Birding & Heritage' },
              { id: '180', title: '11:00 AM Inclusive Youth Parliament' },
              { id: '181', title: '04:30 PM Vadodara Declaration & Awards' }
            ],
            features: [
              { id: '1993', title: '07:00 AM – 09:30 AM', description: 'Zone 06 Accessible Birding Trail & Laxmi Vilas / Sayaji Baug Barrier-Free Heritage Circuit with 3D Tactile Models' },
              { id: '1994', title: '10:30 AM – 01:00 PM', description: 'Inclusive Youth Parliament & DPO National Livelihood Employment Fair (Corporate & PSU Hiring Desk)' },
              { id: '1995', title: '02:00 PM – 04:00 PM', description: 'Zone 04 Para-Sports Championship Finals & Medal Ceremony across 6 Adaptive Disciplines' },
              { id: '1996', title: '04:30 PM – 07:00 PM', description: 'Adoption of the “Vadodara Declaration on 21 Benchmark Disabilities” & Valedictory Concert' }
            ],
            media: makeMedia('pf_doc_national_divyangjan_awards.jpg', 'Day 3 Vadodara Declaration & National Divyangjan Empowerment Awards', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_national_divyangjan_awards.jpg', 'Day 3 Vadodara Declaration & National Divyangjan Empowerment Awards', 2560, 1440),
            variants: []
          },
          {
            documentId: 'pf_zone_1_6',
            title: 'All 6 Barrier-Free Experience Zones (Included in ₹2,200 Pass)',
            requirementsList: [
              { id: '182', title: 'IS 4963 1:12 Ramps' },
              { id: '183', title: 'Live ISL & Braille' },
              { id: '184', title: '21 RPwD Categories' }
            ],
            features: [
              { id: '1997', title: 'Zone 01 · Assistive Tech & Startup Expo', description: '100+ Tier A–D pavilions: AI screen readers, bionic prosthetics, refreshable Braille, smart canes & DPO crafts' },
              { id: '1998', title: 'Zone 02 · GIEN & TISS Inclusive Education Summit', description: 'Plenary halls, UDL model classrooms, NEP 2020 policy clinics & international paper presentations' },
              { id: '1999', title: 'Zone 03 · Purple Kaleidoscope & Abhivyakti', description: 'Wheelchair classical dance, Deaf mime/theatre, blind orchestra, tactile art gallery & audio-described cinema' },
              { id: '2000', title: 'Zone 04 · Para-Sports Arena & Champions', description: 'Wheelchair basketball, boccia, blind football, sitting volleyball, para-table tennis & Paralympic clinics' },
              { id: '2001', title: 'Zone 05 · Sensory Sanctuary & Wellness Lounge', description: '<45 dB acoustic decompression pods, circadian lighting, weighted blankets & neuro-affirming counselors' },
              { id: '2002', title: 'Zone 06 · Accessible Birding & Heritage Trail', description: 'Wheelchair eco-boardwalk, 3D tactile bird sculptures, audio birdcalls & Sayaji Baug heritage tour' }
            ],
            media: makeMedia('pf_doc_adip_divyangjan.jpg', 'All 6 Barrier-Free Experience Zones — Assistive Device & Wheelchair Empowerment for Divyangjan', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_adip_divyangjan.jpg', 'All 6 Barrier-Free Experience Zones — Assistive Device & Wheelchair Empowerment for Divyangjan', 2560, 1440),
            variants: []
          }
        ];

        containerDiv[3].children = blocksData.map((data, idx) => [
          '$',
          progTag,
          String(idx),
          {
            data: {
              ...data,
              value: null,
              subtitle: null,
              description: null,
              reverseLabels: false,
              widgetTitle: null,
              createdAt: '2026-01-14T10:00:00.000Z',
              updatedAt: '2026-01-14T10:00:00.000Z',
              publishedAt: '2026-01-14T10:00:00.000Z'
            },
            className: 'mb-160 2xl:mb-220',
            lastBlock: idx === blocksData.length - 1
          }
        ]);
      }

      // [2] ComponentSectionsCta (leaves sequence)
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.title = 'Secure Your 3-Day Delegate Pass (₹2,200) or Exhibition Stall';
        d.description = 'Mandatory ₹2,200 registration includes all 3 days and all 6 Experience Zones. Exhibitor stalls start at ₹5,500 (Tier D) up to ₹35,000 (Tier B).';
        d.buttons = [
          {
            id: '1370',
            title: 'Apply Now',
            theme: 'primary',
            page: null,
            externalPage: '/apply',
            modal: false
          }
        ];
      }
      break;
    }

    case 'tier-1-program': {
      // [0] ComponentSectionsTierOne (tier sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Indian Paralympic Champions & Purple Sports';
        d.description = 'Celebrating India’s historic 29-medal Paris 2024 & Tokyo 2020 Paralympic Hall of Fame and bringing live adaptive sports championships (Wheelchair Basketball, Boccia, Blind Football, Para-Table Tennis & Sitting Volleyball) to Zone 04 in Vadodara.';
        d.button = {
          id: '1384',
          title: 'Register for Zone 04 Para-Sports · ₹2,200',
          theme: 'primary',
          page: makePageRef('contact', 'Register & Contact'),
          externalPage: null,
          modal: false
        };
        d.blocks = [
          {
            id: '598',
            title: 'Avani Lekhara (SH1 Rifle)\nFirst Indian woman to win back-to-back Paralympic Golds (Tokyo 2020 & Paris 2024, 10m Air Rifle Standing SH1 · Paralympic Record 249.7)'
          },
          {
            id: '599',
            title: 'Sumit Antil (F64 Javelin)\nDouble Paralympic Gold Medallist (Tokyo 2020 & Paris 2024) & World Record holder (73.29m) with a 70.59m Paralympic Record in Paris'
          },
          {
            id: '600',
            title: 'Devendra Jhajharia (F46 Javelin)\nPadma Bhushan & 3-Time Paralympic Medallist (Athens 2004 Gold, Rio 2016 Gold, Tokyo 2020 Silver) · President, Paralympic Committee of India'
          },
          {
            id: '601',
            title: 'Sheetal Devi (Open Compound Archery)\nWorld’s first armless female international para-archery champion · Paris 2024 Paralympic Bronze & Asian Para Games Double Gold'
          },
          {
            id: '602',
            title: 'Dr. Deepa Malik (F53 Shot Put)\nFirst Indian woman Paralympic medallist (Rio 2016 Silver) · Padma Shri & Khel Ratna · Trailblazer of India’s Purple Sports movement'
          },
          {
            id: '603',
            title: 'Bhavina Patel, Mariyappan Thangavelu & Praveen Kumar\nGujarat’s pride Bhavina Patel (Class 4 Table Tennis Silver) alongside High Jump legends Mariyappan Thangavelu (T42/T63) & Praveen Kumar (T64 Gold)'
          }
        ];
      }
      break;
    }

    case 'other-services': {
      // [0] ComponentSectionsOtherService
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'All 21 Benchmark Disabilities (RPwD Act 2016) & Barrier-Free Services';
        d.description = 'Purple Fest Vadodara 2027 is engineered around every single one of the 21 Benchmark Disabilities scheduled in India’s Rights of Persons with Disabilities (RPwD) Act 2016, backed by 8 mandatory on-ground accessibility services.';
        d.button = {
          id: '1371',
          title: 'Request RPwD Accommodations',
          theme: 'primary',
          page: makePageRef('contact', 'Register & Contact'),
          externalPage: null,
          modal: false
        };
        d.media = makeMedia('21disabliltes.png', 'Blind Students Reading Tactile Braille — All 21 Benchmark Disabilities under the RPwD Act 2016', 1920, 1080);
        d.mediaMobile = makeMedia('21disabliltes.png', 'Blind Students Reading Tactile Braille — All 21 Benchmark Disabilities under the RPwD Act 2016', 1920, 1080);
        d.programs = [
          {
            documentId: 'pf_rpwd_cluster_1',
            title: 'Cluster I · Visual & Hearing Sensory Disabilities (#1–#4)',
            requirements: [],
            variants: [],
            value: null,
            subtitle: null,
            description: 'Tactile paving, Grade-1 English/Gujarati Braille directories, audio description FM loops, and spotlighted Indian Sign Language (ISL) interpretation across every stage.',
            reverseLabels: false,
            widgetTitle: null,
            requirementsList: [],
            features: [
              { id: '1139', title: '01. Blindness & 02. Low-Vision', description: 'Continuous blister/corduroy tactile tiles, 3D tactile venue maps, refreshable Braille demos, and trained sighted-guide volunteers.' },
              { id: '1140', title: '03. Leprosy Cured Persons', description: 'Ergonomic seating, zero-pressure grip aids, stigma-free clinical & livelihood advocacy pavilions, and assistive footwear showcases.' },
              { id: '1141', title: '04. Hearing Impairment (Deaf & Hard of Hearing)', description: 'Certified Indian Sign Language (ISL) interpreters on all stages, live LED speech-to-text open captioning, and induction hearing loops.' }
            ],
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z'
          },
          {
            documentId: 'pf_rpwd_cluster_2',
            title: 'Cluster II · Locomotor, Neuromuscular & Physical Disabilities (#5, #6, #10, #11, #20)',
            requirements: [],
            variants: [],
            value: null,
            subtitle: null,
            description: 'IS 4963 1:12 gradient ramps, 1500 mm wheelchair turning circles, lowered 760 mm registration counters, and electric mobility buggies.',
            reverseLabels: false,
            widgetTitle: null,
            requirementsList: [],
            features: [
              { id: '1142', title: '05. Locomotor Disability & 06. Dwarfism', description: 'Step-free stages with 1:12 ramps, dual-height handrails (700 mm & 900 mm), and lowered 760 mm exhibition/dining counters.' },
              { id: '1143', title: '10. Cerebral Palsy & 11. Muscular Dystrophy', description: 'Power-wheelchair charging bays, hoist-equipped accessible washrooms, wide 1800 mm expo aisles, and adaptive seating.' },
              { id: '1144', title: '20. Acid Attack Victims', description: 'Dignity-first livelihood, legal-aid, reconstructive healthcare, and entrepreneurship leadership panels.' }
            ],
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z'
          },
          {
            documentId: 'pf_rpwd_cluster_3',
            title: 'Cluster III · Intellectual, Developmental, Learning & Speech (#7, #8, #9, #13, #15)',
            requirements: [],
            variants: [],
            value: null,
            subtitle: null,
            description: 'Easy-Read visual schedules, Zone 05 Sensory Sanctuary (<45 dB), AAC communication boards, and UDL pedagogy labs.',
            reverseLabels: false,
            widgetTitle: null,
            requirementsList: [],
            features: [
              { id: '1145', title: '07. Intellectual Disability & 09. Autism Spectrum Disorder', description: 'Zone 05 Sensory Sanctuary decompression pods, quiet entry lanes, visual storyboards, and neuro-affirming facilitators.' },
              { id: '1146', title: '08. Mental Illness & Psychosocial Disability', description: 'Peer-support lounges, non-coercive wellness spaces, and community mental health rights dialogues with TISS faculty.' },
              { id: '1147', title: '13. Specific Learning Disabilities (SLD) & 15. Speech/Language', description: 'Dyslexia-friendly typography, multimodal UDL toolkits, and Augmentative & Alternative Communication (AAC) tablet stations.' }
            ],
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z'
          },
          {
            documentId: 'pf_rpwd_cluster_4',
            title: 'Cluster IV · Neurological, Blood Disorders & Multiple Disabilities (#12, #14, #16–#19, #21)',
            requirements: [],
            variants: [],
            value: null,
            subtitle: null,
            description: 'Climate-controlled medical rest bays, cold-chain factor storage, tactile sign interpreters for Deafblindness, and fatigue-free shuttle loops.',
            reverseLabels: false,
            widgetTitle: null,
            requirementsList: [],
            features: [
              { id: '1148', title: '12. Chronic Neurological, 14. Multiple Sclerosis & 21. Parkinson’s Disease', description: 'Frequent shaded rest seating every 30 meters, climate-controlled lounges, tremor-stabilizing dining aids, and priority buggy transit.' },
              { id: '1149', title: '16. Thalassemia, 17. Hemophilia & 18. Sickle Cell Disease', description: 'On-site medical emergency bay with clotting-factor cold storage, hydration stations, and SSG Hospital / Baroda Medical College rapid link.' },
              { id: '1150', title: '19. Multiple Disabilities including Deafblindness', description: 'Dedicated 1:1 pro-tactile sign language interpreters, Haptic/Braille schedules, and priority companion credentialing.' }
            ],
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z'
          }
        ];
      }

      // [1] ComponentSectionsCta (leaves sequence)
      if (sections[1]?.[3]?.data) {
        const d = sections[1][3].data;
        d.title = 'Need Specific RPwD Accommodations in Vadodara?';
        d.description = 'Declare your accessibility requirements when registering for your ₹2,200 Delegate Pass or contact our Accessibility Desk directly.';
        d.buttons = [
          {
            id: '1372',
            title: 'Contact Accessibility Desk',
            theme: 'primary',
            page: makePageRef('contact', 'Register & Contact'),
            externalPage: null,
            modal: false
          }
        ];
      }
      break;
    }

    case 'composyte': {
      // [0] Raw <section> hero + media + 4 BlockWithArrow items
      const containerChildren = sections[0]?.[3]?.children?.[3]?.children;
      if (Array.isArray(containerChildren)) {
        // containerChildren[0] = text-center div with h1, subtitle, button
        const headerChildren = containerChildren[0]?.[3]?.children;
        if (Array.isArray(headerChildren)) {
          // h1 SplitText
          if (headerChildren[0]?.[3]?.children?.[3]) {
            headerChildren[0][3].children[3].children = 'GIEN & TISS Inclusive Education Conclave.';
          }
          // subtitle div
          if (headerChildren[1]?.[3]?.children?.[3]?.dangerouslySetInnerHTML) {
            headerChildren[1][3].children[3].dangerouslySetInnerHTML.__html =
              'Co-curated by the Global Inclusive Education Network (GIEN) and Tata Institute of Social Sciences (TISS)—uniting Universal Design for Learning (UDL), assistive technology, and barrier-free architecture.';
          }
          // button
          const btnArr = headerChildren[2]?.[3]?.children;
          if (Array.isArray(btnArr) && btnArr[0]?.[3]) {
            btnArr[0][3].title = 'Apply Now';
            btnArr[0][3].externalPage = '/apply';
            btnArr[0][3].page = null;
          }
        }
        // containerChildren[1] = hero media wrapper
        const mediaComp = containerChildren[1]?.[3]?.children?.[3]?.children;
        if (mediaComp?.[3]?.media) {
          mediaComp[3].media = makeMedia('pf_doc_braille_terminal.jpg', 'Refreshable Braille Display Terminal & Assistive Keyboard — GIEN & TISS Inclusive Education Conclave', 2560, 1440);
        }
        // containerChildren[2] = grid of 4 BlockWithArrow items
        const blocksArr = containerChildren[2]?.[3]?.children;
        if (Array.isArray(blocksArr)) {
          const newBlocks = [
            {
              id: '1437',
              title: 'Universal Design for Learning (UDL)',
              description: 'Multiple means of engagement, representation, and action/expression so neurodivergent, blind, Deaf, and locomotor-disabled learners thrive in the same classroom.'
            },
            {
              id: '1438',
              title: 'NEP 2020 & RPwD Section 16 Mandate',
              description: 'Actionable roadmaps for school principals, state education boards, and universities to implement statutory barrier-free inclusive education.'
            },
            {
              id: '1439',
              title: 'Assistive Pedagogy & AI Co-Pilots',
              description: 'Live demonstrations of vernacular Indian-language screen readers, refreshable Braille textbooks, ISL digital avatars, and low-cost AAC kits.'
            },
            {
              id: '1440',
              title: 'IS 4963 & WCAG 2.1 AA+ Campus Audits',
              description: 'Engineering blueprints for 1:12 ramps, 1500 mm wheelchair turning circles, tactile corridors, accessible washrooms, and keyboard-first digital portals.'
            }
          ];
          blocksArr.forEach((b, i) => {
            if (b?.[3]?.children?.[3]?.data && newBlocks[i]) {
              b[3].children[3].data = newBlocks[i];
            }
          });
        }
      }

      // [1] ComponentSectionsNumbers
      if (sections[1]?.[3]?.data) {
        const d = sections[1][3].data;
        d.title = 'Barrier-Free Engineering & Academic Benchmarks';
        d.numberBlocks = [
          { id: '1441', title: '1:12', description: 'Maximum Ramp Gradient (IS 4963) with 1500 mm wheelchair turning circles & dual handrails' },
          { id: '1442', title: '21 / 21', description: 'Benchmark Disabilities under the RPwD Act 2016 supported with tailored accommodations' },
          { id: '1443', title: '< 45 dB', description: 'Acoustic ceiling inside Zone 05 Sensory Sanctuary pods with zero-strobe lighting' },
          { id: '1444', title: '100%', description: 'Plenary sessions with simultaneous Indian Sign Language (ISL) & live open captions' }
        ];
      }

      // [2] ComponentSectionsCtaSecondary
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.title = 'Present Your Research or Attend the GIEN & TISS Conclave';
        d.description = 'Full access to all GIEN & TISS plenaries, paper presentations, and UDL workshops is included in the mandatory ₹2,200 3-Day Delegate Pass.';
        d.button = {
          id: '1445',
          title: 'Apply Now',
          theme: 'primary',
          page: null,
          externalPage: '/apply',
          modal: false
        };
        d.media = makeMedia('final.mp4', 'GIEN & TISS Inclusive Education Showcase');
      }
      break;
    }

    case 'deal-sizer': {
      // [0] ComponentSectionsCalculatorDscr
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Exhibition Stall & Institutional Delegation Sizer';
        d.page = makePageRef('pricer', 'Delegate Pass & Stall Pricer');
      }
      break;
    }

    case 'pricer': {
      // [0] ComponentSectionsPricer
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Delegate Pass (₹2,200) & Exhibitor Stall Pricer';
      }
      break;
    }

    case 'careers': {
      // [0] ComponentSectionsIntroDefault (careers sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Co-Create Purple Fest Vadodara 2027';
        d.description = 'Join our 500+ Inclusive Volunteer Brigade, perform on the Purple Kaleidoscope stage, interpret in Indian Sign Language (ISL), or present research at the GIEN & TISS Conclave.';
        d.button = {
          id: '1363',
          title: 'View Open Roles & Calls',
          theme: null,
          page: null,
          externalPage: '#open-positions',
          modal: false
        };
      }

      // [1] ComponentSectionsDefaultMessage
      if (sections[1]?.[3]?.data) {
        const d = sections[1][3].data;
        d.message = 'Purple Fest Vadodara 2027 is built by disabled leaders, university students, special educators, ISL interpreters, therapists, and civic volunteers working shoulder-to-shoulder in Sanskari Nagari.';
        d.links = [];
      }

      // [2] ComponentSectionsStickyBlocksWIthContentImage
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.stickyBlocks = [
          {
            id: '586',
            title: 'What we do',
            description: '<p>We convene <strong>10,000+ delegates, 100+ assistive technology &amp; DPO exhibitors, Paralympic champions, and global educators</strong> across 6 barrier-free Experience Zones in Vadodara on <strong>14–16 January 2027</strong>.</p>',
            media: makeMedia('pf_doc_miracle_on_wheels_india.jpg', 'Indian Classical Wheelchair & Crutches Stage Dance — Miracle on Wheels at Purple Fest', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_miracle_on_wheels_mobile.jpg', 'Indian Classical Wheelchair & Crutches Stage Dance — Miracle on Wheels at Purple Fest', 750, 1300)
          },
          {
            id: '587',
            title: 'What we believe',
            description: '<p>We believe in <strong>“Nothing About Us, Without Us.”</strong> Inclusion across all <strong>21 Benchmark Disabilities (RPwD Act 2016)</strong> is a fundamental constitutional right—celebrated through art, sport, science, and education.</p>',
            media: makeMedia('pf_doc_indian_paralympians.jpg', 'Indian Paralympic Medallists Deepa Malik, Mariyappan Thangavelu & Devendra Jhajharia', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_indian_paralympians.jpg', 'Indian Paralympic Medallists Deepa Malik, Mariyappan Thangavelu & Devendra Jhajharia', 2560, 1440)
          },
          {
            id: '588',
            title: 'How we work',
            description: '<p>Every volunteer and coordinator receives certified training in <strong>disability etiquette, sighted-guide technique, basic Indian Sign Language (ISL), neuro-affirming support, and emergency evacuation</strong>—earning a joint Praangan · Brotherhood · GIEN · TISS Certificate.</p>',
            media: makeMedia('pf_doc_isl_stage_interpreter.jpg', 'Spotlighted Sign Language Interpreter on Festival Stage', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_isl_stage_interpreter.jpg', 'Spotlighted Sign Language Interpreter on Festival Stage', 2560, 1440)
          }
        ];
      }

      // [3] Raw <section id="open-positions">
      const posContainer = sections[3]?.[3]?.children?.[3]?.children;
      if (Array.isArray(posContainer)) {
        // Heading h2
        if (posContainer[0]?.[3]?.children?.[3]) {
          posContainer[0][3].children[3].children = 'Open Participation & Volunteer Tracks';
        }
        // Cards list
        const cardsArr = posContainer[1]?.[3]?.children;
        if (Array.isArray(cardsArr)) {
          const roles = [
            {
              documentId: 'pf_role_1',
              title: 'Inclusive Accessibility & Sighted-Guide Volunteer Brigade',
              description: 'Support delegates across all 21 RPwD categories at venue gates, tactile corridors, wheelchair buggy shuttles, and Zone 01–06 helpdesks (14–16 Jan 2027). Joint Praangan & Brotherhood certification provided.',
              position: 'Volunteer Brigade (500+ Seats)',
              location: 'Vadodara, Gujarat',
              link: { id: '4', title: 'Apply / Register Now', externalPage: '/contact', modal: null }
            },
            {
              documentId: 'pf_role_2',
              title: 'Indian Sign Language (ISL) Interpreter & Live Captioning Fellow',
              description: 'Provide simultaneous ISL interpretation and pro-tactile Deafblind communication across keynote plenaries, GIEN & TISS academic panels, and Zone 01 assistive tech demos.',
              position: 'Accessibility & Language Desk',
              location: 'Vadodara, Gujarat',
              link: { id: '6', title: 'Apply / Register Now', externalPage: '/contact', modal: null }
            },
            {
              documentId: 'pf_role_3',
              title: 'Purple Kaleidoscope & Abhivyakti Performing Artist / Ensemble',
              description: 'Open call for soloists and troupes with disabilities in classical/contemporary dance, music, Deaf theatre, stand-up comedy, adaptive fashion, and tactile visual arts.',
              position: 'Zone 03 · Cultural Stage',
              location: 'Vadodara, Gujarat',
              link: { id: '8', title: 'Submit Performance Proposal', externalPage: '/contact', modal: null }
            },
            {
              documentId: 'pf_role_4',
              title: 'GIEN & TISS Inclusive Education Paper / Poster Presenter',
              description: 'Submit research abstracts, school UDL case studies, or assistive technology prototypes for the 3-day Global Inclusive Education Network (GIEN) & TISS Academic Conclave.',
              position: 'Zone 02 · Academic Conclave',
              location: 'Vadodara, Gujarat',
              link: { id: '10', title: 'Submit Abstract / Register', externalPage: '/contact', modal: null }
            }
          ];
          cardsArr.forEach((c, idx) => {
            if (c?.[3]?.children?.[3]?.data && roles[idx]) {
              c[3].children[3].data = roles[idx];
            }
          });
        }
      }

      // [4] ComponentSectionsCtaSecondary
      if (sections[4]?.[3]?.data) {
        const d = sections[4][3].data;
        d.title = 'Bring Your University, School or DPO Cohort to Vadodara';
        d.description = 'Write to purplefestvadodara@gmail.com or call +91 98250 93918 to coordinate group volunteer brigades, student delegations, or cultural ensembles.';
        d.button = {
          id: '1364',
          title: 'Contact Organising Secretariat',
          theme: 'primary',
          page: makePageRef('contact', 'Register & Contact'),
          externalPage: null,
          modal: false
        };
        d.media = makeMedia('pf_doc_student_wheelchair_innovation.jpg', 'Indian University Student Volunteer & Assistive Wheelchair Innovation Cohort', 2560, 1440);
      }
      break;
    }

    case 'contact': {
      // [0] ComponentSectionsContact (contact sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Register Your ₹2,200 Delegate Pass & Accessibility Needs';
        d.description = 'Mandatory 3-Day Delegate Registration is ₹2,200 per person (strictly no free walk-in visitors). Use this desk to register delegates, declare accommodations across all 21 RPwD Benchmark Disabilities, or reach Praangan Vadodara (+91 98250 93918 · purplefestvadodara@gmail.com).';
        d.buttonLabel = 'Submit Registration / Inquiry';
        d.successMessage = '<h4>Registration Request Received</h4><p>Thank you for registering with <strong>Purple Fest Vadodara 2027 (14–16 January 2027)</strong>. Our Secretariat at <strong>Praangan &amp; We Are Together (Brotherhood)</strong> will send your ₹2,200 Delegate Pass payment link / invoice and confirm your RPwD accessibility accommodations shortly.</p>';
        d.successButtonLabel = 'Submit Another Registration';
        d.dropdown = [
          { id: '1375', title: '3-Day Delegate Pass Registration (₹2,200 Mandatory)' },
          { id: '1376', title: 'RPwD Accessibility Accommodation Request (21 Categories)' },
          { id: '1377', title: 'GIEN & TISS Inclusive Education Conclave Abstract' },
          { id: '1378', title: 'Zone 04 Para-Sports Athlete / Team Registration' },
          { id: '1379', title: 'Zone 03 Purple Kaleidoscope Cultural Submission' }
        ];
        d.button = {
          id: '1374',
          title: 'Exhibition Stall Booking (Tiers A–D)',
          theme: 'outline',
          page: makePageRef('contact-tpo', 'Institutional & CSR Contact'),
          externalPage: null,
          modal: false
        };
      }
      break;
    }

    case 'battalion-tpo': {
      // [0] Raw <section> hero with video
      const containerChildren = sections[0]?.[3]?.children?.[3]?.children;
      if (Array.isArray(containerChildren)) {
        const headerChildren = containerChildren[0]?.[3]?.children;
        if (Array.isArray(headerChildren)) {
          if (headerChildren[0]?.[3]?.children?.[3]) {
            headerChildren[0][3].children[3].children = 'Institutional, CSR & Exhibitor Portal.';
          }
          if (headerChildren[1]?.[3]?.children?.[3]?.dangerouslySetInnerHTML) {
            headerChildren[1][3].children[3].dangerouslySetInnerHTML.__html =
              'Partner with Praangan, We Are Together (Brotherhood), GIEN & TISS in Vadodara (14–16 Jan 2027). Book Tier A–D Exhibition Stalls or sponsor Schedule VII CSR Pavilions.';
          }
          const btnArr = headerChildren[2]?.[3]?.children;
          if (Array.isArray(btnArr) && btnArr[0]?.[3]) {
            btnArr[0][3].title = 'Book Exhibition Stall (Tiers A–D)';
            btnArr[0][3].externalPage = null;
            btnArr[0][3].page = makePageRef('contact-tpo', 'Institutional & CSR Contact');
          }
        }
        const mediaComp = containerChildren[1]?.[3]?.children?.[3]?.children;
        if (mediaComp?.[3]?.media) {
          mediaComp[3].media = makeMedia('final.mp4', 'Purple Fest Vadodara 2027 Institutional Film');
        }
      }

      // [1] ComponentSectionsHomeMetrics
      if (sections[1]?.[3]?.data) {
        const d = sections[1][3].data;
        d.title = 'Institutional Scale & Exhibition Footprint';
        d.blocks = [
          { id: '604', title: '4 Stall Tiers', description: 'Tier D (₹5,500 DPO/NGO) · Tier C (₹12,000 Startup) · Tier A (₹15,000 Standard 3m×3m) · Tier B (₹35,000 Corner 6m×3m)' },
          { id: '605', title: '₹2,200', description: 'Mandatory 3-Day Delegate Pass per attendee (Ensuring 100% curated, barrier-free crowd flow)' },
          { id: '606', title: '6 Partners', description: 'Praangan · Brotherhood · GIEN · TISS · DEPwD (Govt. of India) · Goa State Commissioner for PwDs' },
          { id: '607', title: 'Schedule VII', description: 'CSR Alignment under Companies Act 2013 (Inclusive Education, Assistive Tech & Disability Livelihoods)' }
        ];
      }

      // [2] ComponentSectionsHomeBenefits
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.title = 'Why Exhibit or Sponsor at Purple Fest Vadodara';
        d.media = makeMedia('indian_pwd_group_transparent.png', 'Indian Persons with Disabilities — Purple Fest Vadodara 2027', 2380, 886);
        d.mediaMobile = makeMedia('indian_pwd_group_transparent.png', 'Indian Persons with Disabilities — Purple Fest Vadodara 2027', 2380, 886);
        d.blocks = [
          {
            id: '608',
            title: 'Direct Access to 10,000+ Decision-Makers',
            description: 'Showcase assistive devices, CSR initiatives, and inclusive educational tools directly to school principals, hospital heads, DPOs, and policy leaders.'
          },
          {
            id: '609',
            title: 'Subsidized Grassroots & Startup Tiers',
            description: 'Tiered stall pricing ensures grassroots DPOs (Tier D ₹5,500) and assistive startups (Tier C ₹12,000) exhibit alongside flagship corporate pavilions (Tier B ₹35,000).'
          },
          {
            id: '610',
            title: 'Turnkey Accessible Octanorm Shell',
            description: 'Every stall includes Braille/high-contrast fascia signage, 760 mm wheelchair-accessible counter, 15A power supply, LED lighting, and Exhibitor Badges.'
          },
          {
            id: '611',
            title: 'Academic Co-Branding with GIEN & TISS',
            description: 'Institutional partners gain visibility across GIEN & TISS summit proceedings, the Vadodara Declaration, and national assistive technology directories.'
          }
        ];
      }

      // [3] ComponentSectionsHomeStepsTpo (3 blocks)
      if (sections[3]?.[3]?.data) {
        const d = sections[3][3].data;
        d.title = 'Built for CSR Heads, Assistive Tech OEMs, Universities & DPOs';
        d.description = 'Transparent stall tariffs, statutory Schedule VII CSR documentation, and end-to-end on-ground accessibility support.';
        d.homeStepsTpoBlocks = [
          {
            id: '612',
            label: null,
            title: 'Transparent 3-Day Stall Tariffs',
            description: 'Published rates from ₹5,500 (Tier D DPO) to ₹35,000 (Tier B Prime Corner)—with complimentary Exhibitor Badges included.'
          },
          {
            id: '613',
            label: null,
            title: 'Sponsored Delegate Cohorts (₹2,200/Pass)',
            description: 'Corporates and universities can sponsor batches of ₹2,200 Delegate Passes for special educators, students, and grassroots disability leaders.'
          },
          {
            id: '614',
            label: null,
            title: 'Live Product Demo & Hiring Bays',
            description: 'Conduct live trials of prosthetics, Braille devices, and AAC tools or host inclusive recruitment interviews in Zone 01.'
          }
        ];
        d.button = {
          id: '1398',
          title: 'Compare All 4 Stall Tiers',
          theme: 'outline',
          page: makePageRef('programs-tpo', 'Stall Tiers (A–D) & Tracks'),
          externalPage: null,
          modal: false
        };
      }

      // [4] ComponentSectionsHomePrograms (2 blocks)
      if (sections[4]?.[3]?.data) {
        const d = sections[4][3].data;
        d.homeProgramsBlocks = [
          {
            documentId: 'pf_tpo_hp_1',
            title: 'Tier A (₹15,000) & Tier B (₹35,000) Corporate / OEM Pavilions',
            requirements: [
              { id: '225', title: '3m×3m Standard (₹15K) or 6m×3m Corner (₹35K)' },
              { id: '226', title: '2 to 4 Complimentary Exhibitor Badges' },
              { id: '227', title: 'Braille Fascia + 760mm Accessible Counter' }
            ],
            variants: [],
            value: '₹15K / ₹35K',
            subtitle: '3-Day Tariff',
            description: 'Designed for Assistive Tech manufacturers, CSR foundations, PSUs, hospitals, and universities seeking prime visibility in Zone 01.',
            reverseLabels: true,
            widgetTitle: 'Tier A & Tier B Pavilions',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z',
            media: makeMedia('purple_expo.jpg', 'Tier A & Tier B Bionic Prosthetics & Assistive Tech Pavilions', 2560, 1440),
            mediaMobile: makeMedia('purple_expo_mobile.jpg', 'Tier A & Tier B Bionic Prosthetics & Assistive Tech Pavilions', 750, 1300),
            button: {
              id: '1400',
              title: 'View Full Stall Specifications',
              theme: null,
              page: makePageRef('programs-tpo', 'Stall Tiers (A–D) & Tracks'),
              externalPage: null,
              modal: false
            }
          },
          {
            documentId: 'pf_tpo_hp_2',
            title: 'Tier C (₹12,000) Startup & Tier D (₹5,500) DPO / NGO Stalls',
            requirements: [
              { id: '228', title: 'Tier C Assistive Tech Startup Pod (₹12,000)' },
              { id: '229', title: 'Tier D Grassroots NGO / DPO Stall (₹5,500)' },
              { id: '230', title: 'Includes 2 Complimentary Exhibitor Badges' }
            ],
            variants: [],
            value: '₹5.5K / ₹12K',
            subtitle: 'Subsidized Tariff',
            description: 'Dedicated innovation pods for university R&D teams, assistive tech startups, Disabled People’s Organisations (DPOs), and special school collectives.',
            reverseLabels: true,
            widgetTitle: 'Tier C & Tier D Stalls',
            createdAt: '2026-01-14T10:00:00.000Z',
            updatedAt: '2026-01-14T10:00:00.000Z',
            publishedAt: '2026-01-14T10:00:00.000Z',
            media: makeMedia('pf_doc_jaipur_foot_india.jpg', 'Tier C Startup & Tier D Grassroots DPO Artificial Limb & Rehabilitation Stall', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_jaipur_foot_india.jpg', 'Tier C Startup & Tier D Grassroots DPO Artificial Limb & Rehabilitation Stall', 2560, 1440),
            button: {
              id: '1399',
              title: 'Reserve Subsidized Stall',
              theme: null,
              page: makePageRef('contact-tpo', 'Institutional & CSR Contact'),
              externalPage: null,
              modal: false
            }
          }
        ];
      }

      // [5] ComponentSectionsHomeStepsTpo (4 Stall Tiers overview)
      if (sections[5]?.[3]?.data) {
        const d = sections[5][3].data;
        d.title = '4-Tier Exhibition Pavilion Structure';
        d.description = 'Transparent 3-day exhibition stall options in Zone 01 across corporate flagships, assistive tech OEMs, startups, and grassroots DPOs.';
        d.homeStepsTpoBlocks = [
          { id: '615', label: null, title: 'Tier B Corner Pavilion (₹35,000)', description: '18 sq.m prime 6m × 3m two-side-open space with 4 Exhibitor Badges.' },
          { id: '616', label: null, title: 'Tier A Standard Stall (₹15,000)', description: '9 sq.m 3m × 3m octanorm shell scheme with 2 Exhibitor Badges.' },
          { id: '617', label: null, title: 'Tier C Startup Pod (₹12,000)', description: 'Dedicated assistive tech & university R&D demo pod with 2 Badges.' },
          { id: '618', label: null, title: 'Tier D DPO / NGO Stall (₹5,500)', description: 'Subsidized 3m × 2m stall for grassroots DPOs & artisans with 2 Badges.' }
        ];
      }

      // [7] ComponentSectionsHomeStepsTpo (4 onboarding steps)
      if (sections[7]?.[3]?.data) {
        const d = sections[7][3].data;
        d.title = 'Simple 4-Step Exhibitor Onboarding';
        d.description = 'From stall selection in Zone 01 to barrier-free setup in Vadodara on 13 January 2027.';
        d.homeStepsTpoBlocks = [
          { id: '619', label: '01', title: 'Select Stall Tier (A–D)', description: 'Choose Tier A (₹15,000), Tier B (₹35,000), Tier C (₹12,000), or Tier D (₹5,500) and additional ₹2,200 Delegate Passes.' },
          { id: '620', label: '02', title: 'Submit Exhibitor Profile', description: 'Provide your organization details, Braille fascia text, power requirements, and badge names.' },
          { id: '621', label: '03', title: 'Accessibility & Audio-Tactile Brief', description: 'Receive our Exhibitor Accessibility Kit to ensure 1200 mm clear aisles and tactile/audio product demos.' },
          { id: '622', label: '04', title: 'Exhibit across 14–16 Jan 2027', description: 'Move in on 13 January 2027 and engage 10,000+ delegates across 3 transformative days in Vadodara.' }
        ];
        d.button = {
          id: '1401',
          title: 'Book Your Stall Now',
          theme: 'secondary',
          page: makePageRef('contact-tpo', 'Institutional & CSR Contact'),
          externalPage: null,
          modal: false
        };
      }

      // [8] ComponentSectionsTestimonials
      if (sections[8]?.[3]?.data) {
        const d = sections[8][3].data;
        d.title = 'Institutional & Coalition Endorsements';
        d.testimonialBlocks = [
          {
            id: '623',
            author: 'Satish Kapoor',
            title: '“Our 4-tier exhibition model ensures that a grassroots DPO artisan collective (₹5,500) and a global assistive robotics leader (₹35,000) share the exact same barrier-free floor.”',
            authorInfo: 'Founder President, We Are Together (Brotherhood)'
          },
          {
            id: '624',
            author: 'Prof. Bipin Jojo',
            title: '“University departments and CSR foundations partnering with Purple Fest Vadodara directly advance the UNCRPD and RPwD Act 2016 mandate on the ground.”',
            authorInfo: 'Tata Institute of Social Sciences (TISS Mumbai)'
          }
        ];
      }

      // [9] ComponentSectionsHomeTechTpo
      if (sections[9]?.[3]?.data) {
        const d = sections[9][3].data;
        d.title = 'Instant Fee & Pass Allocation';
        d.description = 'Use our interactive Delegate Pass & Stall Pricer to generate an itemized fee breakdown for your finance or CSR committee.';
        d.homeTechTpoBlocks = [
          { id: '625', title: 'Mandatory ₹2,200 Delegate Pass', description: 'Every non-exhibitor attendee registers at ₹2,200 for full 3-day access (no free walk-in visitors).' },
          { id: '626', title: 'Tier A–D Stall Tariffs', description: 'Clear 3-day pricing: Tier D ₹5,500 · Tier C ₹12,000 · Tier A ₹15,000 · Tier B ₹35,000.' },
          { id: '627', title: 'Complimentary Exhibitor Badges', description: '2 badges included with Tiers A, C, D and 4 badges included with Tier B Corner Pavilions.' },
          { id: '628', title: '21 RPwD Accommodations Included', description: 'All ISL interpretation, Braille signage, accessible counters, and sensory lounge access included at zero surcharge.' }
        ];
        d.button = {
          id: '1402',
          title: 'Apply Now',
          theme: 'secondary',
          page: null,
          externalPage: '/apply',
          modal: false
        };
        d.media = makeMedia('final.mp4', 'Exhibition & Pass Pricer Preview');
      }

      // [10] ComponentSectionsCta (leaves sequence)
      if (sections[10]?.[3]?.data) {
        const d = sections[10][3].data;
        d.title = 'Reserve Your Exhibition Pavilion in Vadodara';
        d.description = 'Stall inventory in Zone 01 is limited to preserve 1800 mm wheelchair-accessible aisles. Book your Tier A–D stall today.';
        d.buttons = [
          {
            id: '1406',
            title: 'Book Stall / Contact CSR Desk',
            theme: 'secondary',
            page: makePageRef('contact-tpo', 'Institutional & CSR Contact'),
            externalPage: null,
            modal: false
          }
        ];
      }
      break;
    }

    case 'programs-tpo': {
      // [0] ComponentSectionsIntroDefault (key sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Exhibition Stall Tiers (A–D) & Institutional Tracks';
        d.description = 'Official 3-Day Exhibition Tariff (14–16 January 2027 · Vadodara) for Assistive Tech OEMs, CSR Flagships, Startups, Universities, and Grassroots DPOs.';
        d.button = {
          id: '1380',
          title: 'Book Exhibition Stall',
          theme: 'secondary',
          page: makePageRef('contact-tpo', 'Institutional & CSR Contact'),
          externalPage: null,
          modal: false
        };
      }

      // [1] <section> with ProgramBlock children
      const containerDiv = sections[1]?.[3]?.children?.[3]?.children?.[3]?.children;
      if (containerDiv?.[3]?.children && Array.isArray(containerDiv[3].children)) {
        const progTag = containerDiv[3].children[0][1];
        const tiersData = [
          {
            documentId: 'pf_stall_tier_b',
            title: 'Tier B · Corner / Prime Pavilion (6m × 3m) — ₹35,000',
            requirementsList: [
              { id: '190', title: '18 sq.m (6m × 3m) Two-Side Open' },
              { id: '191', title: '4 Complimentary Exhibitor Badges' },
              { id: '192', title: 'CSR Flagships, Ministries & OEMs' }
            ],
            features: [
              { id: '2010', title: '3-Day Stall Tariff', description: '₹35,000 (Full 3-Day Festival: 14–16 January 2027)' },
              { id: '2011', title: 'Dimensions & Layout', description: '6m × 3m (18 sq.m) Prime Corner Octanorm Pavilion with two open sides on main 1800 mm accessible boulevard' },
              { id: '2012', title: 'Complimentary Passes', description: 'Includes 4 Exhibitor Badges (Additional delegates register at mandatory ₹2,200 Delegate Pass rate)' },
              { id: '2013', title: 'Accessibility & Power Specs', description: 'Braille + high-contrast fascia board, 2 lowered 760 mm accessible counters, 6 chairs, six 15A sockets & LED floodlights' },
              { id: '2014', title: 'Ideal For', description: 'Corporate CSR Flagships, Assistive Robotics/Prosthetics OEMs, Central/State Ministries, PSUs & Universities' }
            ],
            media: makeMedia('purple_expo.jpg', 'Tier B Prime Corner Pavilion ₹35,000 — Bionic Prosthetics & Assistive Robotics Showcase', 2560, 1440),
            mediaMobile: makeMedia('purple_expo_mobile.jpg', 'Tier B Prime Corner Pavilion ₹35,000 — Bionic Prosthetics & Assistive Robotics Showcase', 750, 1300),
            variants: []
          },
          {
            documentId: 'pf_stall_tier_a',
            title: 'Tier A · Standard Octanorm Stall (3m × 3m) — ₹15,000',
            requirementsList: [
              { id: '193', title: '9 sq.m (3m × 3m) Shell Scheme' },
              { id: '194', title: '2 Complimentary Exhibitor Badges' },
              { id: '195', title: 'Assistive Tech, Rehab & Corporates' }
            ],
            features: [
              { id: '2015', title: '3-Day Stall Tariff', description: '₹15,000 (Full 3-Day Festival: 14–16 January 2027)' },
              { id: '2016', title: 'Dimensions & Layout', description: '3m × 3m (9 sq.m) Standard Octanorm Shell Scheme in Zone 01 Assistive Tech & Inclusion Expo' },
              { id: '2017', title: 'Complimentary Passes', description: 'Includes 2 Exhibitor Badges (Additional team members register at mandatory ₹2,200 Delegate Pass rate)' },
              { id: '2018', title: 'Accessibility & Power Specs', description: 'Braille + high-contrast fascia board, 1 accessible counter (760 mm knee clearance), 2 chairs, three 15A sockets & 3 LED spotlights' },
              { id: '2019', title: 'Ideal For', description: 'Assistive Technology Companies, Rehabilitation Hospitals, Inclusive Schools, Publishers & Financial Institutions' }
            ],
            media: makeMedia('pf_doc_indore_wheelchair_stall.jpg', 'Tier A Standard 3m×3m Octanorm Wheelchair & Assistive Devices Stall ₹15,000', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_indore_wheelchair_stall.jpg', 'Tier A Standard 3m×3m Octanorm Wheelchair & Assistive Devices Stall ₹15,000', 2560, 1440),
            variants: []
          },
          {
            documentId: 'pf_stall_tier_c',
            title: 'Tier C · Assistive Startup & University Innovation Pod — ₹12,000',
            requirementsList: [
              { id: '196', title: 'Dedicated Startup / R&D Demo Pod' },
              { id: '197', title: '2 Complimentary Exhibitor Badges' },
              { id: '198', title: 'Startups, IIT/NIT/MSU Labs & Incubators' }
            ],
            features: [
              { id: '2020', title: '3-Day Stall Tariff', description: '₹12,000 (Subsidized Innovation Tariff for 14–16 January 2027)' },
              { id: '2021', title: 'Dimensions & Layout', description: '3m × 2.5m Innovation Demo Pod in the Assistive Tech Startup & GIEN Research Pavilion' },
              { id: '2022', title: 'Complimentary Passes', description: 'Includes 2 Exhibitor Badges + eligibility for Day 2 Assistive Tech Startup Pitch before CSR & VC jury' },
              { id: '2023', title: 'Accessibility & Power Specs', description: 'Branded backdrop, accessible demo desk, 2 chairs, 15A power strip for hardware/AI demos & Braille QR card' },
              { id: '2024', title: 'Ideal For', description: 'DPIIT-recognized Assistive Tech Startups, University Engineering/Design Labs & Student Innovators' }
            ],
            media: makeMedia('pf_doc_student_wheelchair_innovation.jpg', 'Tier C Assistive Startup & University All-Terrain Wheelchair Innovation Pod ₹12,000', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_student_wheelchair_innovation.jpg', 'Tier C Assistive Startup & University All-Terrain Wheelchair Innovation Pod ₹12,000', 2560, 1440),
            variants: []
          },
          {
            documentId: 'pf_stall_tier_d',
            title: 'Tier D · Grassroots NGO, DPO & Disabled Artisan Stall — ₹5,500',
            requirementsList: [
              { id: '199', title: '3m × 2m Subsidized Community Stall' },
              { id: '200', title: '2 Complimentary Exhibitor Badges' },
              { id: '201', title: '100% Direct Sales Retained by Artisans' }
            ],
            features: [
              { id: '2025', title: '3-Day Stall Tariff', description: '₹5,500 (Highly Subsidized Grassroots Tariff for 14–16 January 2027)' },
              { id: '2026', title: 'Dimensions & Layout', description: '3m × 2m Community & Livelihood Marketplace Stall with step-free roll-in access' },
              { id: '2027', title: 'Complimentary Passes', description: 'Includes 2 Exhibitor Badges for disabled artisans / NGO coordinators (0% commission on craft sales)' },
              { id: '2028', title: 'Accessibility & Power Specs', description: 'Octanorm stall with fascia nameboard, display table, 2 chairs, LED lighting, 5A/15A socket & volunteer support' },
              { id: '2029', title: 'Ideal For', description: 'Registered Disabled People’s Organisations (DPOs), Grassroots NGOs, Special Schools & Self-Help Artisan Groups' }
            ],
            media: makeMedia('pf_doc_jaipur_foot_india.jpg', 'Tier D Grassroots DPO & Artificial Limb Rehabilitation Stall ₹5,500', 2560, 1440),
            mediaMobile: makeMedia('pf_doc_jaipur_foot_india.jpg', 'Tier D Grassroots DPO & Artificial Limb Rehabilitation Stall ₹5,500', 2560, 1440),
            variants: []
          }
        ];

        containerDiv[3].children = tiersData.map((data, idx) => [
          '$',
          progTag,
          String(idx),
          {
            data: {
              ...data,
              value: null,
              subtitle: null,
              description: null,
              reverseLabels: false,
              widgetTitle: null,
              createdAt: '2026-01-14T10:00:00.000Z',
              updatedAt: '2026-01-14T10:00:00.000Z',
              publishedAt: '2026-01-14T10:00:00.000Z'
            },
            className: 'mb-160 2xl:mb-220',
            lastBlock: idx === tiersData.length - 1
          }
        ]);
      }

      // [2] ComponentSectionsCta (leaves sequence)
      if (sections[2]?.[3]?.data) {
        const d = sections[2][3].data;
        d.title = 'Ready to Book Your Tier A, B, C or D Stall?';
        d.description = 'Contact the Purple Fest Vadodara 2027 Exhibition Desk at purplefestvadodara@gmail.com or +91 98250 93918 to lock your stall location.';
        d.buttons = [
          {
            id: '1381',
            title: 'Book Exhibition Stall',
            theme: 'secondary',
            page: makePageRef('contact-tpo', 'Institutional & CSR Contact'),
            externalPage: null,
            modal: false
          }
        ];
      }
      break;
    }

    case 'contact-tpo': {
      // [0] ComponentSectionsContact (tpo sequence)
      if (sections[0]?.[3]?.data) {
        const d = sections[0][3].data;
        d.title = 'Book Exhibition Stall (Tier A–D) & CSR Partnerships';
        d.description = 'Official Institutional Desk for Zone 01 Exhibition Stalls (Tier A ₹15,000 · Tier B ₹35,000 · Tier C ₹12,000 · Tier D ₹5,500), CSR Schedule VII sponsorships, and bulk ₹2,200 Delegate Pass cohorts.';
        d.buttonLabel = 'Submit Stall / CSR Booking';
        d.successMessage = '<h4>Stall / Institutional Inquiry Received</h4><p>Thank you for partnering with <strong>Purple Fest Vadodara 2027 (14–16 January 2027)</strong>. Our Exhibition &amp; CSR Secretariat (<strong>purplefestvadodara@gmail.com · +91 98250 93918</strong>) will send your stall floorplan allocation and proforma invoice within 24 hours.</p>';
        d.successButtonLabel = 'Submit Another Institutional Request';
        d.dropdown = [
          { id: '1385', title: 'Tier B · Corner / Prime Pavilion 6m×3m (₹35,000 · 4 Badges)' },
          { id: '1386', title: 'Tier A · Standard Octanorm Stall 3m×3m (₹15,000 · 2 Badges)' },
          { id: '1387', title: 'Tier C · Assistive Startup / University Pod (₹12,000 · 2 Badges)' },
          { id: '1388', title: 'Tier D · Grassroots NGO / DPO Artisan Stall (₹5,500 · 2 Badges)' }
        ];
      }
      break;
    }

    case 'terms-and-conditions': {
      // [0] <section className="wysiwyg-section">
      const containerChildren = sections[0]?.[3]?.children?.[3]?.children;
      if (Array.isArray(containerChildren)) {
        // h1 SplitText
        if (containerChildren[0]?.[3]?.children?.[3]) {
          containerChildren[0][3].children[3].children = 'Terms & Conditions · Delegate Pass & Exhibitor Charter';
        }
        // wysiwyg div with dangerouslySetInnerHTML
        if (containerChildren[1]?.[3]?.children?.[3]?.dangerouslySetInnerHTML) {
          containerChildren[1][3].children[3].dangerouslySetInnerHTML.__html = TERMS_HTML.trim();
        }
      }
      break;
    }

    case 'privacy-policy': {
      // [0] <section className="wysiwyg-section">
      const containerChildren = sections[0]?.[3]?.children?.[3]?.children;
      if (Array.isArray(containerChildren)) {
        // h1 SplitText
        if (containerChildren[0]?.[3]?.children?.[3]) {
          containerChildren[0][3].children[3].children = 'Privacy Policy · DPDP Act 2023 & RPwD Data Charter';
        }
        // wysiwyg div with dangerouslySetInnerHTML
        if (containerChildren[1]?.[3]?.children?.[3]?.dangerouslySetInnerHTML) {
          containerChildren[1][3].children[3].dangerouslySetInnerHTML.__html = PRIVACY_HTML.trim();
        }
      }
      break;
    }
  }
  return sections;
}
