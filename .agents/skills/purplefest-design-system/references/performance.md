# PurpleFest Performance Budget

- **Zero Build Step**: Runs directly via `node server.js` with zero npm build overhead.
- **GPU Discipline**: Only animate `transform`, `opacity`, and WebGL uniforms/matrices.
- **Adaptive Quality**: Automatically scales particle count and pixel ratio (`Math.min(window.devicePixelRatio, 2)`) on mobile viewports (`window.innerWidth < 768`).
- **Pause When Hidden**: Pauses Three.js render loop when preloader is active or when `document.hidden` is true, or when user toggles Reduced Motion.
