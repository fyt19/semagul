"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/constants";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export function Header() {
  const config = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-sm shadow-primary-dark/5 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <BrandLogo name={config.name} />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Ana menü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "text-primary"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/randevu"
            className="rounded-full bg-primary-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-dark/20 transition-all hover:bg-navy-800 hover:shadow-lg"
          >
            Randevu Al
          </Link>
        </nav>

        {/* Mobile / tablet menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-navy-900 xl:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
            aria-label="Mobil menü"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-slate-50 hover:text-teal-600 ${
                    pathname === link.href ? "text-teal-600" : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/randevu"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-full bg-navy-900 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Randevu Al
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
