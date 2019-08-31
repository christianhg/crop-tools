export function randomNumber({
  from,
  to,
}: {
  from: number;
  to: number;
}): number {
  const min = Math.ceil(from);
  const max = Math.floor(to);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
