"use client";
import Image from "next/image";
import React from "react";
import { Badge } from "./badge";
import FavoriteProductButton from "./favorite-product-button";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { ProductResponse } from "@/services/product/getProducts";

type ProductCardProps = {
  product: ProductResponse;
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/products/123")}
      className="cursor-pointer"
    >
      <div className="space-y-2">
        <div className="relative h-[360px]">
          <FavoriteProductButton />
          <Image
            src={product.image_urls[0]?.image_url}
            alt={product.product_slug}
            fill
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
