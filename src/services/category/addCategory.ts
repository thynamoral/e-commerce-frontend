import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "../api";
import { AddCategoryForm } from "@/components/app/dashboard/add-category/add-category";

type AddCategoryRequest = AddCategoryForm;

type AddCategoryResponse = {
  message: string;
};

const addCategory = async (addCategoryPayload: AddCategoryRequest) => {
  const response = await fetchApi<AddCategoryResponse>("/categories", {
    method: "POST",
    body: JSON.stringify(addCategoryPayload),
  });

  return response;
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addCategory"],
    mutationFn: addCategory,
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      return data;
    },
  });
};
