# PurpleFest Color & Materials

## Core Palette Tokens
- `--bg-void`: `#07020d` (Deep obsidian violet canvas)
- `--bg-royal`: `#120524` (Imperial Baroda purple surface)
- `--bg-glass`: `rgba(26, 9, 48, 0.68)` (Frosted crystal card surface)
- `--purple-electric`: `#9d4edd` (Primary luminous amethyst)
- `--purple-neon`: `#c77dff` (Highlight glow)
- `--gold-gaekwad`: `#f59e0b` / `#fde047` (Royal heritage gold accent)
- `--teal-access`: `#2dd4bf` (Barrier-free verified badge accent)
- `--text-Pure`: `#fcfaff` (AAA contrast primary text)
- `--text-Muted`: `#cbb8df` (AA+ secondary text)

## Three.js PBR Material Recipes
- **Amethyst Crystal**: `MeshPhysicalMaterial({ color: 0x7b2cbf, emissive: 0x3c096c, emissiveIntensity: 0.4, metalness: 0.2, roughness: 0.15, clearcoat: 1.0 })`
- **Gaekwad Brushed Gold**: `MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85, roughness: 0.22 })`
- **Iridescent Ribbon Wireframe**: `MeshBasicMaterial({ color: 0xc77dff, wireframe: true, transparent: true, opacity: 0.25 })`
