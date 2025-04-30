import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

const getUserFavoriteProduct = async () => {
  const response = await fetchApi("/favorite-products");
  return response;
};

export const useGetUserFavoriteProduct = () => {
  return useQuery({
    queryKey: ["getUserFavoriteProduct"],
    queryFn: getUserFavoriteProduct,
  });
};
