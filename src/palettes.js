import { adjustHue } from "./adjustHue.js";

export const complementary = (hex) => [hex.toLowerCase(), adjustHue(hex, 180).toLowerCase()];
export const analogous = (hex, spread = 30) => [
    adjustHue(hex, -spread).toLowerCase(),
    hex.toLowerCase(),
    adjustHue(hex, spread).toLowerCase(),
];
export const triadic = (hex) => [hex.toLowerCase(), adjustHue(hex, 120).toLowerCase(), adjustHue(hex, 240).toLowerCase()];
export const tetradic = (hex) => [
    hex.toLowerCase(),
    adjustHue(hex, 90).toLowerCase(),
    adjustHue(hex, 180).toLowerCase(),
    adjustHue(hex, 270).toLowerCase(),
];
