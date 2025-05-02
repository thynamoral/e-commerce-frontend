import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

export type GetDashboardListResponse = Dashboard[];

type Dashboard = {
  title: string;
  url: string;
  items?: Dashboard[];
};

const getDashboardList = async () => {
  const response = await fetchApi<GetDashboardListResponse>(`/dashboard`);
  return response;
};

export const useGetDashboardList = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getDashboardList"],
    queryFn: getDashboardList,
    enabled,
  });
};
