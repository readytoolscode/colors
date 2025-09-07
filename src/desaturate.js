import { saturate } from "./saturate.js";
export function desaturate(hex, percent) {
    return saturate(hex, -Math.abs(percent));
}