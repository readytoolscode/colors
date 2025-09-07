import { hexToRgb } from "./hexToRgb.js";
import { rgbToHsl } from "./rgbToHsl.js";
import { hslToRgb } from "./hslToRgb.js";
import { rgbToHex } from "./rgbToHex.js";
import { clampPct } from "./_util.js";

/** Increase saturation by +percent (0..100). For desaturate, pass negative or use desaturate(). */
export function saturate(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    const ns = clampPct(s + percent);
    const { r: rr, g: gg, b: bb } = hslToRgb(h, ns, l);
    return rgbToHex(rr, gg, bb);
}
