# Purple Fest Vadodara 2027 — Spatial 3D & 2.5D Interactive Experience

Official web experience for **Purple Fest Vadodara 2027** (*14–16 January 2027*) — Western India's premier inclusive cultural, sports, and assistive-technology festival celebrating the dignity of Persons with Disabilities (Divyangjan).

![Purple Fest Vadodara](purple_fest_vadodara_logo.png)

---

## Architectural & Design Stack

Built using the **PurpleFest Spatial Design System** (`purplefest-design-system`) and the **Antigravity 3D & Frontend Design Skills Suite** (`design-3d-skills`):

1. **Untouched Signature Preloader (`#preloader`)**:
   - Preserves the authentic stroke-by-stroke `final.mp4` 3-heart emblem reveal, interactive particle field, Web Audio synthesis chime, and vector SVG fallback.
2. **Real-Time WebGL 3D Universe (`Three.js r128` + `GSAP ScrollTrigger`)**:
   - **Sculptural 3-Heart Trinity Emblem**: Extruded 3D bevelled heart sculptures (`#7b2cbf`, `#9d4edd`, `#c77dff`) orbiting a geodesic crystal prism with three gyroscopic Gaekwad-Gold rings (`#f59e0b`, `#fde047`).
   - **Interactive 3D Emblem Modes**: Switch live between *Trinity Harmony*, *Supernova*, *Garba Orbit*, and *Bionic Wireframe*.
   - **16-Ring Dimensional Portal Corridor**: Scroll-reactive WebGL tunnel connecting 7 spatial realms along the Z-axis (`Z: +15` to `Z: -168`).
   - **6 Zone 3D Holodeck Sculptures**: Dedicated 3D geometric artifacts for each festival zone that scale and focus when inspected.
   - **1,600 Dual-Tone Volumetric Particles**: Real-time additive-blended amethyst, gold, and bionic-teal starfield.
3. **Dual Navigation Architecture (Scroll-Driven + Menu-Driven)**:
   - **Fullscreen Architectural Command Menu (`M` key / `Explore Realms`)**: 7-Realm spatial index with live 3D camera teleportation (`PFV_STATE.threeAPI.teleportToRealm()`).
   - **Floating Spatial Waypoint Dock**: Bottom glassmorphic HUD with quick realm pills and live scroll progress bar.
   - **Scroll Journey vs. Menu-Focus Mode**: Toggle between continuous scroll storytelling and single-section menu-isolated focus mode directly from the top command bar or inside the Command Menu.
4. **Epic 2.5D Depth System**:
   - 6-layer Z-depth composition (`Z-0` canvas void to `Z-5` spatial HUD).
   - Oversized ghost outlined architectural backdrop typography (`REALM 01 // PRIDE`, `REALM 03 // HOLODECK`, etc.).
   - Scroll-lit word-by-word Inclusion Manifesto reveal.
   - 3D perspective-tilt cards with dynamic radial glare tracking (`--mouse-x`, `--mouse-y`).
5. **First-Class WCAG 2.2 AA/AAA Accessibility**:
   - **3D Motion Toggle**: Instant pause/resume of WebGL rotation and scroll parallax.
   - **High-Contrast AAA Mode**, **Dyslexia-Friendly Typography**, **Dynamic Font Scaling**, and **Web Speech API Voice Reader (TTS)** with glowing spoken-block indicators.

---

## Quick Start (Local Setup)

### Prerequisites
- Node.js (v16+ recommended)

### Running the App
Zero external build step required:

```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```text
├── index.html                                    # Spatial DOM, 7 Realms, Command Menu, Dock & Preloader
├── style.css                                     # Obsidian-Amethyst & Gaekwad-Gold 2.5D/3D Design System
├── app.js                                        # Preloader, Three.js WebGL Engine, GSAP ScrollTrigger & UI Logic
├── server.js                                     # Zero-dependency Node.js HTTP & MP4 range-streaming server
├── .agents/skills/purplefest-design-system/      # Project-specific PurpleFest Design System Skill & 7 references
├── final.mp4                                     # Signature 3-heart flow stroke drawing animation
└── purple_fest_vadodara_logo.png                 # Official 3-heart festival emblem
```

---

## License
MIT License.
