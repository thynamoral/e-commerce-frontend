import { UNAUTHORIZED } from "@/lib/httpStatus";

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

  throw errorData as Error;
};

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.replace("/login");
  }
};
