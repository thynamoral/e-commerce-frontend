import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

type VerifyEmailPayload = {
  code: string;
};

type VerifyEmailResponse = {
  message: string;
};

const verifyEmail = async (verifyEmailPayload: VerifyEmailPayload) => {
  const { code } = verifyEmailPayload;
  const response = await fetchApi<VerifyEmailResponse>(
    `/auth/email/verify?code=${code}`
  );
  return response;
};

export const useVerifyEmail = (
  verifyEmailPayload: VerifyEmailPayload,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["email-verify", verifyEmailPayload],
    queryFn: () => verifyEmail(verifyEmailPayload),
    enabled,
  });
};
