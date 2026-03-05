import { apiFetch } from "../../../lib/apiFetch";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { Order, OrderDetail, OrderListResponse } from "../types/order";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/orders`;


export const getOrders = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<OrderListResponse> => {

  const queryObject: Record<string, string> = {
        page: String(params.page ?? 1),
        limit: String(params.limit ?? 10),
      };
    
  if (params.search) queryObject.search = params.search;
  if (params.sortKey) queryObject.sortKey = params.sortKey;
  if (params.sortDirection) queryObject.sortDirection = params.sortDirection;

  // 🔥 Ici on injecte les filtres dynamiques
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryObject[key] = String(value);
      }
    });
  }

  const query = new URLSearchParams(queryObject);

  return apiFetch<OrderListResponse>(
    `${BASE_URL}/?${query.toString()}`,
    {
      method: "GET",
    }
  );
}


export const getOrdersList = async (
  params: ListParams
): Promise<ListResult<Order>> => {

  const res = await getOrders(params);

  return {
    items: res.items,
    pagination: {
      page: res.pagination.page,
      limit: res.pagination.limit,
      total: res.pagination.totalItems,
      pages: res.pagination.totalPages,
    }
  }
}


export const getOrderById = async (
  id: string
): Promise<OrderDetail> => {
  return apiFetch<OrderDetail>(
    `${BASE_URL}/${id}`,
    { method: "GET" }
  );
};