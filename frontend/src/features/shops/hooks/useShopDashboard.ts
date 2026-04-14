import { useQuery } from "@tanstack/react-query";
import { type ShopDashboard } from "../types/shop";
import { queryKeys } from "../../queryKeys/queryKey";
import { getShopDashboard } from "../api/shops.api";

export function useShopDashboard(
  id: string
) {

  return useQuery<ShopDashboard>({
    queryKey: queryKeys.shopDashboard(id),
    queryFn: () => getShopDashboard(id),
    enabled: !!id,
    // placeholderData: (previousData) => previousData,
  });
}