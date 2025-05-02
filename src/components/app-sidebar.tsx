"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetDashboardList } from "@/services/dashboard/getDashboardList";
import Spinner from "./ui/spinner";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: dashboardList, isLoading: isLoadingDashboardList } =
    useGetDashboardList();
  const pathName = usePathname();

  return (
    <Sidebar className="mt-16" {...props}>
      {!dashboardList && isLoadingDashboardList ? (
        <Spinner />
      ) : (
        <>
          <SidebarHeader />
          <SidebarContent className="gap-0">
            {dashboardList?.map((item) => (
              <Collapsible
                key={item.title}
                title={item.title}
                className="group/collapsible"
                defaultOpen
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CollapsibleTrigger className="cursor-pointer">
                      {item.title}{" "}
                      {item.items?.length! > 0 && (
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item?.items?.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.url === pathName}
                            >
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarContent>
        </>
      )}
    </Sidebar>
  );
}
