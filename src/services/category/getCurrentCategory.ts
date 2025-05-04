import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";
import { CategoryResponse } from "./getCategories";

const getCurrentCategory = async (categoryId: string) => {
  const response = await fetchApi<CategoryResponse>(
    `/categories/${categoryId}`
  );
  return response;
};

export const useGetCurrentCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["current-category", categoryId],
    queryFn: () => getCurrentCategory(categoryId),
  });
};
