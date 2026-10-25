# PurpleFest Typography System

## Font Stack
- **Display / Sculptural Headlines (`--font-display`)**: `'Syne'`, `'Outfit'`, sans-serif (Weights 700, 800, 900). Used for oversized architectural headlines and 3D-extruded kinetic titles.
- **Editorial / Body (`--font-body`)**: `'Plus Jakarta Sans'`, sans-serif (Weights 300, 400, 500, 600, 700). Maximum readability, generous x-height, < 75ch line width.
- **Data / Coordinates / Pass IDs (`--font-mono`)**: `'JetBrains Mono'`, monospace. Used for live countdowns, spatial zone coordinates, and digital pass verification codes.

## Kinetic Treatments
1. **3D Perspective Tilt & Character Split**: Hero headlines respond to pointer movement with 3D perspective tilt (`rotateX`, `rotateY`) and split character reveals.
2. **Ghost Outlined Backdrop Type**: `color: transparent; -webkit-text-stroke: 1px rgba(186, 104, 200, 0.18)` with `aria-hidden="true"` at `depth-2`.
3. **Scroll-Lit Manifesto Words**: Words illuminate from dim (`rgba(255,255,255,0.22)`) to pure white & gold (`#ffffff` / `#fde047`) as the user scrolls through the Inclusion Manifesto.
