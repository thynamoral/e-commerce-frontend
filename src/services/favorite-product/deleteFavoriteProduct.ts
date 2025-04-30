import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FavoriteProductPayload,
  FavoriteProductResponse,
} from "./favoriteProduct";
import { fetchApi } from "../api";

const deleteFavoriteProduct = async (
  deleteFavoriteProductPayload: FavoriteProductPayload
) => {
  const response = await fetchApi<FavoriteProductResponse>(
    `/favorite-products`,
    {
      method: "DELETE",
      body: JSON.stringify(deleteFavoriteProductPayload),
    }
  );
  return response;
};

export const useDeleteFavoriteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteFavoriteProduct"],
    mutationFn: (payload: FavoriteProductPayload) =>
      deleteFavoriteProduct(payload),
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({
        queryKey: ["getUserFavoriteProduct"],
      });
      return data;
    },
  });
};
