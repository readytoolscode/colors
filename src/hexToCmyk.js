import { hexToRgb } from "./hexToRgb.js";

export function hexToCmyk(hex) {
    const { r, g, b } = hexToRgb(hex);
    const c = 1 - r / 255;
    const m = 1 - g / 255;
    const y = 1 - b / 255;
    const k = Math.min(c, m, y);

    if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
    }

    return {
        c: Math.round(((c - k) / (1 - k)) * 100),
        m: Math.round(((m - k) / (1 - k)) * 100),
        y: Math.round(((y - k) / (1 - k)) * 100),
        k: Math.round(k * 100)
    };
}
