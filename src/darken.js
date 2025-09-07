import { lighten } from "./lighten.js";
export function darken(hex, percent) {
    return lighten(hex, -Math.abs(percent));
}