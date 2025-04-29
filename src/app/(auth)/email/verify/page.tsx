import EmailVerify from "@/components/app/(auth)/email/verify/email-verify";
import ContainerWrapper from "@/components/ui/container-wrapper";

export default function EmailVerifyPage() {
  return (
    <ContainerWrapper className="flex">
      <EmailVerify />
    </ContainerWrapper>
  );
}
