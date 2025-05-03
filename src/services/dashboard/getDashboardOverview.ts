import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api";

export type DashboardOverviewResponse = {
  total_non_admin_users: number;
  total_products: number;
  total_categories: number;
};

const getDashboardOverview = async () => {
  const response = await fetchApi<DashboardOverviewResponse>(
    `/dashboard/overview`
  );
  return response;
};

export const useGetDashboardOverview = () => {
  return useQuery({
    queryKey: ["getDashboardOverview"],
    queryFn: getDashboardOverview,
  });
};
