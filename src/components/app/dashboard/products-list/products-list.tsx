"use client";
import { DataTable } from "@/components/ui/data-table";
import Spinner from "@/components/ui/spinner";
import { useGetProductsListForDashboard } from "@/services/dashboard/getProductsListForDashboard";
import { columns } from "./columns";

export default function ProductsListForDashboard() {
  const { data: productsList, isLoading: isLoadingProductsList } =
    useGetProductsListForDashboard();

  if (isLoadingProductsList) return <Spinner />;

  return <DataTable columns={columns} data={productsList ?? []} />;
}
