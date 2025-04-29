import { ResetPasswordForm } from "@/providers/auth/reset-password-provider";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "../api";

type ResetPasswordPayload = ResetPasswordForm & {
  code: string;
};

type ResetPasswordResponse = {
  message: string;
};

const resetPassword = async (resetPasswordPayload: ResetPasswordPayload) => {
  const response = await fetchApi<ResetPasswordResponse>(
    `/auth/password/reset`,
    {
      method: "POST",
      body: JSON.stringify(resetPasswordPayload),
    }
  );
  return response;
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};
