import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function ProductDetail() {
  return (
    <div className="lg:h-full flex">
      <div className="relative w-[40%]">
        <Image
          src="/men-tshirt1.webp"
          alt="men-striped-print-shirt"
          fill
          className="object-fill"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 pt-12">
        <div className="flex flex-col space-y-4">
          <h2 className="font-bold text-2xl uppercase">
            Men Striped Print Shirt
          </h2>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{formatCurrency(200)}</p>
            <Badge className="text-[10px]">Men Shirts</Badge>
          </div>
          <p className="line-clamp-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            labore iste, ea quod maiores perspiciatis laborum harum delectus est
            molestias debitis placeat, ab, voluptatem quas quibusdam distinctio?
            Aliquam, suscipit iste? Doloribus suscipit dolore est facere non
            eius quasi, cupiditate, sint ipsa eaque atque corporis aut optio
            culpa nesciunt repudiandae facilis pariatur alias. Recusandae ab
            dolorem pariatur, placeat quam consequatur modi! Modi quibusdam, non
            dolore sequi libero provident quo voluptatem? Consequatur,
            repudiandae iusto veritatis vero sed alias possimus dolorib
          </p>
        </div>
        <Button className="block max-w-[70%] w-full h-14 text-xl uppercase mx-auto rounded-full cursor-pointer">
          Add to favorite
        </Button>
      </div>
    </div>
  );
}
