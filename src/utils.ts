export function generateRandomCode() {
  const n: string = (Math.random() * 0xfffff * 1000000).toString(16);
  return n.slice(0, 6);
}
