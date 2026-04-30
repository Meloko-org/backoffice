import { apiFetch, apiFetchFull } from "../../../lib/apiFetch";
import type { ApiResponse } from "../../../types/global.types";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { 
  Shop, 
  ShopDashboard, 
  ShopDetail, 
  ShopForm, 
  ShopListResponse, 
  ShopNoteDetail, 
  ShopNoteListResponse, 
  ShopOrderListResponse, 
  ShopPayload, 
  ShopSubOrder 
} from "../types/shop";

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
      totalItems: res.pagination.totalItems,
      totalPages: res.pagination.totalPages,
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


export const getShopDashboard = async (
  id: string,
): Promise<ShopDashboard> => {

  return apiFetch<ShopDashboard>(
    `${BASE_URL}/${id}/dashboard`,
    {
      method: "GET",
    }
  )

}

export const getShopOrders = async (
  id: string,
  params: {
    page?: number;
    limit?: number;
    search?: string;
    sortKey?: string;
    sortDirection?: "asc" | "desc";
    filters?: Record<string, any>;
  }
): Promise<ShopOrderListResponse> => {


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

  return apiFetch<ShopOrderListResponse>(
    `${BASE_URL}/${id}/orders?${query.toString()}`,
    {
      method: "GET",
    }
  )

}


export const getShopNotes = async (
  id: string,
  params: {
    page?: number;
    limit?: number;
    search?: string;
    sortKey?: string;
    sortDirection?: "asc" | "desc";
    filters?: Record<string, any>;
  }
): Promise<ShopNoteListResponse> => {

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

  return apiFetch<ShopNoteListResponse>(
    `${BASE_URL}/${id}/notes?${query.toString()}`,
    {
      method: "GET",
    }
  )

}


export const getShopOrderById = async (
  id: string
): Promise<ShopSubOrder> => {

  return apiFetch<ShopSubOrder>(
    `${BASE_URL}/order/${id}`,
    { method: "GET" }
  )
}

export const getShopNoteById = async (
  id: string
): Promise<ShopNoteDetail> => {

  return apiFetch<ShopNoteDetail>(
    `${BASE_URL}/note/${id}`,
    { method: "GET" }
  )
}


export const validateShop = async (shopId: string) => {
  return apiFetch(`${BASE_URL}/${shopId}/validate`, {
    method: "PATCH"
  })
}

export const unvalidateShop = async (shopId: string) => {
  return apiFetch(`${BASE_URL}/${shopId}/unvalidate`, {
    method: "PATCH"
  })
}