"use client";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = unknown

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    syncAuth(); // run once on mount
    window.addEventListener("authChange", syncAuth);

    return () => {
      window.removeEventListener("authChange", syncAuth);
    };
  }, []);

  return { isAuthenticated };
};
