import EmailVerify from "@/components/app/(auth)/email/verify/email-verify";
import ContainerWrapper from "@/components/ui/container-wrapper";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";

export default function EmailVerifyPage() {
  return (
    <ContainerWrapper className="flex">
      <Suspense fallback={<Spinner />}>
        <EmailVerify />
      </Suspense>
    </ContainerWrapper>
  );
}
