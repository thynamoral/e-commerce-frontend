"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { useGetDashboardOverview } from "@/services/dashboard/getDashboardOverview";
import Link from "next/link";

export default function DashboardOverview() {
  const { data: dashboardOverview, isLoading: isLoadingDashboardOverview } =
    useGetDashboardOverview();

  if (isLoadingDashboardOverview) return <Spinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <Card className="pb-2">
          <CardContent>
            <CardTitle className="text-black-3 mb-3">Total Users</CardTitle>
            <p className="text-3xl text-black font-bold">
              {dashboardOverview?.total_non_admin_users}{" "}
              {dashboardOverview?.total_non_admin_users === 1
                ? "User"
                : "Users"}
            </p>
          </CardContent>
        </Card>
        <Card className="pb-2">
          <CardContent>
            <CardTitle className="text-black-3 mb-3">Total Products</CardTitle>
            <p className="text-3xl text-black font-bold">
              {dashboardOverview?.total_products}{" "}
              {dashboardOverview?.total_products === 1 ? "Product" : "Products"}
            </p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="link" className="font-normal underline" asChild>
              <Link href="/dashboard/products-list">View all products</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="pb-2">
          <CardContent>
            <CardTitle className="text-black-3 mb-3">
              Total Categories
            </CardTitle>
            <p className="text-3xl text-black font-bold">
              {dashboardOverview?.total_categories}{" "}
              {dashboardOverview?.total_categories === 1
                ? "category"
                : "categories"}
            </p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="link" className="font-normal underline" asChild>
              <Link href="/dashboard/categories-list">View all categories</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
