"use client";
import { DataTable } from "@/components/ui/data-table";
import Spinner from "@/components/ui/spinner";
import { useGetCategories } from "@/services/category/getCategories";
import { columns } from "./columns";

export default function CategoriesListForDashboard() {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  if (isLoadingCategories) return <Spinner />;

  return <DataTable columns={columns} data={categories ?? []} />;
}
