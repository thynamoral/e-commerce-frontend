"use client";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { useAuthStore, User } from "@/stores/authStore";
import Cookies from "js-cookie";

type Payload = {
  email: string;
  password: string;
};

type Response = {
  message: string;
  user: User;
  accessToken: string;
};

const login = async (payload: Payload): Promise<Response> => {
  try {
    const response = await apiClient.post<Response>("/auth/login", payload);
    const data = response.data;
    if (response.status !== 200) {
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (payload: Payload) => login(payload),
    onSuccess: (data) => {
      Cookies.set("user", JSON.stringify(data.user), { path: "/" });
      useAuthStore.getState().setAuth(data.accessToken, data.user);
      console.log(`Login Success!`);
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
