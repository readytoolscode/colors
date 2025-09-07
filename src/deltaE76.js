import { rgbToLab } from "./rgbToLab.js";
import { hexToRgb } from "./hexToRgb.js";

/** Simple CIE76 ΔE (Euclidean in Lab). Lower = closer. */
export function deltaE76(hexA, hexB) {
    const a = rgbToLab(...Object.values(hexToRgb(hexA)));
    const b = rgbToLab(...Object.values(hexToRgb(hexB)));
    const dL = a.L - b.L;
    const da = a.a - b.a;
    const db = a.b - b.b;
    return Math.sqrt(dL*dL + da*da + db*db);
}
