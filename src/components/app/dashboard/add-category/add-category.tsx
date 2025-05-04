"use client";
import * as React from "react";
import { useAddCategory } from "@/services/category/addCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCurrentCategory } from "@/services/category/getCurrentCategory";
import { useUpdateCategory } from "@/services/category/updateCategory";

export const categorySchema = z.object({
  category_name: z.string().min(1, { message: "Category name is required" }),
});

export type AddCategoryForm = z.infer<typeof categorySchema>;

type Props = {
  category_id?: string;
};

export default function AddCategory({ category_id }: Props) {
  const addCategoryForm = useForm<AddCategoryForm>({
    defaultValues: { category_name: "" },
    resolver: zodResolver(categorySchema),
  });
  const { control, handleSubmit, reset } = addCategoryForm;

  // data from api
  const { data: currentCategory, isLoading: isLoadingCurrentCategory } =
    useGetCurrentCategory(category_id ?? "");

  const {
    data: addCategoryResponse,
    mutateAsync: addCategory,
    isPending: isPendingAddCategory,
    isSuccess: isSuccessAddCategory,
    isError: isErrorAddCategory,
    error: errorAddCategory,
  } = useAddCategory();
  const {
    data: updateCategoryResponse,
    mutateAsync: updateCategory,
    isPending: isPendingUpdateCategory,
    isSuccess: isSuccessUpdateCategory,
    isError: isErrorUpdateCategory,
    error: errorUpdateCategory,
  } = useUpdateCategory();

  // handling functions
  const onSubmit = (data: AddCategoryForm) => {
    // console.log(data);
    if (!category_id) addCategory(data);
    else updateCategory({ ...data, category_id });
  };

  // useEffect
  React.useEffect(() => {
    if (isErrorAddCategory) {
      toast.error(errorAddCategory?.message || "Failed to add category");
    }
    if (isErrorUpdateCategory) {
      toast.error(errorUpdateCategory?.message || "Failed to update category");
    }

    if (isSuccessAddCategory) {
      toast.success(
        addCategoryResponse?.message || "Category added successfully"
      );
      reset({ category_name: "" });
    }

    if (isSuccessUpdateCategory) {
      toast.success(
        updateCategoryResponse?.message || "Category updated successfully"
      );
      reset({ category_name: "" });
    }
  }, [
    isErrorAddCategory,
    errorAddCategory,
    isErrorUpdateCategory,
    errorUpdateCategory,
    isSuccessAddCategory,
    addCategoryResponse,
    isSuccessUpdateCategory,
    updateCategoryResponse,
  ]);

  React.useEffect(() => {
    if (category_id && currentCategory) {
      reset({
        category_name: currentCategory.category_name,
      });
    }
  }, [category_id, currentCategory]);

  if (category_id && isLoadingCurrentCategory) return <Spinner />;

  return (
    <Form {...addCategoryForm}>
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: `${
            (!isSuccessAddCategory || !isSuccessUpdateCategory) &&
            (isErrorAddCategory || isErrorUpdateCategory)
              ? "!text-red-500"
              : "!text-green-500"
          }`,
          duration:
            (isSuccessAddCategory || isSuccessUpdateCategory) &&
            (!isErrorAddCategory || !isErrorUpdateCategory)
              ? Infinity
              : 2500,
          closeButton:
            (isSuccessAddCategory || isSuccessUpdateCategory) &&
            !isErrorAddCategory &&
            !isErrorUpdateCategory,
          classNames: {
            closeButton: "hover:!bg-white !border-none",
          },
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-[500px]">
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Category name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPendingAddCategory || isPendingUpdateCategory}
              className="relative cursor-pointer block ml-auto"
            >
              <span>{category_id ? "Update category" : "Add category"}</span>
              {isPendingAddCategory ||
                (isPendingUpdateCategory && (
                  <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
                    <Spinner />
                  </span>
                ))}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
