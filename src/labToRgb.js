// Inverse of rgbToLab via Lab->XYZ->RGB
const Xn = 95.047, Yn = 100.0, Zn = 108.883;
const finv = (t) => (t ** 3 > 0.008856) ? (t ** 3) : ((t - 16 / 116) / 7.787);
const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

export function labToRgb(L, a, b) {
    const fy = (L + 16) / 116;
    const fx = a / 500 + fy;
    const fz = fy - b / 200;

    const X = Xn * finv(fx);
    const Y = Yn * finv(fy);
    const Z = Zn * finv(fz);

    // XYZ -> linear RGB
    let R =  3.2406 * (X/100) - 1.5372 * (Y/100) - 0.4986 * (Z/100);
    let G = -0.9689 * (X/100) + 1.8758 * (Y/100) + 0.0415 * (Z/100);
    let B =  0.0557 * (X/100) - 0.2040 * (Y/100) + 1.0570 * (Z/100);

    const linearToSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1/2.4) - 0.055);

    return {
        r: clamp(255 * linearToSrgb(R)),
        g: clamp(255 * linearToSrgb(G)),
        b: clamp(255 * linearToSrgb(B)),
    };
}
