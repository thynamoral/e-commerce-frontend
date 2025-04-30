import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";
import { ProductResponse } from "../product/getProducts";

const getUserFavoriteProduct = async () => {
  const response = await fetchApi<ProductResponse[]>("/favorite-products");
  return response;
};

export const useGetUserFavoriteProduct = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getUserFavoriteProduct"],
    queryFn: getUserFavoriteProduct,
    enabled,
  });
};
