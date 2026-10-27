// Task 5: "Join Us" (Left) + Praangan Education Trust Google Map (Right) Section Specialist
// Replaces the homepage second section (`section.home-founder-message-section.bg-cream`)
// while strictly preserving the exact design, typography, font family, and #202D59 color.

export const PRAANGAN_VENUE_ADDRESS =
  'Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat';

export const PRAANGAN_SUBDETAIL =
  '21–23 January 2027 · Venue Partners: The Maharaja Sayajirao University, Vadodara & GMERS Medical College, Gotri, Vadodara';

export const PRAANGAN_GOOGLE_MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Praangan%20Education%20Trust%2C%201st%20Floor%2C%20Trimurti%20Apartments%2C%20Baroda%20Imaging%20Lab%20Lane%2C%20Near%20Mahalakshmi%20Store%2C%20Alkapuri%2C%20Vadodara%2C%20Gujarat&t=m&z=16&ie=UTF8&iwloc=&output=embed';

export const PRAANGAN_GOOGLE_MAP_EXTERNAL_URL =
  'https://www.google.com/maps/search/?api=1&query=Praangan+Education+Trust,+1st+Floor,+Trimurti+Apartments,+Baroda+Imaging+Lab+Lane,+Near+Mahalakshmi+Store,+Alkapuri,+Vadodara,+Gujarat';

export const PRAANGAN_GOOGLE_MAP_TITLE =
  'Google Map Location — Praangan Education Trust, Alkapuri, Vadodara, Gujarat';

export const JOIN_US_MAP_HTML = `<section class="py-120 2xl:py-200 flex items-center home-founder-message-section bg-cream min-h-screen"><div class="container"><div class="pf-joinus-map-grid"><div class="pf-joinus-map-left"><h2 class="h1 mb-24">Join Us</h2><div class="h3 mb-24 pf-joinus-address"><p>${PRAANGAN_VENUE_ADDRESS}</p></div><p class="h4 mb-40 pf-joinus-subdetail">21–23 January 2027 · Venue Partners: The Maharaja Sayajirao University, Vadodara &amp; GMERS Medical College, Gotri, Vadodara</p><div class="pf-joinus-map-actions flex flex-wrap items-center gap-y-24 gap-x-40"><a class="btn btn--link link link--underline" href="/apply" target="_blank" rel="noopener noreferrer">Apply Now</a><a class="btn btn--link link link--underline" href="https://www.google.com/maps/search/?api=1&amp;query=Praangan+Education+Trust,+1st+Floor,+Trimurti+Apartments,+Baroda+Imaging+Lab+Lane,+Near+Mahalakshmi+Store,+Alkapuri,+Vadodara,+Gujarat" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></div></div><div class="pf-joinus-map-right"><div class="pf-joinus-map-frame" data-lenis-prevent="true"><iframe class="pf-joinus-map-iframe" src="https://maps.google.com/maps?q=Praangan%20Education%20Trust%2C%201st%20Floor%2C%20Trimurti%20Apartments%2C%20Baroda%20Imaging%20Lab%20Lane%2C%20Near%20Mahalakshmi%20Store%2C%20Alkapuri%2C%20Vadodara%2C%20Gujarat&amp;t=m&amp;z=16&amp;ie=UTF8&amp;iwloc=&amp;output=embed" title="${PRAANGAN_GOOGLE_MAP_TITLE}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen=""></iframe></div></div></div></div></section>`;

