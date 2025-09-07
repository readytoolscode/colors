// base converters (már megvannak nálad)
import { hexToRgb } from "./src/hexToRgb.js";
import { rgbToHex } from "./src/rgbToHex.js";
import { rgbToHsl } from "./src/rgbToHsl.js";
import { hslToRgb } from "./src/hslToRgb.js";
import { hexToCmyk } from "./src/hexToCmyk.js";

// new utils
import { luminance } from "./src/luminance.js";
import { contrastRatio, isAccessible } from "./src/contrastRatio.js";
import { getContrastColor } from "./src/getContrastColor.js";
import { lighten } from "./src/lighten.js";
import { darken } from "./src/darken.js";
import { saturate } from "./src/saturate.js";
import { desaturate } from "./src/desaturate.js";
import { adjustHue } from "./src/adjustHue.js";
import { generateShades } from "./src/generateShades.js";
import { generateTints } from "./src/generateTints.js";
import { generateTones } from "./src/generateTones.js";
import { generateHueVariants } from "./src/generateHueVariants.js";
import { complementary, analogous, triadic, tetradic } from "./src/palettes.js";
import { toCSS } from "./src/toCSS.js";

export {
    // base
    hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToCmyk,
    // wcag / contrast
    luminance, contrastRatio, isAccessible, getContrastColor,
    // adjustments
    lighten, darken, saturate, desaturate, adjustHue,
    // generators
    generateShades, generateTints, generateTones, generateHueVariants,
    complementary, analogous, triadic, tetradic,
    // helpers
    toCSS
};
