export default function colorMap(value) {
  if (value === null) return [0.2, 0.2, 0.2];
  const r = 1 - value;
  const g = value;
  const b = 0.2;
  return [r, g, b];
}
