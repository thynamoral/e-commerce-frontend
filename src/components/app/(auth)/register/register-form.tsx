"use client";
import { Button, RedirectLinkButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/components/ui/spinner";
import {
  defaultRegisterValues,
  RegisterForm as TRegisterForm,
} from "@/providers/auth/register-provider";
import { useRegister } from "@/services/auth/register";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const registerFormContext = useFormContext<TRegisterForm>();
  const { control, handleSubmit, reset } = registerFormContext;
  const {
    mutateAsync: register,
    isPending,
    isSuccess,
    isError,
    error,
    data: registerResponse,
  } = useRegister();

  // handling functions
  const onSubmit = (data: TRegisterForm) => {
    register(data);
  };

  // useEffect
  React.useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(registerResponse?.message || "Successfully registered");
      reset({ ...defaultRegisterValues });
    }
  }, [isSuccess]);

  return (
    <Form {...registerFormContext}>
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
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  {
                    <Button
                      type="button"
                      variant="link"
                      className="absolute top-1/2 right-0 -translate-y-1/2 no-underline cursor-pointer hover:bg-neutral-200"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {!showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  }
                </div>
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
          <span>Register</span>
          {isPending && (
            <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
              <Spinner />
            </span>
          )}
        </Button>
        <p className="space-x-1 text-center">
          <span>{"Already have an account?"}</span>
          <RedirectLinkButton to="/login">Login</RedirectLinkButton>
        </p>
      </form>
    </Form>
  );
}
