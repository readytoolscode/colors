import { hexToRgb } from "./hexToRgb.js";
import { rgbToHsl } from "./rgbToHsl.js";

/** property: e.g. "background-color", format: "hex" | "rgb" | "hsl" */
export function toCSS(hex, property = "background-color", format = "hex") {
    if (format === "hex") return `${property}: ${hex.toLowerCase()};`;
    if (format === "rgb") {
        const { r, g, b } = hexToRgb(hex);
        return `${property}: rgb(${r}, ${g}, ${b});`;
    }
    if (format === "hsl") {
        const { r, g, b } = hexToRgb(hex);
        const { h, s, l } = rgbToHsl(r, g, b);
        return `${property}: hsl(${h} ${s}% ${l}%);`;
    }
    throw new Error('Unsupported format. Use "hex" | "rgb" | "hsl".');
}
