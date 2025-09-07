


# @readytools/colors

Lightweight color conversion, palette generation, and accessibility utilities.  
Part of the [ReadyTools](https://readytools.co) ecosystem.

- **ESM-only** package (`"type": "module"`). Works great in Next.js, Vite, etc.
- **Zero dependencies**.
- Focused on real frontend needs: conversions, WCAG contrast, palette builders, CSS helpers.

---

## 📦 Install

```bash
npm install @readytools/colors
````

Import (ESM):

```js
import {
  // conversions
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToCmyk,
  // accessibility
  luminance, contrastRatio, isAccessible, getContrastColor, ensureContrast,
  // adjustments
  lighten, darken, saturate, desaturate, adjustHue, invert, mix,
  // generators
  generateShades, generateTints, generateTones, generateHueVariants, scale,
  // palettes
  complementary, analogous, triadic, tetradic,
  // parsing / validation / formats
  isValidHex, normalizeHex, parseColor, hexAToRgba, rgbaToHexA, toCSS,
  // Lab & ΔE
  rgbToXyz, xyzToLab, rgbToLab, labToRgb, deltaE76
} from "@readytools/colors";
```

> If you need CommonJS `require()` support, consider transpiling your app or bundling ESM. This lib is ESM-only by design.

---

## 🚀 Quick start

```js
const rgb = hexToRgb("#ff6600");            // { r: 255, g: 102, b: 0 }
const hex = rgbToHex(rgb.r, rgb.g, rgb.b);  // "#ff6600"

const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);  // { h: 24, s: 100, l: 50 }
const rgb2 = hslToRgb(hsl.h, hsl.s, hsl.l); // { r: 255, g: 102, b: 0 }

const bg = "#ff6600";
const text = getContrastColor(bg);          // "#000000"
const css = toCSS(bg, "background-color", "hsl");
// "background-color: hsl(24 100% 50%);"
```

---

## 📚 API Reference

### Conversions

#### `hexToRgb(hex: string): { r: number, g: number, b: number }`

* Supports `#rgb` and `#rrggbb`.
* Example:

  ```js
  hexToRgb("#0af");     // { r: 0, g: 170, b: 255 }
  hexToRgb("#00aaff");  // { r: 0, g: 170, b: 255 }
  ```

#### `rgbToHex(r: number, g: number, b: number): string`

* Clamps 0–255 and pads with zeros.
* Example:

  ```js
  rgbToHex(0,170,255); // "#00aaff"
  ```

#### `rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number }`

* Returns H in 0–360, S/L in 0–100.

  ```js
  rgbToHsl(255,102,0); // { h: 24, s: 100, l: 50 }
  ```

#### `hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number }`

```js
hslToRgb(24,100,50); // { r: 255, g: 102, b: 0 }
```

#### `hexToCmyk(hex: string): { c: number, m: number, y: number, k: number }`

* Returns percentages 0–100.

  ```js
  hexToCmyk("#ff6600"); // { c:0, m:60, y:100, k:0 }
  ```

#### Alpha hex & RGBA

* `hexAToRgba(hexA: string): { r: number, g: number, b: number, a: number }`
  Supports `#RGBA` / `#RRGGBBAA`.
* `rgbaToHexA(r,g,b,a=1): string` → `#rrggbbaa`

```js
hexAToRgba("#00aaffcc"); // { r:0, g:170, b:255, a:0.8 }
rgbaToHexA(0,170,255,0.8); // "#00aaffcc"
```

---

### Accessibility & Contrast

#### `luminance(hex: string): number`

* WCAG relative luminance (0–1).

  ```js
  luminance("#000"); // 0
  luminance("#fff"); // 1
  ```

#### `contrastRatio(a: string, b: string): number`

* WCAG contrast ratio (e.g. `4.53`).

  ```js
  contrastRatio("#ff6600", "#ffffff"); // → ~4.4
  ```

#### `isAccessible(fg: string, bg: string, level = "AA", size = "normal"): boolean`

* `level`: `"AA"` or `"AAA"`
* `size`: `"normal"` or `"large"` (≥18pt or bold ≥14pt)

  ```js
  isAccessible("#000","#fff","AA","normal"); // true
  ```

#### `getContrastColor(bg: string): "#000000" | "#ffffff"`

* Chooses black or white text for best contrast on the background.

#### `ensureContrast(fg: string, bg: string, desired = 4.5, direction = "auto"): string`

* Adjusts **lightness** of `fg` to meet the target ratio vs `bg`.
* `direction`: `"auto" | "lighter" | "darker"`

  ```js
  ensureContrast("#888888", "#ffffff", 7); // returns a lighter grey meeting AAA
  ```

---

### Color Adjustments

#### `lighten(hex: string, percent: number): string`

#### `darken(hex: string, percent: number): string`

* Adjust by % of HSL **lightness** (clamped 0–100).

  ```js
  lighten("#ff6600", 15); // lighter orange
  darken("#ff6600", 20);  // darker orange
  ```

