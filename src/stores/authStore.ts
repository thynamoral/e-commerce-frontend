import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setAuth: (token: string, user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setAuth: (token, user) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ accessToken: token, user });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    set({ accessToken: null, user: null });
  },
}));
