"use client";
import * as React from "react";
import {
  defaultForgotPasswordValues,
  ForgotPasswordForm as TForgotPasswordForm,
} from "@/providers/auth/forgot-password-provider";
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
import { useForgotPassword } from "@/services/auth/forgotPassword";
import Spinner from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const forgotPasswordFormContext = useFormContext<TForgotPasswordForm>();
  const { control, handleSubmit, reset } = forgotPasswordFormContext;
  const {
    data: forgotPasswordResponse,
    mutateAsync: forgotPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useForgotPassword();

  // handling functions
  const onSubmit = (data: TForgotPasswordForm) => {
    forgotPassword(data);
  };

  // useEffect
  React.useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(
        forgotPasswordResponse?.message || "Successfully registered"
      );
      reset({ ...defaultForgotPasswordValues });
    }
  }, [isSuccess]);

  return (
    <Form {...forgotPasswordFormContext}>
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: `${
            !isSuccess && isError ? "!text-red-500" : "!text-green-500"
          }`,
          duration: isSuccess && !isError ? Infinity : 5000,
          closeButton: isSuccess && !isError,
          classNames: {
            closeButton: "hover:!bg-white !border-none",
          },
        }}
      />
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
        <Button
          type="submit"
          disabled={isPending}
          className="relative rounded-full cursor-pointer"
        >
          <span>Reset Password</span>
          {isPending && (
            <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
              <Spinner />
            </span>
          )}
        </Button>
        <RedirectLinkButton to="/login">Back to login</RedirectLinkButton>
      </form>
    </Form>
  );
}
