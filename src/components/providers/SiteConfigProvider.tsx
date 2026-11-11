"use client";

import { createContext, useContext } from "react";
import type { SiteContentData } from "@/lib/site-content-types";

const SiteConfigContext = createContext<SiteContentData | null>(null);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteContentData;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteContentData {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within SiteConfigProvider");
  }
  return ctx;
}
