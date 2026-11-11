const TR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

const STOP = new Set(["ve", "ile", "icin", "bir", "bu", "da", "de", "mi", "mu"]);

export function slugifyTr(input: string, max = 80): string {
  const ascii = input
    .split("")
    .map((ch) => TR_MAP[ch] ?? ch)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const words = ascii
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w));

  const slug = words.join("-").replace(/^-+|-+$/g, "");
  return slug.slice(0, max).replace(/-+$/g, "") || "yazi";
}

export function getPostSlug(post: { title: string }): string {
  return slugifyTr(post.title);
}

export function getPostHref(post: { title: string }): string {
  return `/blog/${getPostSlug(post)}`;
}

export function looksLikeCuid(value: string): boolean {
  return /^c[a-z0-9]{20,}$/i.test(value);
}
