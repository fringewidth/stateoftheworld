export default function colorMap(value) {
  const r = value < 0.5 ? 1 : 1 - (value - 0.5) * 2;
  const g = value < 0.5 ? value * 2 : 1;
  const b = value > 0.5 ? 1 : value * 2;
  return [r, g, b];
}
