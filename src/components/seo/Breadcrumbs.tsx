import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

/** Görünür breadcrumb + JSON-LD (SEO) */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Sayfa yolu" className={cn("flex", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.href}-${item.name}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" aria-hidden />
                )}
                {isLast ? (
                  <span className="font-medium text-gray-700" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
