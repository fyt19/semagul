"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/schema";

type FaqListProps = {
  faqs: readonly FaqItem[];
  className?: string;
};

export function FaqList({ faqs, className }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (!faqs.length) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-off-white"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-primary transition-transform",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-base leading-relaxed text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
