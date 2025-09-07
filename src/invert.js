import { hexToRgb } from "./hexToRgb.js";
import { rgbToHex } from "./rgbToHex.js";

export function invert(hex) {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}
