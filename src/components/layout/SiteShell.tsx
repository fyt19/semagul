"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/whatsapp/WhatsAppWidget";
import { VisitTracker } from "@/components/analytics/VisitTracker";
import { SiteConfigProvider } from "@/components/providers/SiteConfigProvider";
import type { SiteContentData } from "@/lib/site-content-types";

export function SiteShell({
  config,
  children,
}: {
  config: SiteContentData;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigProvider config={config}>
      <a href="#main-content" className="skip-link">
        Ana içeriğe geç
      </a>
      <Header />
      {children}
      <Footer />
      <WhatsAppWidget />
      <VisitTracker />
    </SiteConfigProvider>
  );
}
