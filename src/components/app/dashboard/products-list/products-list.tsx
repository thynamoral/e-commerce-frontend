"use client";
import { DataTable } from "@/components/ui/data-table";
import Spinner from "@/components/ui/spinner";
import { useGetProductsListForDashboard } from "@/services/dashboard/getProductsListForDashboard";
import { columns } from "./columns";
import { Toaster } from "@/components/ui/sonner";
import { useDeleteProduct } from "@/services/product/deleteProduct";

export default function ProductsListForDashboard() {
  const { data: productsList, isLoading: isLoadingProductsList } =
    useGetProductsListForDashboard();

  const { isSuccess: isDeleteProductSucess, isError: isDeleteProductError } =
    useDeleteProduct();

  if (isLoadingProductsList) return <Spinner />;

  return (
    <div>
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: `${
            !isDeleteProductSucess && isDeleteProductError
              ? "!text-red-500"
              : "!text-green-500"
          }`,
          duration:
            isDeleteProductSucess && !isDeleteProductError ? Infinity : 2500,
          closeButton: isDeleteProductSucess && !isDeleteProductError,
          classNames: {
            closeButton: "hover:!bg-white !border-none",
          },
        }}
      />
      <DataTable columns={columns} data={productsList ?? []} />
    </div>
  );
}
