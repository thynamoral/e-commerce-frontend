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
import {
  defaultResetPasswordValues,
  ResetPasswordForm as TResetPasswordForm,
} from "@/providers/auth/reset-password-provider";
import { useResetPassword } from "@/services/auth/resetPassword";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Spinner from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  code: string;
};

export default function ResetPasswordForm({ code }: Props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const resetFormContext = useFormContext<TResetPasswordForm>();
  const { control, handleSubmit, reset } = resetFormContext;
  const {
    data: resetPasswordResponse,
    mutateAsync: resetPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useResetPassword();
  const router = useRouter();

  // handling functions
  const onSubmit = (data: TResetPasswordForm) => {
    resetPassword({ ...data, code });
  };

  // useEffect
  React.useEffect(() => {
    if (isError) {
      toast.error(
        error?.message === "Invalid uuid"
          ? "Invalid or expired link!"
          : `Something went wrong, ${error?.message}`
      );
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(resetPasswordResponse?.message || "Successfully reset");
      reset({ ...defaultResetPasswordValues });
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }
  }, [isSuccess]);

  return (
    <div className="max-w-[400px] w-full bg-background shadow-md rounded-[16px] px-10 py-6 space-y-8">
      <Toaster
        position="top-center"
        offset={{ top: 100 }}
        toastOptions={{
          className: `${
            !isSuccess && isError ? "!text-red-500" : "!text-green-500"
          }`,
          duration: 2500,
          closeButton: isSuccess && !isError,
          classNames: {
            closeButton: "hover:!bg-white !border-none",
          },
        }}
      />
      <header className="text-center space-y-4">
        <h2 className="text-center text-lg font-bold">Reset Your Password</h2>
      </header>
      <Form {...resetFormContext}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            <span>Submit</span>
            {isPending && (
              <span className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 text-black-3">
                <Spinner />
              </span>
            )}
          </Button>
          <RedirectLinkButton to="/password/forgot">
            {"Reset password again?"}
          </RedirectLinkButton>
        </form>
      </Form>
    </div>
  );
}
