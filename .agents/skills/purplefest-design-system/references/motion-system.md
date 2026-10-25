# PurpleFest Motion & 3D Architecture

## Camera Choreography (`3d-frontend` + `gsap-scrolltrigger`)
The fixed WebGL `<canvas id="webgl-world">` renders a continuous 3D universe with 7 camera waypoints linked to both scroll position AND the interactive **Menu / Spatial Portal Switcher**:
1. **Waypoint 0 — Arrival (Hero)**: Camera faces the sculptural 3D Inclusion Core (3 orbiting heart-torus sculptures + crystalline prism + volumetric particle field).
2. **Waypoint 1 — Impact & Manifesto**: Camera glides forward through floating dimensional rings while manifesto words light up on scroll.
3. **Waypoint 2 — National Alliance (Partners & Committee)**: Camera orbits an interconnected constellation of institutional nodes (Praangan, Brotherhood, TISS CDSA, Goa Commission, GIEN, MSU Baroda, GMERS).
4. **Waypoint 3 — The 6 Electrifying Purple Zones**: Camera shifts dynamically to frame each selected zone's 3D sculptural emblem (Assistive Tech, Sports Arena, Kalaa Stage, Empathy Pavilion, Think Tank, Purple Bazaar).
5. **Waypoint 4 — Interactive Schedule & Itinerary**: Camera ascends into a starry temporal grid.
6. **Waypoint 5 — 100% Barrier-Free Architecture**: Camera illuminates a golden architectural sanctuary.
7. **Waypoint 6 — Host City Vadodara & Registration Pass Portal**: Camera settles into a calm, distraction-free horizon for instant QR pass generation.

## Accessibility & Performance Rules
- Respect `prefers-reduced-motion: reduce` and provide a one-click **"3D Motion: ON/OFF"** button in the accessibility toolbar.
- Cap `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- Keep all content, navigation, schedule filtering, and pass generation in 100% semantic, keyboard-navigable HTML overlaid at `z-index: 10`.
