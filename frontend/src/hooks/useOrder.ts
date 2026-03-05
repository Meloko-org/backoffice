import { useQuery } from "@tanstack/react-query";
import type { OrderDetail } from "../features/orders/types/order";
import { queryKeys } from "../features/queryKeys/queryKey";
import { getOrderById } from "../features/orders/api/orders.api";

export function useOrder(id: string) {
  return useQuery<OrderDetail>({
    queryKey: queryKeys.orderDetail(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
}