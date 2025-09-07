const toHex = (c) => {
    const v = Math.max(0, Math.min(255, Math.round(c)));
    return v.toString(16).padStart(2, "0");
};

export function rgbaToHexA(r, g, b, a = 1) {
    const aa = Math.max(0, Math.min(1, a));
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(Math.round(aa * 255))}`;
}
