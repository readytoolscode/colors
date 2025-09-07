// Supports #RGBA and #RRGGBBAA
export function hexAToRgba(hex) {
    let h = hex.replace("#", "");
    if (h.length === 4) {
        const [r, g, b, a] = h.split("");
        h = r + r + g + g + b + b + a + a;
    }
    if (h.length !== 8) throw new Error("Invalid hexA color");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = Math.round((parseInt(h.slice(6, 8), 16) / 255) * 100) / 100;
    return { r, g, b, a };
}
