import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "../api";

type LogoutResponse = {
  message: string;
};

const logout = async () => {
  const response = await fetchApi<LogoutResponse>(`/auth/logout`, {
    method: "POST",
  });
  return response;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.removeQueries();
      // queryClient.removeQueries({ queryKey: ["getUserFavoriteProduct"] });
      // queryClient.removeQueries({ queryKey: ["getCurrentUser"] });
      return data;
    },
  });
};
