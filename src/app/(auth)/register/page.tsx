import Register from "@/components/app/(auth)/register/register";
import ContainerWrapper from "@/components/ui/container-wrapper";
import RegisterFormProvider from "@/providers/auth/register-provider";

export default function RegisterPage() {
  return (
    <RegisterFormProvider>
      <ContainerWrapper className="flex justify-center items-center">
        <Register />
      </ContainerWrapper>
    </RegisterFormProvider>
  );
}
