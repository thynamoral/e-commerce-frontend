"use client";
import * as React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/services/auth/logout";
import { Heart, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { mutateAsync: logout, isSuccess: isLogoutSuccess } = useLogout();

  // handlding functions
  const handleLogout = () => {
    logout();
  };

  // useEffect
  React.useEffect(() => {
    if (isLogoutSuccess) {
      localStorage.removeItem("isAuthenticated");
      window.dispatchEvent(new Event("authChange"));
      router.replace("/");
    }
  }, [isLogoutSuccess]);

  return (
    <header className="w-full sticky top-0 z-50 px-4 bg-background border-b shadow-md">
      <div className="max-w-[1400px] h-16 flex items-center justify-between mx-auto pr-2">
        <div className="flex max-w-3xl w-full items-center">
          <Link href="/" title="home" className="text-lg font-bold mr-4">
            Momo E-Commerce
          </Link>
        </div>
        <div className="flex gap-6">
          <Link href="/favorites" title="favorites">
            <Heart />
          </Link>
          {isAuthenticated && (
            <span title="logout">
              <LogOut className="cursor-pointer" onClick={handleLogout} />
            </span>
          )}
          {!isAuthenticated && (
            <Link href="/login" title="login">
              <LogIn className="cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
