"use client";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomAlert from "@/components/ui/custom-alert";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/components/ui/spinner";
import { formatCurrency } from "@/lib/utils";
import { useDeleteFavoriteProduct } from "@/services/favorite-product/deleteFavoriteProduct";
import { useFavoriteProduct } from "@/services/favorite-product/favoriteProduct";
import { useGetUserFavoriteProduct } from "@/services/favorite-product/getUserFavoriteProduct";
import { useGetCurrentProduct } from "@/services/product/getCurrentProduct";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useGetCurrentProduct(id);

  const { isAuthenticated } = useAuth();

  // handle favorite product
  const {
    data: favoriteProducts,
    isLoading: isLoadingFavoriteProducts,
    isError: isErrorFavoriteProducts,
  } = useGetUserFavoriteProduct(isAuthenticated ?? false);
  const {
    data: favoritedProductResponse,
    mutateAsync: favoriteProduct,
    isSuccess: isFavoriteProductSuccess,
    isError: isFavoriteProductError,
    error: errorMessageFavoriteProduct,
  } = useFavoriteProduct();
  const {
    data: deletedFavoriteProductResponse,
    mutateAsync: deleteFavoriteProduct,
    isSuccess: isDeleteFavoriteProductSuccess,
    isError: isDeleteFavoriteProductError,
    error: errorMessageDeleteFavoriteProduct,
  } = useDeleteFavoriteProduct();

  const isFavorite = favoriteProducts?.some(
    (favProductItem) => favProductItem.product_id === product?.product_id
  );

  // handling functions
  const handleFavoriteProduct = (product_id: string) => {
    favoriteProduct({ product_id });
  };

  const handleDeleteFavoriteProduct = (product_id: string) => {
    deleteFavoriteProduct({ product_id });
  };

  // useEffect
  React.useEffect(() => {
    if (isFavoriteProductError) {
      toast.error(
        errorMessageFavoriteProduct?.message || "Something went wrong"
      );
    }
  }, [isFavoriteProductError, errorMessageFavoriteProduct]);

  React.useEffect(() => {
    if (isDeleteFavoriteProductError) {
      toast.error(
        errorMessageDeleteFavoriteProduct?.message || "Something went wrong"
      );
    }
  }, [isDeleteFavoriteProductError, errorMessageDeleteFavoriteProduct]);

  React.useEffect(() => {
    if (isFavoriteProductSuccess) {
      toast.error(favoritedProductResponse?.message || "Something went wrong");
    }
  }, [isFavoriteProductSuccess, favoritedProductResponse]);

  React.useEffect(() => {
    if (isDeleteFavoriteProductSuccess) {
      toast.error(
        deletedFavoriteProductResponse?.message || "Something went wrong"
      );
    }
  }, [isDeleteFavoriteProductSuccess, deletedFavoriteProductResponse]);

  if (isLoadingProduct || isLoadingFavoriteProducts) {
    return <Spinner />;
  }

  return (
    <>
      {/* show error message if there is an error */}
      {isErrorProduct || isErrorFavoriteProducts ? (
        <div className="flex justify-center">
          <CustomAlert title="Something went wrong" type="error" />
        </div>
      ) : null}

      <div className="flex flex-col md:flex-row md:min-h-[300px]">
        <Toaster
          position="top-center"
          offset={{ top: 100 }}
          toastOptions={{
            className: `${
              !isFavoriteProductSuccess && isFavoriteProductError
                ? "!text-red-500"
                : "!text-green-500"
            }`,
            duration: 2500,
            classNames: {
              closeButton: "hover:!bg-white !border-none",
            },
          }}
        />
        <Toaster
          position="top-center"
          offset={{ top: 100 }}
          toastOptions={{
            className: `${
              !isDeleteFavoriteProductSuccess && isDeleteFavoriteProductError
                ? "!text-red-500"
                : "!text-green-500"
            }`,
            duration: 2500,
            classNames: {
              closeButton: "hover:!bg-white !border-none",
            },
          }}
        />
        {product ? (
          <>
            <div className="w-full flex justify-center items-center md:w-[40%]">
              <Image
                src={product?.image_urls[0]?.image_url}
                alt={product?.product_slug}
                width={800}
                height={800}
                priority
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between px-6 pt-12">
              <div className="flex flex-col space-y-4 mb-4">
                <h2 className="font-bold text-2xl uppercase">
                  {product.product_name}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">
                    {product?.price ? formatCurrency(product.price) : ""}
                  </p>
                  <Badge className="text-[10px]">{product.category_name}</Badge>
                </div>
                <p className="line-clamp-4 lg:line-clamp-6">
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
              <Button
                className="block w-full uppercase mx-auto rounded-full cursor-pointer text-sm lg:h-14 lg:text-xl"
                onClick={() => {
                  isFavorite
                    ? handleDeleteFavoriteProduct(product?.product_id)
                    : handleFavoriteProduct(product?.product_id);
                }}
              >
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
