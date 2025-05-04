import Login from "@/components/app/(auth)/login/login";
import ContainerWrapper from "@/components/ui/container-wrapper";
import Spinner from "@/components/ui/spinner";
import LoginFormProvider from "@/providers/auth/login-provider";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <LoginFormProvider>
      <ContainerWrapper className="flex justify-center items-center">
        <Suspense fallback={<Spinner />}>
          <Login />
        </Suspense>
      </ContainerWrapper>
    </LoginFormProvider>
  );
}
