"use client";
import * as React from "react";
import { useResetPassword } from "@/services/auth/resetPassword";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "./reset-password-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RedirectLinkButton } from "@/components/ui/button";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const exp = searchParams.get("exp");
  const isExpired = !!exp && Number(exp) < Date.now();

  if (!code || !exp || isExpired) {
    return (
      <Alert variant="destructive" className="self-start w-fit h-fit mx-auto">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>{"Invalid or expired link!"}</AlertTitle>
        <AlertDescription>
          <RedirectLinkButton to="/password/forgot">
            Back to reset password
          </RedirectLinkButton>
        </AlertDescription>
      </Alert>
    );
  }

  return <ResetPasswordForm code={code} />;
}
