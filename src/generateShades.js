import { hexToRgb } from "./hexToRgb.js";
import { rgbToHsl } from "./rgbToHsl.js";
import { hslToRgb } from "./hslToRgb.js";
import { rgbToHex } from "./rgbToHex.js";
import { clampPct } from "./_util.js";

/** Darker variants (includes original at index 0 if includeBase) */
export function generateShades(hex, count = 10, includeBase = true) {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    const items = [];
    if (includeBase) items.push(hex.toLowerCase());
    const step = l / count;
    for (let i = 1; i <= count; i++) {
        const nl = clampPct(l - step * i);
        const { r: rr, g: gg, b: bb } = hslToRgb(h, s, nl);
        items.push(rgbToHex(rr, gg, bb).toLowerCase());
    }
    return items;
}
