# PurpleFest 3D Architecture

- **Engine**: Three.js (`r128` via CDN for zero-build instant startup) + GSAP `3.12.5` + `ScrollTrigger`.
- **Scene Graph**:
  - `inclusionCoreGroup`: Central icosahedron-crystal + 3 procedural 3D heart sculptures + golden orbital rings.
  - `tunnelRingsGroup`: 18 volumetric portal rings arrayed along the Z-axis (`z: 0` to `z: -120`) creating a fly-through dimensional corridor on scroll.
  - `zoneSculpturesGroup`: 6 distinct 3D floating artifacts positioned at key spatial coordinates along the camera spline.
  - `starfieldPoints`: 1,800 additive-blended dual-color particles (amethyst + gold).
- **Pointer Parallax & Raycasting**: Smooth damped mouse parallax (`lerp`) shifts camera look-at and tilts 3D holocards without hijacking native scroll.
