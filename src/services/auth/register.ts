import { RegisterForm } from "@/providers/auth/register-provider";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "../api";

type RegisterPayload = RegisterForm;

type RegisterResponse = {
  message: string;
};

const register = async (registerPayload: RegisterPayload) => {
  const response = await fetchApi<RegisterResponse>(`/auth/register`, {
    method: "POST",
    body: JSON.stringify(registerPayload),
  });
  return response;
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};
