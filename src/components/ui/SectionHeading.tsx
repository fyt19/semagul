import { AnimateOnScroll } from "./AnimateOnScroll";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  /** Ana sayfa bölümlerinde h2; sayfa başlıklarında h1 kullanın */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  as = "h2",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center mx-auto" : "text-left";

  const isDark = theme === "dark";
  const TitleTag = as;

  return (
    <AnimateOnScroll className={`mb-14 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-widest ${
            isDark ? "text-accent" : "text-primary"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <TitleTag
        className={`font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        {title}
      </TitleTag>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            isDark ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </AnimateOnScroll>
  );
}
