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

export default function AddProduct() {
  const addProductFormContext = useFormContext<TAddProductForm>();
  const { control, handleSubmit, reset } = addProductFormContext;

  // data from api
  const { data: categories } = useGetCategories();

  const {
    data: addProductResponse,
    mutateAsync: addProduct,
    isPending,
    isSuccess,
    isError,
    error,
  } = useAddProduct();
  // handling functions
  const onSubmit = (data: TAddProductForm) => {
    addProduct(data);
  };

  // useEffect
  React.useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(addProductResponse?.message || "Successfully registered");
      reset({ ...defaultAddProductValues });
    }
  }, [isSuccess]);

  return (
    <Form {...addProductFormContext}>
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: `${
            !isSuccess && isError ? "!text-red-500" : "!text-green-500"
          }`,
          duration: isSuccess && !isError ? Infinity : 2500,
          closeButton: isSuccess && !isError,
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
            disabled={isPending}
            className="relative cursor-pointer"
          >
            <span>Add product</span>
            {isPending && (
              <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
                <Spinner />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