#### `saturate(hex: string, percent: number): string`

#### `desaturate(hex: string, percent: number): string`

* Adjust by % of HSL **saturation**.

  ```js
  desaturate("#ff6600", 30); // more muted
  ```

#### `adjustHue(hex: string, degrees: number): string`

* Rotate hue in degrees (can be negative).

  ```js
  adjustHue("#ff6600", 180); // complementary
  ```

#### `invert(hex: string): string`

* Simple channel inversion (RGB).

  ```js
  invert("#112233"); // "#eeddcc"
  ```

#### `mix(aHex: string, bHex: string, weight = 0.5): string`

* Linear mix in RGB space, `weight` 0..1.

  ```js
  mix("#ff6600", "#0066ff", 0.35);
  ```

---

### Generators

#### `generateShades(hex: string, count = 10, includeBase = true): string[]`

* Darker variants (reduce lightness).

#### `generateTints(hex: string, count = 10, includeBase = true): string[]`

* Lighter variants (increase lightness).

#### `generateTones(hex: string, count = 10, includeBase = true): string[]`

* Less saturated variants (reduce saturation).

#### `generateHueVariants(hex: string, steps = 12, includeBase = true): string[]`

* Evenly spaced hues around the wheel.

```js
generateShades("#ff6600", 5);
// ["#ff6600", "#e65c00", "#cc5200", "#b34700", "#993d00", "#803300"]
```

#### `scale(startHex: string, endHex: string, steps = 5): string[]`

* Create a linear color ramp between two colors.

  ```js
  scale("#ff6600", "#0066ff", 7);
  ```

---

### Palettes

#### `complementary(hex: string): [string, string]`

#### `analogous(hex: string, spread = 30): [string, string, string]`

#### `triadic(hex: string): [string, string, string]`

#### `tetradic(hex: string): [string, string, string, string]`

```js
complementary("#ff6600"); // ["#ff6600", "#00ffff"]
analogous("#ff6600", 25); // ["#ff3300", "#ff6600", "#ff9900"]
```

---

### Parsing / Validation / Helpers

#### `isValidHex(str: string): boolean`

* Checks `#rgb` or `#rrggbb`.

#### `normalizeHex(str: string): string`

* Ensures `#rrggbb` (expands `#rgb` and lowercases).

  ```js
  normalizeHex("0AF");  // "#00aaff"
  ```

#### `parseColor(input: string): { format: "hex" | "rgb" | "hsl", value: any }`

* Parses `#hex`, `rgb(...)`, `rgba(...)`, `hsl(...)`, `hsla(...)`.

  ```js
  parseColor("rgba(0,170,255,0.8)");
  // { format: "rgb", value: { r:0, g:170, b:255, a:0.8 } }
  ```

#### `toCSS(hex: string, property = "color", format: "hex" | "rgb" | "hsl"): string`

* Returns a ready CSS declaration.

  ```js
  toCSS("#ff6600", "background-color", "rgb");
  // "background-color: rgb(255, 102, 0);"
  ```

---

### Lab & ΔE (Color Difference)

#### `rgbToXyz(r,g,b): { X: number, Y: number, Z: number }`

#### `xyzToLab(X,Y,Z): { L: number, a: number, b: number }`

#### `rgbToLab(r,g,b): { L: number, a: number, b: number }`

#### `labToRgb(L,a,b): { r: number, g: number, b: number }`

#### `deltaE76(hexA: string, hexB: string): number`

* CIE76 ΔE (Euclidean in Lab). Lower = more similar.

  ```js
  deltaE76("#ff6600", "#ff6a00"); // small number
  ```

---

## 🧪 Examples

```js
// Choose legible text color on dynamic backgrounds
const bg = "#00aaff";
const text = getContrastColor(bg); // "#000000"

// Force AAA contrast vs white
const chip = ensureContrast("#888888", "#ffffff", 7);

// Build a brand ramp
const ramp = scale("#ff6600", "#0066ff", 7);

// Generate a UI palette around a seed color
const [a, seed, b] = analogous("#6c5ce7", 20);
const shades = generateShades(seed, 6);
```

---

## ⚙️ Notes

* **Input normalization**: Where helpful, functions clamp values to safe ranges (e.g., `rgbToHex` clamps 0–255, adjustors clamp HSL).
* **Color spaces**: Adjustors operate via HSL for intuitive results (lighten/darken/saturate/desaturate).
* **Performance**: All utilities are tiny and synchronous; safe to run in render code for simple UIs.

---

## 🔧 Type Hints (optional)

If you use TypeScript, you can add your own ambient types or generate `.d.ts`. Quick minimal sample:

```ts
export function hexToRgb(hex: string): { r: number; g: number; b: number };
export function rgbToHex(r: number, g: number, b: number): string;
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number };
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number };
// ...and so on for the rest
```

---

## 📄 License

MIT © ReadyTools