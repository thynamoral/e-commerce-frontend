import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "../api";
import { AddProductForm } from "@/providers/add-product-provider";

export type AddProductRequest = AddProductForm;

export type AddProductResponse = {
  message: string;
};

const addProduct = async (addProductPayload: AddProductRequest) => {
  const formData = new FormData();
  formData.append("product_name", addProductPayload.product_name);
  formData.append("category_id", addProductPayload.category_id);
  formData.append("price", addProductPayload.price);
  formData.append("stock_quantity", addProductPayload.stock_quantity);

  if (addProductPayload.images) {
    formData.append("images", addProductPayload.images);
  }
  const response = await fetchApi<AddProductResponse>("/products", {
    method: "POST",
    body: formData,
  });

  return response;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: addProduct,
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getProductsListForDashboard"],
      });
      return data;
    },
  });
};
