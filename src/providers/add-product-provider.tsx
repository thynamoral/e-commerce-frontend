"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const addProductSchema = z.object({
  product_name: z.string().min(1, { message: "Product name is required" }),
  category_id: z.string().min(1, { message: "Category is required" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  stock_quantity: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  images: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, { message: "Image is required" }),
});

export type AddProductForm = z.infer<typeof addProductSchema>;

export const defaultAddProductValues: AddProductForm = {
  product_name: "",
  category_id: "",
  price: "",
  stock_quantity: "",
  //@ts-ignore
  images: null,
};

export default function AddProductProvider({
  children,
}: React.PropsWithChildren) {
  const addProductForm = useForm<AddProductForm>({
    defaultValues: defaultAddProductValues,
    //@ts-ignore
    resolver: zodResolver(addProductSchema),
  });

  return <FormProvider {...addProductForm}>{children}</FormProvider>;
}
