export function equalFloats(a: number, b: number): boolean {
  if (a === b) {
    return true;
  }

  const diff = Math.abs(a - b);

  if (diff < Number.EPSILON) {
    return true;
  }

  if (diff <= Number.EPSILON * Math.min(Math.abs(a), Math.abs(b))) {
    return true;
  }

  if (Math.fround(a) === Math.fround(b)) {
    return true;
  }

  return false;
}
