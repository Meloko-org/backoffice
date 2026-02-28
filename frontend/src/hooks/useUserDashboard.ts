import { useQuery } from "@tanstack/react-query";
import { getUserDashboard } from "../features/users/api/users.api";
import { queryKeys } from "../features/queryKeys/queryKey";
import type { UserDashboard } from "../features/users/types/user";

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
