export default function colorMap(value) {
  const r = 1 - value;
  const g = value;
  const b = 0.2;
  return [r, g, b];
}
