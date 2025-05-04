import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchApi } from "../api";

const deleteCategory = async (category_id: string) => {
  const response = await fetchApi(`/categories/${category_id}`, {
    method: "DELETE",
  });
  return response;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category_id: string) => deleteCategory(category_id),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
