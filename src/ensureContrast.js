import { contrastRatio } from "./contrastRatio.js";
import { hexToRgb } from "./hexToRgb.js";
import { rgbToHsl } from "./rgbToHsl.js";
import { hslToRgb } from "./hslToRgb.js";
import { rgbToHex } from "./rgbToHex.js";

/**
 * Adjust `fg` lightness to meet desired WCAG ratio vs `bg`.
 * Returns adjusted hex (or original if already sufficient).
 * direction: "auto" | "lighter" | "darker"
 */
export function ensureContrast(fg, bg, desired = 4.5, direction = "auto") {
    if (contrastRatio(fg, bg) >= desired) return fg;

    // move L in HSL until ratio met
    const { r, g, b } = hexToRgb(fg);
    const { h, s, l } = rgbToHsl(r, g, b);

    const tryDir = (dirSign) => {
        let lo = 0, hi = 100, best = l;
        for (let i = 0; i < 12; i++) {
            const mid = Math.round((lo + hi) / 2);
            const nl = dirSign > 0 ? Math.max(l, mid) : Math.min(l, mid);
            const { r: rr, g: gg, b: bb } = hslToRgb(h, s, nl);
            const hex = rgbToHex(rr, gg, bb);
            const ok = contrastRatio(hex, bg) >= desired;
            if (ok) { best = nl; hi = mid - dirSign; }
            else { lo = mid + dirSign; }
        }
        const { r: rr, g: gg, b: bb } = hslToRgb(h, s, best);
        return rgbToHex(rr, gg, bb);
    };

    if (direction === "lighter") return tryDir(+1);
    if (direction === "darker") return tryDir(-1);

    // auto: try both and pick with minimal delta
    const lighter = tryDir(+1);
    const darker = tryDir(-1);

    const toL = (hex) => rgbToHsl(...Object.values(hexToRgb(hex))).l;
    return Math.abs(toL(lighter) - l) < Math.abs(toL(darker) - l) ? lighter : darker;
}
