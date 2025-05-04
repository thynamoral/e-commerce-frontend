import ResetPassword from "@/components/app/(auth)/password/reset/reset-password";
import ContainerWrapper from "@/components/ui/container-wrapper";
import Spinner from "@/components/ui/spinner";
import ResetPasswordFormProvider from "@/providers/auth/reset-password-provider";
import { Suspense } from "react";

export default function ResetPasswordForm() {
  return (
    <ResetPasswordFormProvider>
      <ContainerWrapper className="flex justify-center items-center">
        <Suspense fallback={<Spinner />}>
          <ResetPassword />
        </Suspense>
      </ContainerWrapper>
    </ResetPasswordFormProvider>
  );
}
