import { ForgotPasswordForm } from "@/providers/auth/forgot-password-provider";
import { fetchApi } from "../api";
import { useMutation } from "@tanstack/react-query";

type ForgotPasswordPayload = ForgotPasswordForm;

type ForgotPasswordResponse = {
  message: string;
};

const forgotPassword = async (forgotPasswordPayload: ForgotPasswordPayload) => {
  const response = await fetchApi<ForgotPasswordResponse>(
    `/auth/password/forgot`,
    {
      method: "POST",
      body: JSON.stringify(forgotPasswordPayload),
    }
  );
  return response;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};
