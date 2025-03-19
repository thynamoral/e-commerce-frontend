"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "The password cannot be longer than 100 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  // react-hook-form
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { control, handleSubmit } = loginForm;

  // handling functions
  const onSubmit = (values: LoginSchema) => {
    alert(values);
  };

  return (
    <main className="md:h-svh md:p-20">
      <section className="h-full flex justify-center items-center">
        <Card className="md:w-[400px] text-center border-none shadow-none">
          <CardHeader className="grid gap-4">
            <CardTitle className="text-2xl font-bold">
              Momo E-Commerce Login
            </CardTitle>
            <CardDescription className="text-normal text-slate-800">
              Your one-stop shop for everything. Discover our products, from
              everyday essentials to extraordinary finds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 text-left"
              >
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email*"
                          className="h-14"
                        />
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
                        <Input
                          {...field}
                          placeholder="Password*"
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="link"
                  className="text-center font-semibold underline p-0"
                >
                  Forgot password?
                </Button>
                <Button type="submit" className="h-14 font-bold rounded-full">
                  LOG IN
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <p>
              <span className="text-slate-800">Don't have an account? </span>
              <Button
                type="button"
                variant="link"
                className="font-bold underline p-0"
              >
                Sign up
              </Button>
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
