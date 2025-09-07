import { hexToRgb } from "./hexToRgb.js";
import { rgbToHsl } from "./rgbToHsl.js";
import { hslToRgb } from "./hslToRgb.js";
import { rgbToHex } from "./rgbToHex.js";
import { clampPct } from "./_util.js";

/** Lower-saturation variants towards gray (includes original at index 0 if includeBase) */
export function generateTones(hex, count = 10, includeBase = true) {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    const items = [];
    if (includeBase) items.push(hex.toLowerCase());
    const step = s / count;
    for (let i = 1; i <= count; i++) {
        const ns = clampPct(s - step * i);
        const { r: rr, g: gg, b: bb } = hslToRgb(h, ns, l);
        items.push(rgbToHex(rr, gg, bb).toLowerCase());
    }
    return items;
}
