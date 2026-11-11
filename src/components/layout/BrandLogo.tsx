import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  name: string;
  href?: string;
  variant?: "light" | "dark";
  className?: string;
};

export function BrandLogo({
  name,
  href = "/",
  variant = "dark",
  className,
}: BrandLogoProps) {
  const isLight = variant === "light";

  const content = (
    <span
      className={cn(
        "group inline-flex items-baseline gap-2 leading-none",
        className,
      )}
    >
      <span
        className={cn(
          "font-script text-[1.5rem] font-semibold sm:text-[1.7rem]",
          isLight
            ? "bg-gradient-to-r from-accent-soft via-white to-secondary bg-clip-text text-transparent"
            : "bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent",
        )}
      >
        Fizyoterapist
      </span>
      <span className="relative inline-block">
        <span
          className={cn(
            "font-script text-[1.5rem] font-semibold tracking-tight sm:text-[1.7rem]",
            isLight ? "text-white" : "text-gray-900",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-transform duration-300 group-hover:scale-x-100",
            isLight && "from-accent-soft via-white to-accent-soft",
          )}
          aria-hidden="true"
        />
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" aria-label={`${name} ana sayfa`}>
        {content}
      </Link>
    );
  }

  return content;
}
