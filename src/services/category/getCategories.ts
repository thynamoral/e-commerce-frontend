import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

type CategoryResponse = {
  category_id: string;
  category_name: string;
  slug: string;
  createdat: Date;
  updatedat: Date;
};

const getCategories = async () => {
  try {
    const response = await fetchApi<CategoryResponse[]>("/categories");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
