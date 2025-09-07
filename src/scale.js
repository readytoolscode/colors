import { mix } from "./mix.js";

/**
 * Creates a color scale between two colors.
 * Returns an array of length `steps`.
 */
export function scale(startHex, endHex, steps = 5) {
    const n = Math.max(2, Math.round(steps));
    const out = [];
    for (let i = 0; i < n; i++) {
        out.push(mix(startHex, endHex, i / (n - 1)));
    }
    return out;
}
