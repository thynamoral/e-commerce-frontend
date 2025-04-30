import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "../api";

export type FavoriteProductPayload = {
  product_id: string;
};

export type FavoriteProductResponse = {
  message: string;
};

const favoriteProduct = async (
  favoriteProductPayload: FavoriteProductPayload
) => {
  const response = await fetchApi<FavoriteProductResponse>(
    `/favorite-products`,
    {
      method: "POST",
      body: JSON.stringify(favoriteProductPayload),
    }
  );
  return response;
};

export const useFavoriteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["favoriteProduct"],
    mutationFn: (payload: FavoriteProductPayload) => favoriteProduct(payload),
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({
        queryKey: ["getUserFavoriteProduct"],
      });
      return data;
    },
  });
};
