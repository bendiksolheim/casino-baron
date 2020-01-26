const limit = (x: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, x));

const between = (x: number, min: number, max: number): boolean =>
  x >= min && x <= max;

const accelerate = (v: number, accel: number, dt: number): number =>
  v + accel * dt;

const lerp = (n: number, dn: number, dt: number): number => n + dn * dt;
