export type RefreshTokenResponse = {
  message: string;
};

export const refreshToken = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch((e) => e);
    throw errorData;
  }

  return response;
};
