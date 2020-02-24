export function range(from: number, toExclusive: number): number[] {
  return Array(toExclusive - from)
    .fill("")
    .map((_, i) => i + from);
}
