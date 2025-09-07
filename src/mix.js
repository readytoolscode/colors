import { hexToRgb } from "./hexToRgb.js";
import { rgbToHex } from "./rgbToHex.js";

/**
 * Mix two colors by weight (0..1). weight=0.5 → equal mix
 */
export function mix(aHex, bHex, weight = 0.5) {
    const a = hexToRgb(aHex);
    const b = hexToRgb(bHex);
    const w = Math.max(0, Math.min(1, weight));
    const r = Math.round(a.r * (1 - w) + b.r * w);
    const g = Math.round(a.g * (1 - w) + b.g * w);
    const bch = Math.round(a.b * (1 - w) + b.b * w);
    return rgbToHex(r, g, bch);
}
