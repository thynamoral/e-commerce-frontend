"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(255),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export const defaultResetPasswordValues: ResetPasswordForm = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordFormProvider({
  children,
}: React.PropsWithChildren) {
  const resetPasswordForm = useForm<ResetPasswordForm>({
    defaultValues: defaultResetPasswordValues,
    resolver: zodResolver(resetPasswordSchema),
  });
  return <FormProvider {...resetPasswordForm}>{children}</FormProvider>;
}
