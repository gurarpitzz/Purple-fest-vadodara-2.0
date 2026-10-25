---
name: purplefest-design-system
description: Official design system and 3D/2.5D architectural authority for PurpleFest Vadodara 2027. Defines visual language, sculptural 3D typography, royal purple & Gaekwad gold material palette, GSAP ScrollTrigger choreography, menu-driven spatial navigation, and WCAG 2.1 AA+ barrier-free accessibility rules.
---

# PurpleFest Vadodara 2027 — Ultimate Design & 3D Experience System

Use this skill whenever designing, building, or refining any part of the **PurpleFest Vadodara 2027** web experience.

## Core Mandate

1. **Preserve the Authentic Preloader**: Never alter the `<aside id="preloader">` markup, video (`final.mp4`), vector SVG fallback, or `initPreloader()` logic. The preloader is locked as the canonical opening signature.
2. **Aesthetic Direction — "Royal Baroda Atelier meets Apple Launch & Experimental 3D Studio"**:
   - **Dimensional World**: After the preloader dissolves, visitors enter a luminous, volumetric 3D + 2.5D royal purple cosmos (`#090212` obsidian-violet void, `#16052B` imperial velvet, `#7B2CBF` / `#9D4EDD` electric amethyst, `#F59E0B` / `#FDE047` Gaekwad heritage gold, and `#2DD4BF` accessible teal).
   - **Menu-Driven + Scroll-Driven Dual Navigation**: Visitors can either scroll cinematically through connected 3D/2.5D environments (via GSAP ScrollTrigger camera waypoints) OR jump instantaneously via the **Spatial Command Dock / Fullscreen Architectural Menu Overlay** that teleports the 3D camera and focuses the target experience.
   - **100% Universal Accessibility**: High-contrast mode, Dyslexia-friendly typography mode, Font scaling, Live Audio Narration (TTS), 3D Motion Pause toggle, and full keyboard/screen-reader semantics are first-class citizens.

## Reference Modules

Read the corresponding reference files for implementation specifications:
- [Visual Language](./references/visual-language.md) — Motifs, the 3-heart emblem in 3D space, glassmorphism, and spatial composition.
- [Typography](./references/typography.md) — Display (`Syne` / `Space Grotesk` / `Outfit`) + Body (`Plus Jakarta Sans`) + Mono (`JetBrains Mono`) fluid scale and kinetic text animations.
- [Color & Materials](./references/color-and-materials.md) — PBR Three.js materials (iridescent glass, brushed gold, emissive amethyst) and WCAG AAA contrast tokens.
- [Motion System](./references/motion-system.md) — GSAP ScrollTrigger camera spline choreography, 6-layer depth parallax, and reduced-motion fallbacks.
- [3D Architecture](./references/3d-architecture.md) — Three.js scene graph, procedural 3D sculptures, interactive raycasting, and render-loop optimization.
- [Accessibility](./references/accessibility.md) — Barrier-free digital requirements, ARIA landmarks, and assistive controls.
- [Performance](./references/performance.md) — 60fps GPU budget, adaptive pixel ratio, and mobile fallbacks.
