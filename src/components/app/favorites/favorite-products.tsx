"use client";
import Spinner from "@/components/ui/spinner";
import { useGetUserFavoriteProduct } from "@/services/favorite-product/getUserFavoriteProduct";
import * as React from "react";

export default function FavoriteProducts() {
  const { data, isLoading, isError } = useGetUserFavoriteProduct();

  if (isLoading) return <Spinner />;

  return <div>FavoriteProducts</div>;
}
