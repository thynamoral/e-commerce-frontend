"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

export const defaultRegisterValues: RegisterForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterFormProvider({
  children,
}: React.PropsWithChildren) {
  const registerForm = useForm<RegisterForm>({
    defaultValues: defaultRegisterValues,
    resolver: zodResolver(registerSchema),
  });
  return <FormProvider {...registerForm}>{children}</FormProvider>;
}
