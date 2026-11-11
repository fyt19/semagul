import { SiteShell } from "@/components/layout/SiteShell";
import { getSiteContent } from "@/lib/site-content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteContent();

  return <SiteShell config={config}>{children}</SiteShell>;
}
