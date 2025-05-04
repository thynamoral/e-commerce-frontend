import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchApi } from "../api";

const deleteProduct = async (productId: string) => {
  const response = await fetchApi(`/products/${productId}`, {
    method: "DELETE",
  });
  return response;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getProductsListForDashboard"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
