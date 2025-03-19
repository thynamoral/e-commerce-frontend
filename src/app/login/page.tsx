import LoginPage from "@/components/pages/login/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in | Momo E-Commerce",
  description: "Momo E-Commerce login page.",
};

export default function Login() {
  return <LoginPage />;
}
