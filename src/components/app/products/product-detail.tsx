"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomAlert from "@/components/ui/custom-alert";
import Spinner from "@/components/ui/spinner";
import { formatCurrency } from "@/lib/utils";
import { useGetCurrentProduct } from "@/services/product/getCurrentProduct";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError,
  } = useGetCurrentProduct(id);

  if (isLoadingProduct) {
    return <Spinner />;
  }

  return (
    <>
      {/* show error message if there is an error */}
      {isError ? (
        <div className="flex justify-center">
          <CustomAlert title="Something went wrong" type="error" />
        </div>
      ) : null}

      <div className="lg:h-full flex">
        {product ? (
          <>
            <div className="relative w-[40%]">
              <Image
                src={product?.image_urls[0]?.image_url}
                alt={product?.product_slug}
                fill
                className="object-fill"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between px-6 pt-12">
              <div className="flex flex-col space-y-4">
                <h2 className="font-bold text-2xl uppercase">
                  {product.product_name}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">
                    {product?.price ? formatCurrency(product.price) : ""}
                  </p>
                  <Badge className="text-[10px]">{product.category_name}</Badge>
                </div>
                <p className="line-clamp-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur labore iste, ea quod maiores perspiciatis laborum
                  harum delectus est molestias debitis placeat, ab, voluptatem
                  quas quibusdam distinctio? Aliquam, suscipit iste? Doloribus
                  suscipit dolore est facere non eius quasi, cupiditate, sint
                  ipsa eaque atque corporis aut optio culpa nesciunt repudiandae
                  facilis pariatur alias. Recusandae ab dolorem pariatur,
                  placeat quam consequatur modi! Modi quibusdam, non dolore
                  sequi libero provident quo voluptatem? Consequatur,
                  repudiandae iusto veritatis vero sed alias possimus dolorib
                </p>
              </div>
              <Button className="block max-w-[70%] w-full h-14 text-xl uppercase mx-auto rounded-full cursor-pointer">
                Add to favorite
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
