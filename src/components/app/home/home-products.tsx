"use client";
import ProductCard from "@/components/ui/product-card";
import Spinner from "@/components/ui/spinner";
import { useGetProducts } from "@/services/product/getProducts";
import { useSearchParams } from "next/navigation";

export default function HomeProducts() {
  const searchParams = useSearchParams();
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError,
    error,
  } = useGetProducts({
    search: searchParams.get("search") || "",
    category: searchParams.getAll("category"),
  });

  return (
    <div className="flex-1 p-4 space-y-3 bg-white rounded-md">
      <h2 className="font-bold">All Products</h2>

      {/* show spinner while loading products */}
      {isLoadingProducts ? <Spinner /> : null}

      {/* show error message if there is an error */}
      {isError ? (
        <p className="text-black-3 font-medium">{error.message}</p>
      ) : null}

      {/* show products if they are loaded */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-6">
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
