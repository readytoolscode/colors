export function normalizeHex(str) {
    let h = str.trim().toLowerCase();
    if (!h.startsWith("#")) h = "#" + h;
    if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(h)) {
        throw new Error("Invalid hex color");
    }
    if (h.length === 4) {
        const [_, r, g, b] = h;
        return `#${r}${r}${g}${g}${b}${b}`;
    }
    return h;
}
