"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AddProductForm as TAddProductForm } from "@/providers/add-product-provider";
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

export default function AddProduct() {
  const addProductFormContext = useFormContext<TAddProductForm>();
  const { control, handleSubmit, reset } = addProductFormContext;

  // data from api
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  // handling functions
  const onSubmit = (data: TAddProductForm) => {
    console.log(data);
  };

  return (
    <Form {...addProductFormContext}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-y-4">
            <div className="h-fit col-span-2 grid grid-cols-2 gap-x-4 gap-y-4 p-4">
              <FormField
                control={control}
                name="product_name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input {...field} placeholder="Product name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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
                )}
              />
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Price" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="stock_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Stock quantity" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
          <Button type="submit" className="cursor-pointer">
            Add product
          </Button>
        </div>
      </form>
    </Form>
  );
}
