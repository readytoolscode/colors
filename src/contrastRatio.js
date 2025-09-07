import { luminance } from "./luminance.js";

/** Returns contrast ratio rounded to 2 decimals (e.g. 4.53) */
export function contrastRatio(a, b) {
    const L1 = luminance(a);
    const L2 = luminance(b);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    return Math.round(ratio * 100) / 100;
}

/** level: "AA" | "AAA", size: "normal" | "large" */
export function isAccessible(fg, bg, level = "AA", size = "normal") {
    const ratio = contrastRatio(fg, bg);
    const req = level === "AAA" ? (size === "large" ? 4.5 : 7) : (size === "large" ? 3 : 4.5);
    return ratio >= req;
}
