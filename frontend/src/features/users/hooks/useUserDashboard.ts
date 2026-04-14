import { useQuery } from "@tanstack/react-query";
import type { UserDashboard } from "../types/user";
import { queryKeys } from "../../queryKeys/queryKey";
import { getUserDashboard } from "../api/users.api";

export function useUserDashboard(
  id: string,
  page: number,
  limit: number
) {
  return useQuery<UserDashboard>({
    queryKey: queryKeys.userDashboard(id, page, limit),
    queryFn: () => getUserDashboard(id, page, limit),
    enabled: !!id,    // Empêche le fetch si l’id n’est pas encore prêt
    placeholderData: (previousData) => previousData,
  });
}
