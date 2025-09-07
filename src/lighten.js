import { hexToRgb } from "./hexToRgb.js";
import { rgbToHsl } from "./rgbToHsl.js";
import { hslToRgb } from "./hslToRgb.js";
import { rgbToHex } from "./rgbToHex.js";
import { clampPct } from "./_util.js";

/** Lighten by +percent (0..100). For darken, pass negative or use darken(). */
export function lighten(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    const nl = clampPct(l + percent);
    const { r: rr, g: gg, b: bb } = hslToRgb(h, s, nl);
    return rgbToHex(rr, gg, bb);
}
