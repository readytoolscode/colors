# @readytools/colors

Lightweight color conversion and palette utilities.  
Part of the [ReadyTools](https://readytools.co) ecosystem.

---

## ✨ Features

### 🔹 Conversions
- `hexToRgb(hex)` → `{ r, g, b }`
- `rgbToHex(r, g, b)` → `#rrggbb`
- `rgbToHsl(r, g, b)` → `{ h, s, l }`
- `hslToRgb(h, s, l)` → `{ r, g, b }`
- `hexToCmyk(hex)` → `{ c, m, y, k }`

### 🔹 Accessibility & Contrast
- `luminance(hex)` → relative luminance (0–1)
- `contrastRatio(colorA, colorB)` → WCAG contrast ratio
- `isAccessible(fg, bg, level?, size?)` → boolean for AA/AAA
- `getContrastColor(bg)` → returns `#000000` or `#ffffff`

### 🔹 Color Adjustments
- `lighten(hex, percent)` → lighten by %
- `darken(hex, percent)` → darken by %
- `saturate(hex, percent)` → increase saturation
- `desaturate(hex, percent)` → decrease saturation
- `adjustHue(hex, degrees)` → rotate hue

### 🔹 Color Generators
- `generateShades(hex, count?, includeBase?)` → darker variants
- `generateTints(hex, count?, includeBase?)` → lighter variants
- `generateTones(hex, count?, includeBase?)` → less saturated variants
- `generateHueVariants(hex, steps?, includeBase?)` → equally spaced hues

### 🔹 Palettes
- `complementary(hex)` → 2-color palette
- `analogous(hex, spread?)` → 3-color palette
- `triadic(hex)` → 3-color palette
- `tetradic(hex)` → 4-color palette

### 🔹 Helpers
- `toCSS(hex, property?, format?)` → CSS declaration (`hex | rgb | hsl`)

---

## 📦 Installation

```bash
npm install @readytools/colors
