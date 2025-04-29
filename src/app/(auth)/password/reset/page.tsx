import ResetPassword from "@/components/app/(auth)/password/reset/reset-password";
import ContainerWrapper from "@/components/ui/container-wrapper";
import ResetPasswordFormProvider from "@/providers/auth/reset-password-provider";

export default function ResetPasswordForm() {
  return (
    <ResetPasswordFormProvider>
      <ContainerWrapper className="flex justify-center items-center">
        <ResetPassword />
      </ContainerWrapper>
    </ResetPasswordFormProvider>
  );
}
