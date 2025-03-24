import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const apiClient = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config!.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await apiClient.post<{ accessToken: string }>(
          "/auth/refresh"
        );
        const { user, setAuth } = useAuthStore();
        setAuth(data.accessToken, user);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(error.config);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
