"use client";
import Image from "next/image";
import React from "react";
import { Badge } from "./badge";
import FavoriteProductButton from "./favorite-product-button";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { ProductResponse } from "@/services/product/getProducts";
import { useGetUserFavoriteProduct } from "@/services/favorite-product/getUserFavoriteProduct";
import { useAuth } from "@/hooks/useAuth";

type ProductCardProps = {
  product: ProductResponse;
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const { data: favoriteProducts } = useGetUserFavoriteProduct(
    isAuthenticated ?? false
  );

  const isFavorite = isAuthenticated
    ? favoriteProducts?.some(
        (favProductItem) => favProductItem.product_id === product?.product_id
      )
    : false;

  return (
    <div
      onClick={() => router.push(`/products/${product.product_id}`)}
      className="cursor-pointer"
    >
      <div className="space-y-2">
        <div className="relative">
          <FavoriteProductButton isFavorite={isFavorite!} />
          <Image
            src={product.image_urls[0]?.image_url}
            alt={product.product_slug}
            width={800}
            height={800}
            priority
            className="object-cover"
          />
        </div>
        <div className="px-3 space-y-1.5">
          <p className="font-medium text-black-3">{product.product_name}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
            <Badge className="text-[10px]">{product.category_name}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
