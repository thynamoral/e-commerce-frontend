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

export const categorySchema = z.object({
  category_name: z.string().min(1, { message: "Category name is required" }),
});

export type AddCategoryForm = z.infer<typeof categorySchema>;

export default function AddCategory() {
  const addCategoryForm = useForm<AddCategoryForm>({
    defaultValues: { category_name: "" },
    resolver: zodResolver(categorySchema),
  });
  const { control, handleSubmit, reset } = addCategoryForm;

  const {
    data: addCategoryResponse,
    mutateAsync: addCategory,
    isPending,
    isSuccess,
    isError,
    error,
  } = useAddCategory();

  // handling functions
  const onSubmit = (data: AddCategoryForm) => {
    addCategory(data);
  };

  // useEffect
  React.useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(addCategoryResponse?.message || "Successfully registered");
      reset({ category_name: "" });
    }
  }, [isSuccess]);

  return (
    <Form {...addCategoryForm}>
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
              disabled={isPending}
              className="relative cursor-pointer block ml-auto"
            >
              <span>Add category</span>
              {isPending && (
                <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
                  <Spinner />
                </span>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
