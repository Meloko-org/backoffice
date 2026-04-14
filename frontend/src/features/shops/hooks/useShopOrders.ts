import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../queryKeys/queryKey";
import { getShopOrders } from "../api/shops.api";

export function useShopOrders(
  id: string,
  params: {
    page: number;
    limit: number;
    search?: string;
    sortKey?: string;
    sortDirection?: "asc" | "desc";
    filters?: Record<string, any>;
  }
) {
  return useQuery({
    queryKey: queryKeys.shopOrders(id, params),
    queryFn: () => getShopOrders(id, params),
    enabled: !!id,
    placeholderData: (prev) => prev, // 🔥 UX parfaite pagination
  });
}