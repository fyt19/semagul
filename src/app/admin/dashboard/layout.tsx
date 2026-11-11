import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminToaster } from "@/components/admin/AdminToaster";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminToaster />
      <AdminSidebar adminName={session.name} />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
