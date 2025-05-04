"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  defaultAddProductValues,
  AddProductForm as TAddProductForm,
} from "@/providers/add-product-provider";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useGetCategories } from "@/services/category/getCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAddProduct } from "@/services/product/addProduct";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/components/ui/spinner";
import { useGetCurrentProduct } from "@/services/product/getCurrentProduct";
import { useUpdateProduct } from "@/services/product/updateProduct";

type Props = {
  product_id?: string;
};

export default function AddProduct({ product_id }: Props) {
  const addProductFormContext = useFormContext<TAddProductForm>();
  const { control, handleSubmit, reset } = addProductFormContext;

  // data from api
  const { data: currentProduct, isLoading: isLoadingCurrentProduct } =
    useGetCurrentProduct(product_id ?? "", !!product_id);
  const { data: categories } = useGetCategories();

  const {
    data: addProductResponse,
    mutateAsync: addProduct,
    isPending: isPendingAddProduct,
    isSuccess: isSuccessAddProduct,
    isError: isErrorAddProduct,
    error: errorAddProduct,
  } = useAddProduct();
  const {
    data: updateProductResponse,
    mutateAsync: updateProduct,
    isPending: isPendingUpdateProduct,
    isSuccess: isSuccessUpdateProduct,
    isError: isErrorUpdateProduct,
    error: errorUpdateProduct,
  } = useUpdateProduct();
  // handling functions
  const onSubmit = (data: TAddProductForm) => {
    // console.log(data);
    if (!product_id) addProduct(data);
    else updateProduct(data);
  };

  // useEffect
  React.useEffect(() => {
    if (isErrorAddProduct) {
      toast.error(errorAddProduct?.message || "Failed to add product");
    }
    if (isErrorUpdateProduct) {
      toast.error(errorUpdateProduct?.message || "Failed to update product");
    }

    if (isSuccessAddProduct) {
      toast.success(
        addProductResponse?.message || "Product added successfully"
      );
      reset({ ...defaultAddProductValues });
    }

    if (isSuccessUpdateProduct) {
      toast.success(
        updateProductResponse?.message || "Product updated successfully"
      );
      reset({ ...defaultAddProductValues });
    }
  }, [
    isErrorAddProduct,
    errorAddProduct,
    isErrorUpdateProduct,
    errorUpdateProduct,
    isSuccessAddProduct,
    addProductResponse,
    isSuccessUpdateProduct,
    updateProductResponse,
  ]);

  React.useEffect(() => {
    if (product_id && currentProduct) {
      reset({
        product_id,
        product_name: currentProduct.product_name,
        category_id: currentProduct.category_id,
        price: currentProduct.price.toString(),
        stock_quantity: currentProduct.stock_quantity.toString(),
        //@ts-ignore
        images: currentProduct.image_urls[0]?.image_url,
        product_image_id: currentProduct.image_urls[0]?.product_image_id,
      });
    }
  }, [product_id, currentProduct]);

  if (product_id && isLoadingCurrentProduct) return <Spinner />;

  return (
    <Form {...addProductFormContext}>
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: `${
            (!isSuccessAddProduct || !isSuccessUpdateProduct) &&
            (isErrorAddProduct || isErrorUpdateProduct)
              ? "!text-red-500"
              : "!text-green-500"
          }`,
          duration:
            (isSuccessAddProduct || isSuccessUpdateProduct) &&
            (!isErrorAddProduct || !isErrorUpdateProduct)
              ? Infinity
              : 2500,
          closeButton:
            (isSuccessAddProduct || isSuccessUpdateProduct) &&
            !isErrorAddProduct &&
            !isErrorUpdateProduct,
          classNames: {
            closeButton: "hover:!bg-white !border-none",
          },
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-y-4">
            <div className="h-fit col-span-2 grid grid-cols-2 gap-x-4 gap-y-4 p-4">
              <FormField
                control={control}
                name="product_name"
                render={({ field }) => (
                  <div className="col-span-2 flex flex-col gap-2">
                    <FormLabel>Product name</FormLabel>
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="T-shirt" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={control}
                name="category_id"
                render={({ field }) => (
                  <div className="col-span-2 flex flex-col gap-2">
                    <FormLabel>Category</FormLabel>
                    <FormItem>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        onOpenChange={field.onBlur}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem
                              key={category.category_id}
                              value={category.category_id}
                            >
                              {category.category_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Price</FormLabel>
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Price" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={control}
                name="stock_quantity"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Stock quantity</FormLabel>
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Stock quantity" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            disabled={isPendingAddProduct || isPendingUpdateProduct}
            className="relative cursor-pointer"
          >
            <span>{product_id ? "Update product" : "Add product"}</span>
            {isPendingAddProduct ||
              (isPendingUpdateProduct && (
                <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
                  <Spinner />
                </span>
              ))}
          </Button>
        </div>
      </form>
    </Form>
  );
}
