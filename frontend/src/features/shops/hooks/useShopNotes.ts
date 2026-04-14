import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../queryKeys/queryKey";
import { getShopNotes } from "../api/shops.api";

export function useShopNotes(
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
    queryKey: queryKeys.shopNotes(id, params),
    queryFn: () => getShopNotes(id, params),
    enabled: !!id,
    placeholderData: (prev) => prev,
  });
}