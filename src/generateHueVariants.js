import { adjustHue } from "./adjustHue.js";

/** Evenly spaced hues around the wheel (includes base at index 0 if includeBase) */
export function generateHueVariants(hex, steps = 12, includeBase = true) {
    const out = [];
    if (includeBase) out.push(hex.toLowerCase());
    const deg = 360 / steps;
    for (let i = 1; i < steps; i++) {
        out.push(adjustHue(hex, deg * i).toLowerCase());
    }
    return out;
}