export const JOIN_US_MAP_CSS = `
/* TASK5-JOINUS-MAP-START */
.home-founder-message-section .pf-joinus-map-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.2rem;
  align-items: center;
  text-align: left;
  width: 100%;
}
@media (min-width: 1024px) {
  .home-founder-message-section .pf-joinus-map-grid {
    grid-template-columns: 1fr 1.15fr;
    align-items: center;
    gap: 4.8rem;
  }
}
@media (min-width: 1280px) {
  .home-founder-message-section .pf-joinus-map-grid {
    gap: 6.4rem;
  }
}
.home-founder-message-section .pf-joinus-map-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  color: #202D59;
  font-family: var(--font-primary), Roboto, sans-serif;
}
.home-founder-message-section .pf-joinus-map-left h2,
.home-founder-message-section .pf-joinus-map-left .pf-joinus-address,
.home-founder-message-section .pf-joinus-map-left .pf-joinus-address p {
  color: #202D59;
  font-family: var(--font-primary), Roboto, sans-serif;
  font-weight: 600;
}
.home-founder-message-section .pf-joinus-map-left .pf-joinus-address {
  line-height: 1.18;
  font-size: 2.4rem;
}
@media (min-width: 768px) {
  .home-founder-message-section .pf-joinus-map-left .pf-joinus-address {
    font-size: 2.8rem;
  }
}
@media (min-width: 1280px) {
  .home-founder-message-section .pf-joinus-map-left .pf-joinus-address {
    font-size: 3.4rem;
  }
}
.home-founder-message-section .pf-joinus-map-left .pf-joinus-subdetail {
  color: #202D59;
  font-family: var(--font-primary), Roboto, sans-serif;
  font-weight: 600;
  line-height: 1.25;
}
.home-founder-message-section .pf-joinus-map-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 2.4rem 4rem;
}
.home-founder-message-section .pf-joinus-map-right {
  width: 100%;
}
.home-founder-message-section .pf-joinus-map-frame {
  position: relative;
  width: 100%;
  min-height: 420px;
  border-radius: 2.4rem;
  overflow: hidden;
  border: 2px solid #BFCAF1;
  background-color: #DDDDF9;
  box-shadow: 0 14px 48px rgba(32, 45, 89, 0.12);
}
@media (min-width: 1280px) {
  .home-founder-message-section .pf-joinus-map-frame {
    min-height: 460px;
  }
}
.home-founder-message-section .pf-joinus-map-iframe {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 420px;
  border: 0;
}
@media (min-width: 1280px) {
  .home-founder-message-section .pf-joinus-map-iframe {
    min-height: 460px;
  }
}
/* TASK5-JOINUS-MAP-END */
`;

/**
 * Updates DefaultMessageSection (`p`) in `_next/static/chunks/317-ed7330059b349994.js`
 * so that when `id === "164"` (or on the homepage `home-founder-message-section` where
 * `message` contains `"Born from the International"` or `"Praangan Education Trust"`),
 * React renders the 2-column Left "Join Us" + Right Google Map layout natively without hydration mismatch.
 */
