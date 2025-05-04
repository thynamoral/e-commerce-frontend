"use client";
import { DataTable } from "@/components/ui/data-table";
import Spinner from "@/components/ui/spinner";
import { useGetCategories } from "@/services/category/getCategories";
import { columns } from "./columns";
import { Toaster } from "@/components/ui/sonner";
import { useDeleteCategory } from "@/services/category/deleteCategory";

export default function CategoriesListForDashboard() {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const { isSuccess: isDeleteCategorySucess, isError: isDeleteCategoryError } =
    useDeleteCategory();

  if (isLoadingCategories) return <Spinner />;

  return (
    <div>
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: `${
            !isDeleteCategorySucess && isDeleteCategoryError
              ? "!text-red-500"
              : "!text-green-500"
          }`,
          duration:
            isDeleteCategorySucess && !isDeleteCategoryError ? Infinity : 2500,
          closeButton: isDeleteCategorySucess && !isDeleteCategoryError,
          classNames: {
            closeButton: "hover:!bg-white !border-none",
          },
        }}
      />
      <DataTable columns={columns} data={categories ?? []} />
    </div>
  );
}
