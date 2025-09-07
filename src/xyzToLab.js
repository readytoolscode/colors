const Xn = 95.047, Yn = 100.0, Zn = 108.883;
const f = (t) => (t > 0.008856) ? Math.cbrt(t) : (7.787 * t + 16 / 116);

export function xyzToLab(X, Y, Z) {
    const fx = f(X / Xn);
    const fy = f(Y / Yn);
    const fz = f(Z / Zn);
    const L = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);
    return { L, a, b };
}
