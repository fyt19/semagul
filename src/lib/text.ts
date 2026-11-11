export function plainExcerpt(text: string, max = 140): string {
  const plain = text
    .replace(/\*\*/g, "")
    .replace(/^##\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trim()}…`;
}
