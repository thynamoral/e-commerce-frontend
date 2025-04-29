"use client";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useVerifyEmail } from "@/services/auth/verifyEmail";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { RedirectLinkButton } from "@/components/ui/button";

export default function EmailVerify() {
  const [alertMessage, setAlertMessage] = React.useState("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const exp = searchParams.get("exp");
  const isExpired = !!exp && Number(exp) < Date.now();

  const shouldVerify = !!code && !isExpired;
  const { data, isLoading, isSuccess, isError } = useVerifyEmail(
    { code },
    shouldVerify
  );
  const isInvalid = isError || isExpired;

  // useEffect
  React.useEffect(() => {
    if (isError || isExpired) {
      setAlertMessage("Invalid or expired link!");
    }
  }, [isError, isExpired]);

  React.useEffect(() => {
    if (isSuccess) {
      setAlertMessage(data?.message || "Successfully verified!");
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="w-fit h-fit mx-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <Alert
      variant={isInvalid ? "destructive" : "success"}
      className="w-fit h-fit mx-auto"
    >
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>{alertMessage}</AlertTitle>
      <AlertDescription>
        <RedirectLinkButton to={isInvalid ? "/" : "/login"}>
          {isInvalid ? "Back to home" : "Login now"}
        </RedirectLinkButton>
      </AlertDescription>
    </Alert>
  );
}
