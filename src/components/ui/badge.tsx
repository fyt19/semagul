import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-dark text-white",
        teal: "border-transparent bg-primary-light text-primary-dark",
        outline: "border-gray-100 text-gray-600",
        instagram: "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        linkedin: "border-transparent bg-[#0A66C2] text-white",
        article: "border-transparent bg-warning/10 text-warning",
        video: "border-transparent bg-red-100 text-red-700",
        pending: "border-transparent bg-warning/10 text-warning",
        approved: "border-transparent bg-success/10 text-success",
        completed: "border-transparent bg-primary-light text-primary-dark",
        cancelled: "border-transparent bg-error/10 text-error",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
