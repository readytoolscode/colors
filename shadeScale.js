import { normalizeHex } from "./normalizeHex.js";
import { hexToRgb } from "./hexToRgb.js";
import { rgbToHex } from "./rgbToHex.js";
import { rgbToLab } from "./rgbToLab.js";
import { labToRgb } from "./labToRgb.js";


const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/**
 * Generate a perceptually-even scale in CIE Lab.
 * @param {string} baseHex - base color (e.g. "#ff6600")
 * @param {object} options
 *  - steps: number (default 10)
 *  - direction: "darker" | "lighter" | "both" (default "darker")
 *  - includeBase: boolean (default true)
 *  - minL: number 0..100 (default 8)   // darkest limit
 *  - maxL: number 0..100 (default 98)  // lightest limit
 *  - easing: (t)=>t 0..1 -> 0..1 (optional, for custom spacing)
 * @returns {string[]} array of HEX colors
 */
export function generateShadeScale(baseHex, {
  steps = 10,
  direction = "darker",
  includeBase = true,
  minL = 8,
  maxL = 98,
  easing
} = {}) {
  if (steps < 1) return [];
  const hex = normalizeHex(baseHex);
  const { r, g, b } = hexToRgb(hex);
  const { L, a, b: labB } = rgbToLab(r, g, b);

  const ease = typeof easing === "function" ? easing : (t) => t;

  if (direction === "darker") {
    const start = includeBase ? 0 : 1;
    const total = includeBase ? steps - 1 : steps;
    const out = includeBase ? [hex] : [];
    for (let i = 0; i < total; i++) {
      const t = ease((i + 1) / (total));
      const Ld = L - (L - minL) * t;
      out.push(labToHex(Ld, a, labB));
    }
    return out;
  }

  if (direction === "lighter") {
    const start = includeBase ? 0 : 1;
    const total = includeBase ? steps - 1 : steps;
    const out = includeBase ? [hex] : [];
    for (let i = 0; i < total; i++) {
      const t = ease((i + 1) / (total));
      const Ll = L + (maxL - L) * t;
      out.push(labToHex(Ll, a, labB));
    }
    return out;
  }

  // direction === "both"
  if (direction === "both") {
    if (steps === 1) return [hex];

    const half = Math.floor(steps / 2);
    const hasCenter = includeBase && steps % 2 === 1;

    const darkCount = hasCenter ? half : Math.ceil(steps / 2);
    const lightCount = hasCenter ? half : Math.floor(steps / 2);

    const darker = [];
    for (let i = darkCount; i >= 1; i--) {
      const t = ease(i / darkCount);
      const Ld = L - (L - minL) * t;
      darker.push(labToHex(Ld, a, labB));
    }

    const center = hasCenter ? [hex] : [];

    const lighter = [];
    for (let i = 1; i <= lightCount; i++) {
      const t = ease(i / lightCount);
      const Ll = L + (maxL - L) * t;
      lighter.push(labToHex(Ll, a, labB));
    }

    return [...darker, ...center, ...lighter];
  }

  return [hex]; // fallback :)
}

function labToHex(L, a, b) {
  const { r, g, b: rb } = labToRgb(L, a, b);
  const R = clamp(Math.round(r), 0, 255);
  const G = clamp(Math.round(g), 0, 255);
  const B = clamp(Math.round(rb), 0, 255);
  return rgbToHex(R, G, B);
}
