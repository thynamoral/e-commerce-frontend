import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

type GetCurrentUserResponse = {
  user_id: string;
  email: string;
  isverified: boolean;
  role: string;
  createdat: Date;
  updatedat: Date;
};

export const getCurrentUser = async () => {
  const response = await fetchApi<GetCurrentUserResponse>(`/user`);
  return response;
};

export const useGetCurrentUser = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    enabled,
  });
};
