export default function colorMap(value) {
  if (value === null) return [1, 1, 1];
  const r = 1 - value;
  const g = value;
  const b = 0.2;
  return [r, g, b];
}
