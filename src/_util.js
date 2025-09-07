export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
export const clampPct = (n) => clamp(Math.round(n), 0, 100);
export const mod360 = (n) => ((n % 360) + 360) % 360;