export function applyJoinUsMapTo317Chunk(chunk317Code) {
  const targetOrig =
    'let p=e=>{let{data:l}=e,{message:a,links:s,lightTheme:u}=l,[i,v]=(0,t.useState)(!1),{CEOMessageData:b}=(0,h.U)(),p=()=>v(!0),g=(0,t.useMemo)(()=>s.map((e,l)=>(0,r.jsx)(o.default,{className:"",onClick:e.modal?p:void 0,...e,theme:e.theme||"link"},l)),[s]);return(0,r.jsxs)("section",{className:(0,d.Z)("py-120 2xl:py-200 flex items-center home-founder-message-section",{"bg-cream min-h-screen":u}),children:[(0,r.jsxs)("div",{className:"container text-center",children:[(0,r.jsx)(n.A6,{animateOnScroll:!0,children:(0,r.jsx)("div",{className:"h3 max-w-[91rem] mx-auto mb-40 md:mb-56",dangerouslySetInnerHTML:{__html:(0,m.gC)(a)}})}),(0,r.jsx)(n.A6,{animateOnScroll:!0,className:"flex flex-wrap items-center justify-center gap-y-30 md:flex-row gap-x-40",children:g})]}),b&&(0,r.jsx)(c,{data:b,isModalOpen:i,closeModal:()=>v(!1)})]})}';

  const replacement = `let p=e=>{let{data:l}=e,{message:a,links:s=[],lightTheme:u}=l||{},[i,v]=(0,t.useState)(!1),{CEOMessageData:b}=(0,h.U)(),p=()=>v(!0),g=(0,t.useMemo)(()=>(s||[]).map((e,l)=>(0,r.jsx)(o.default,{className:"",onClick:e.modal?p:void 0,...e,theme:e.theme||"link"},l)),[s]),isHomeJoinUs="164"===String(null==l?void 0:l.id)||"string"==typeof a&&(a.includes("Born from the International")||a.includes("Praangan Education Trust")||a.includes("intelligently redesigned financing"));return isHomeJoinUs?(0,r.jsx)("section",{className:(0,d.Z)("py-120 2xl:py-200 flex items-center home-founder-message-section",{"bg-cream min-h-screen":u}),children:(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"pf-joinus-map-grid",children:[(0,r.jsxs)("div",{className:"pf-joinus-map-left",children:[(0,r.jsx)("h2",{className:"h1 mb-24",children:"Join Us"}),(0,r.jsx)("div",{className:"h3 mb-24 pf-joinus-address",children:(0,r.jsx)("p",{children:${JSON.stringify(PRAANGAN_VENUE_ADDRESS)}})}),(0,r.jsx)("p",{className:"h4 mb-40 pf-joinus-subdetail",children:${JSON.stringify(PRAANGAN_SUBDETAIL)}}),(0,r.jsxs)("div",{className:"pf-joinus-map-actions flex flex-wrap items-center gap-y-24 gap-x-40",children:[(0,r.jsx)("a",{className:"btn btn--link link link--underline",href:"/apply",target:"_blank",rel:"noopener noreferrer",children:"Apply Now"}),(0,r.jsx)("a",{className:"btn btn--link link link--underline",href:${JSON.stringify(PRAANGAN_GOOGLE_MAP_EXTERNAL_URL)},target:"_blank",rel:"noopener noreferrer",children:"Open in Google Maps"})]})]}),(0,r.jsx)("div",{className:"pf-joinus-map-right",children:(0,r.jsx)("div",{className:"pf-joinus-map-frame","data-lenis-prevent":"true",children:(0,r.jsx)("iframe",{className:"pf-joinus-map-iframe",src:${JSON.stringify(PRAANGAN_GOOGLE_MAP_EMBED_URL)},title:${JSON.stringify(PRAANGAN_GOOGLE_MAP_TITLE)},loading:"lazy",referrerPolicy:"no-referrer-when-downgrade",allowFullScreen:!0})})})]})})}):(0,r.jsxs)("section",{className:(0,d.Z)("py-120 2xl:py-200 flex items-center home-founder-message-section",{"bg-cream min-h-screen":u}),children:[(0,r.jsxs)("div",{className:"container text-center",children:[(0,r.jsx)(n.A6,{animateOnScroll:!0,children:(0,r.jsx)("div",{className:"h3 max-w-[91rem] mx-auto mb-40 md:mb-56",dangerouslySetInnerHTML:{__html:(0,m.gC)(a)}})}),(0,r.jsx)(n.A6,{animateOnScroll:!0,className:"flex flex-wrap items-center justify-center gap-y-30 md:flex-row gap-x-40",children:g})]}),b&&(0,r.jsx)(c,{data:b,isModalOpen:i,closeModal:()=>v(!1)})]})}`;

  if (chunk317Code.includes(targetOrig)) {
    return chunk317Code.replace(targetOrig, replacement);
  }
  return chunk317Code;
}

/**
 * Helper to replace the SSR `<section class="... home-founder-message-section ...">...</section>`
 * in `index.html` with `JOIN_US_MAP_HTML`.
 */
export function applyJoinUsMapToSsrHtml(ssrHtml, slug = 'index') {
  if (slug !== 'index') return ssrHtml;
  return ssrHtml.replace(
    /<section class="py-120 2xl:py-200 flex items-center home-founder-message-section bg-cream min-h-screen">[\s\S]*?<\/section>/,
    JOIN_US_MAP_HTML
  );
}
