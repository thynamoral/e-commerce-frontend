import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "../api";

type UpdateCategoryRequest = {
  category_id: string;
  category_name: string;
};

type UpdateCategoryResponse = {
  message: string;
};

const updateCategory = async (updateCategoryPayload: UpdateCategoryRequest) => {
  const { category_id, category_name } = updateCategoryPayload;
  const response = await fetchApi<UpdateCategoryResponse>(
    `/categories/${category_id}`,
    {
      method: "PUT",
      body: JSON.stringify({ category_name }),
    }
  );
  return response;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      return data;
    },
  });
};
