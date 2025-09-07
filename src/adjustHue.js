import { hexToRgb } from "./hexToRgb.js";
import { rgbToHsl } from "./rgbToHsl.js";
import { hslToRgb } from "./hslToRgb.js";
import { rgbToHex } from "./rgbToHex.js";
import { mod360 } from "./_util.js";

/** Rotate hue by degrees (can be negative) */
export function adjustHue(hex, degrees) {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    const nh = mod360(h + degrees);
    const { r: rr, g: gg, b: bb } = hslToRgb(nh, s, l);
    return rgbToHex(rr, gg, bb);
}
