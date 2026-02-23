import { apiFetch } from "../../../lib/apiFetch";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { Market, MarketListResponse, PostalCodeForSelect } from "../types/markets";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/markets`;


export const getMarkets = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<MarketListResponse> => {

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

  console.log("query :",queryObject)

  return apiFetch<MarketListResponse>(
    `${BASE_URL}/?${query.toString()}`,
    {
      method: "GET",
    }
  );
}

export const getMarketsList = async (
  params: ListParams
): Promise<ListResult<Market>> => {

  const res = await getMarkets(params);

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


export const getPostalCodes = async (): Promise<string[]> => {

  return apiFetch<string[]>(
    `${BASE_URL}/postal-codes`, 
    {
      method: 'GET'
    }
  )
}