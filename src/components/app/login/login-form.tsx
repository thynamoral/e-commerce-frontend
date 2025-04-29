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
import { LoginForm as TLoginForm } from "@/providers/login-provider";
import { useFormContext } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const loginFormContext = useFormContext<TLoginForm>();
  const { control, handleSubmit } = loginFormContext;

  // handling functions
  const onSubmit = (data: TLoginForm) => {
    console.log(data);
  };

  return (
    <Form {...loginFormContext}>
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
                  <Input
                    {...field}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RedirectLinkButton to="/password/forgot">
          {"Forgot password?"}
        </RedirectLinkButton>
        <Button type="submit" className="rounded-full cursor-pointer">
          Login
        </Button>
        <p className="space-x-1 text-center">
          <span>{"Don't have an account?"}</span>
          <RedirectLinkButton to="/register">Register</RedirectLinkButton>
        </p>
      </form>
    </Form>
  );
}
