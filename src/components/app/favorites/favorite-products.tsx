"use client";
import ErrorRedirect from "@/components/ui/error-redirect";
import ProductCard from "@/components/ui/product-card";
import Spinner from "@/components/ui/spinner";
import { useGetUserFavoriteProduct } from "@/services/favorite-product/getUserFavoriteProduct";
import * as React from "react";

export default function FavoriteProducts() {
  const {
    data: favoriteProducts,
    isLoading,
    isError,
  } = useGetUserFavoriteProduct();

  if (isLoading) return <Spinner />;

  if (isError) return <ErrorRedirect />;

  return (
    <div>
      {favoriteProducts?.length === 0 ? (
        <p className="text-black-3 font-medium">
          {"You haven’t added any favorites yet, go find something you love!"}
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-x-3 gap-y-6">
          {favoriteProducts?.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
