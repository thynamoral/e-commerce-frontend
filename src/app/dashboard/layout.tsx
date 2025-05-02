import { AppSidebar } from "@/components/app-sidebar";
import DashboardBreadcrumb from "@/components/ui/dashboard-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">
        <DashboardBreadcrumb />
        <div className="py-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
