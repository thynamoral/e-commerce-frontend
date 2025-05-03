import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

export type ProductsListForDashboardResponse = {
  product_id: string;
  product_name: string;
  price: number;
  product_slug: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  stock_quantity: number;
  sold_out: number;
  product_images?: ProductImage[];
};

type ProductImage = {
  product_image_id: string;
  image_url: string;
};

const getProductsListForDashboard = async () => {
  const response = await fetchApi<ProductsListForDashboardResponse[]>(
    `/dashboard/products`
  );
  return response;
};

export const useGetProductsListForDashboard = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getProductsListForDashboard"],
    queryFn: getProductsListForDashboard,
    enabled,
  });
};
