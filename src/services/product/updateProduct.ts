import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "../api";
import { AddProductForm } from "@/providers/add-product-provider";

export type UpdateProductRequest = AddProductForm;

export type UpdateProductResponse = {
  message: string;
};

const updateProduct = async (updateProductPayload: UpdateProductRequest) => {
  const formData = new FormData();
  formData.append("product_name", updateProductPayload.product_name);
  formData.append("category_id", updateProductPayload.category_id);
  formData.append("price", updateProductPayload.price);
  formData.append("stock_quantity", updateProductPayload.stock_quantity);

  if (typeof updateProductPayload.images !== "string") {
    formData.append("images", updateProductPayload.images);
    formData.append(
      "delete_image_ids",
      updateProductPayload!.product_image_id as string
    );
  }
  const response = await fetchApi<UpdateProductResponse>(
    `/products/${updateProductPayload!.product_id}`,
    {
      method: "PUT",
      body: formData,
    }
  );

  return response;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: updateProduct,
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
