import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";
import { ProductResponse } from "./getProducts";

const getCurrentProduct = async (productId: string) => {
  const response = await fetchApi<ProductResponse>(`/products/${productId}`);
  return response;
};

export const useGetCurrentProduct = (
  productId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["current-product", productId],
    queryFn: () => getCurrentProduct(productId),
    enabled,
  });
};
