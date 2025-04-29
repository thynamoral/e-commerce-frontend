"use client";
import * as React from "react";
import { ForgotPasswordForm as TForgotPasswordForm } from "@/providers/auth/forgot-password-provider";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, RedirectLinkButton } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const forgotPasswordFormContext = useFormContext<TForgotPasswordForm>();
  const { control, handleSubmit } = forgotPasswordFormContext;

  // handling functions
  const onSubmit = (data: TForgotPasswordForm) => {
    console.log(data);
  };
  return (
    <Form {...forgotPasswordFormContext}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="relative rounded-full cursor-pointer">
          Reset Password
        </Button>
        <RedirectLinkButton to="/login">Back to login</RedirectLinkButton>
      </form>
    </Form>
  );
}
