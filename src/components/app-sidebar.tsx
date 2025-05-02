"use client";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetDashboardList } from "@/services/dashboard/getDashboardList";
import * as React from "react";
import Spinner from "./ui/spinner";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Main Menu",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          isActive: true,
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
  ],
};

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
          <SidebarContent>
            {/* We create a SidebarGroup for each parent. */}
            {dashboardList?.map((item) => (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item?.items?.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.url === pathName}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </>
      )}
    </Sidebar>
  );
}
