"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const defaultForgotPasswordValues: ForgotPasswordForm = {
  email: "",
};

export default function ForgotPasswordFormProvider({
  children,
}: React.PropsWithChildren) {
  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    defaultValues: defaultForgotPasswordValues,
    resolver: zodResolver(forgotPasswordSchema),
  });
  return <FormProvider {...forgotPasswordForm}>{children}</FormProvider>;
}
