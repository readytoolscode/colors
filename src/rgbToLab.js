import { rgbToXyz } from "./rgbToXyz.js";
import { xyzToLab } from "./xyzToLab.js";

export function rgbToLab(r, g, b) {
    const { X, Y, Z } = rgbToXyz(r, g, b);
    return xyzToLab(X, Y, Z);
}
