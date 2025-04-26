import Image from "next/image";
import React from "react";
import { Badge } from "./badge";
import FavoriteProductButton from "./favorite-product-button";

export default function ProductCard() {
  return (
    <div className="space-y-2">
      <div className="relative h-[360px]">
        <FavoriteProductButton />
        <Image
          src="/men-tshirt1.webp"
          alt="men-striped-print-shirt"
          fill
          className="object-cover"
        />
      </div>
      <div className="px-3 space-y-1.5">
        <p className="font-medium text-black-3">Men Striped Print Shirt</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">$200</p>
          <Badge className="text-[10px]">Men Shirts</Badge>
        </div>
      </div>
    </div>
  );
}
