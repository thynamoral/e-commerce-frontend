import ForgotPassword from "@/components/app/(auth)/password/forgot/forgot-password";
import ContainerWrapper from "@/components/ui/container-wrapper";
import ForgotPasswordFormProvider from "@/providers/auth/forgot-password-provider";

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordFormProvider>
      <ContainerWrapper className="flex justify-center items-center">
        <ForgotPassword />
      </ContainerWrapper>
    </ForgotPasswordFormProvider>
  );
}
