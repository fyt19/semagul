"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fade" | "scale";
};

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  },
  fade: {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0.5, delay, ease: "easeOut" as const },
    }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  },
};

/** Scroll-triggered animation wrapper for premium section reveals. */
export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
}: AnimateOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}
