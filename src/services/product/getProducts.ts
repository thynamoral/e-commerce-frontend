import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

type GetProductsPayload = {
  search?: string;
  category?: string[];
};

export type ProductResponse = {
  product_id: string;
  product_name: string;
  product_slug: string;
  price: number;
  category_id: string;
  category_name: string;
  category_slug: string;
  image_urls: ImageUrl[];
};

export type ImageUrl = {
  image_url: string;
  product_image_id: string;
};

const getProducts = async (getProductsPayload: GetProductsPayload) => {
  const { search, category } = getProductsPayload || {};
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (category && category?.length > 0) {
    category.forEach((category) => {
      queryParams.append("category", category);
    });
  }
  const response = await fetchApi<ProductResponse[]>(
    `/products?${queryParams.toString()}`
  );
  return response;
};

export const useGetProducts = (params: GetProductsPayload) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    enabled: true,
  });
};
