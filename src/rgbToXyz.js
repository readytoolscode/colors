const srgbToLinear = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

// D65 reference white
const Xn = 95.047, Yn = 100.0, Zn = 108.883;

export function rgbToXyz(r, g, b) {
    const R = srgbToLinear(r), G = srgbToLinear(g), B = srgbToLinear(b);
    const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) * 100;
    const Y = (R * 0.2126 + G * 0.7152 + B * 0.0722) * 100;
    const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) * 100;
    return { X, Y, Z };
}
