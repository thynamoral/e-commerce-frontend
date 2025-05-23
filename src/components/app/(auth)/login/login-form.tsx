"use client";

import * as React from "react";
import { Button, RedirectLinkButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginForm as TLoginForm } from "@/providers/auth/login-provider";
import { useFormContext } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/services/auth/login";
import Spinner from "@/components/ui/spinner";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const loginFormContext = useFormContext<TLoginForm>();
  const { control, handleSubmit } = loginFormContext;
  const {
    mutateAsync: login,
    isPending,
    isSuccess,
    isError,
    error,
  } = useLogin();

  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";

  // handling functions
  const onSubmit = async (data: TLoginForm) => {
    const loginResponse = await login(data);
    if (loginResponse.message === "Logged in successfully") {
      router.replace(redirect);
    }
  };

  // useEffect
  React.useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("authChange"));
    }
  }, [isSuccess]);

  return (
    <Form {...loginFormContext}>
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: "!text-red-500",
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
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  {
                    <Button
                      type="button"
                      variant="link"
                      className="absolute top-1/2 right-0 -translate-y-1/2 no-underline cursor-pointer hover:bg-neutral-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  }
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RedirectLinkButton to="/password/forgot">
          {"Forgot password?"}
        </RedirectLinkButton>
        <Button
          type="submit"
          disabled={isPending}
          className="relative rounded-full cursor-pointer"
        >
          <span>Login</span>
          {isPending && (
            <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
              <Spinner />
            </span>
          )}
        </Button>
        <p className="space-x-1 text-center">
          <span>{"Don't have an account?"}</span>
          <RedirectLinkButton to="/register">Register</RedirectLinkButton>
        </p>
      </form>
    </Form>
  );
}
