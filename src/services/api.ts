import { UNAUTHORIZED } from "@/lib/httpStatus";
import { refreshToken } from "./auth/refreshToken";

export const fetchApi = async <T>(
  request: RequestInfo,
  init?: RequestInit,
  retry: boolean = true
): Promise<T> => {
  const isFormData = init?.body instanceof FormData;
  const response = await fetch(`/api${request}`, {
    headers: isFormData
      ? { ...init?.headers } // don't set content-type for FormData
      : {
          "Content-Type": "application/json",
          ...init?.headers,
        },
    credentials: "include",
    ...init,
  });

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
        return fetchApi(`/api${request}`, init, false) as Promise<T>;
      else throw refreshTokenResponse;
    } catch (error) {
      removeAuthLocalStorage();
      redirectToLogin();
    }
  } else if (status === UNAUTHORIZED && errorData?.errorCode === "FORBIDDEN") {
    removeAuthLocalStorage();
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

const removeAuthLocalStorage = () => {
  localStorage.removeItem("isAuthenticated");
  window.dispatchEvent(new Event("authChange"));
};
