import Login from "@/components/app/(auth)/login/login";
import ContainerWrapper from "@/components/ui/container-wrapper";
import LoginFormProvider from "@/providers/auth/login-provider";

export default function LoginPage() {
  return (
    <LoginFormProvider>
      <ContainerWrapper className="flex justify-center items-center">
        <Login />
      </ContainerWrapper>
    </LoginFormProvider>
  );
}
