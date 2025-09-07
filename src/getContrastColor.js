import { contrastRatio } from "./contrastRatio.js";

/** Returns "#000000" or "#ffffff" whichever contrasts better with bg */
export function getContrastColor(bgHex) {
    const white = "#ffffff";
    const black = "#000000";
    const rw = contrastRatio(bgHex, white);
    const rb = contrastRatio(bgHex, black);
    return rw >= rb ? white : black;
}
