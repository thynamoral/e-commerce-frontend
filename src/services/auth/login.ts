import { LoginForm } from "@/providers/auth/login-provider";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "../api";

type LoginPayload = LoginForm;

type LoginResponse = {
  user: {
    user_id: string;
    email: string;
    isverified: boolean;
    role: string;
  };
  message: string;
};

const login = async (loginPayload: LoginPayload) => {
  const response = await fetchApi<LoginResponse>(`/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginPayload),
  });
  return response;
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};
