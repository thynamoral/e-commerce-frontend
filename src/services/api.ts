import { UNAUTHORIZED } from "@/lib/httpStatus";
import { refreshToken } from "./auth/refreshToken";
import { stat } from "fs";

export const fetchApi = async <T>(
  request: RequestInfo,
  init?: RequestInit,
  retry: boolean = true
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${request}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      credentials: "include",
      ...init,
    }
  );

  if (response.ok) return response.json() as Promise<T>;

  const errorData = await response.json().catch((e) => e);
  const { status } = response;

  if (
    status === UNAUTHORIZED &&
    errorData?.errorCode === "INVALID_ACCESS_TOKEN" &&
    retry
  ) {
    try {
      const refreshTokenResponse = await refreshToken();
      if (refreshTokenResponse.ok)
        return fetchApi(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${request}`,
          init,
          false
        ) as Promise<T>;
      else redirectToLogin();
    } catch (error) {
      redirectToLogin();
    }
  } else if (status === UNAUTHORIZED && errorData?.errorCode === "FORBIDDEN") {
    redirectToLogin();
  }

  throw errorData as Error;
};

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname + window.location.search;
    const encodedPath = encodeURIComponent(currentPath);
    window.location.replace(`/login?redirect=${encodedPath}`);
  }
};
