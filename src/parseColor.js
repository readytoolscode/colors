// Parses "#rrggbb", "#rgb", "rgb(r,g,b)", "rgba(r,g,b,a)", "hsl(h,s%,l%)", "hsla(h,s%,l%,a)"
export function parseColor(input) {
    const str = String(input).trim();

    // hex
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(str)) {
        return { format: "hex", value: str.toLowerCase() };
    }

    // rgb/rgba
    let m = str.match(/^rgba?\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*(?:,\s*([0-9.]+)\s*)?\)$/i);
    if (m) {
        const r = +m[1], g = +m[2], b = +m[3], a = m[4] !== undefined ? +m[4] : 1;
        return { format: "rgb", value: { r, g, b, a } };
    }

    // hsl/hsla
    m = str.match(/^hsla?\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*(?:,\s*([0-9.]+)\s*)?\)$/i);
    if (m) {
        const h = +m[1], s = +m[2], l = +m[3], a = m[4] !== undefined ? +m[4] : 1;
        return { format: "hsl", value: { h, s, l, a } };
    }

    throw new Error("Unsupported color format");
}
