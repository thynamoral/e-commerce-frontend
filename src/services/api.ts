import { UNAUTHORIZED } from "@/lib/httpStatus";

export const fetchApi = async <T>(
  request: RequestInfo,
  init?: RequestInit,
  retry: boolean = true
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${request}`,
    {
      ...init,
      credentials: "include",
    }
  );

  if (response.ok) return response.json() as Promise<T>;

  const errorData = await response.json().catch(() => ({}));
  const { status } = errorData;

  if (
    status === UNAUTHORIZED &&
    errorData?.errorCode === "INVALID_ACCESS_TOKEN" &&
    retry
  ) {
    try {
      const refreshTokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token/refresh`
      );
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
  }

  throw {
    status,
    ...errorData,
  };
};

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.replace("/login");
  }
};
