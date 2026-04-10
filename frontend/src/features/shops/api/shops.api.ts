import { apiFetch, apiFetchFull } from "../../../lib/apiFetch";
import type { ApiResponse } from "../../../types/global.types";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { Shop, ShopDetail, ShopForm, ShopListResponse, ShopPayload } from "../types/shop";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/shops`;


export const getShops = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<ShopListResponse> => {

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

  return apiFetch<ShopListResponse>(
    `${BASE_URL}/?${query.toString()}`,
    {
      method: "GET",
    }
  );
}

export const getShopsList = async (
  params: ListParams
): Promise<ListResult<Shop>> => {

  const res = await getShops(params);

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


export const getShopById = async (shopId: string): Promise<ShopDetail> => {

  return apiFetch<ShopDetail>(
    `${BASE_URL}/${shopId}`, 
    {
      method: 'GET'
    }
  )
}


export const getShopForm = async (shopId: string): Promise<ShopForm> => {

  return apiFetch<ShopForm>(
    `${BASE_URL}/form/${shopId}`, 
    {
      method: 'GET'
    }
  )
}

export const updateShop = async (
  id: string,
  payload: ShopPayload,
): Promise<ApiResponse<Shop>> => {

  return apiFetchFull<Shop>(
      `${BASE_URL}/${id}`, 
      {
        method: 'PUT',
        body: JSON.stringify(payload)
      }
    )
}