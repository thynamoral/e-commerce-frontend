"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const defaultLoginValues: LoginForm = {
  email: "",
  password: "",
};

export default function LoginFormProvider({
  children,
}: React.PropsWithChildren) {
  const loginForm = useForm<LoginForm>({
    defaultValues: defaultLoginValues,
    resolver: zodResolver(loginSchema),
  });
  return <FormProvider {...loginForm}>{children}</FormProvider>;
}
