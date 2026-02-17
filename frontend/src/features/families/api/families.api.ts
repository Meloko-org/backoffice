import { apiFetch } from "../../../lib/apiFetch";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { FamilyForSelect, FamilyListResponse, FamilyPayload, ProductFamily } from "../types/family";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/families`;

export const getFamilies = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<FamilyListResponse> => {

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
  
    return apiFetch<FamilyListResponse>(
      `${BASE_URL}/?${query.toString()}`,
      {
        method: "GET",
      }
    );
}


export const getFamiliesList = async (
  params: ListParams
): Promise<ListResult<ProductFamily>> => {

  const res = await getFamilies(params);

  console.log(res)

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


export const createFamily = async (payload: FamilyPayload): Promise<ProductFamily> => {

  return apiFetch<ProductFamily>(
    `${BASE_URL}/`, 
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
}


export const updateFamily = async (
  id: string,
  payload: FamilyPayload,
): Promise<ProductFamily> => {

  return apiFetch<ProductFamily>(
    `${BASE_URL}/${id}`, 
    {
      method: 'PUT',
      body: JSON.stringify(payload)
    }
  )
}


export const getFamilyById = async (id: string): Promise<ProductFamily> => {

  return apiFetch<ProductFamily>(
    `${BASE_URL}/${id}`, 
    {
      method: 'GET'
    }
  )
}


export const deleteFamily = async (id: string): Promise<void> => {

  return apiFetch<void>(
    `${BASE_URL}/${id}`, 
    {
      method: 'DELETE'
    }
  )
}


export const getFamilyNames = async (): Promise<FamilyForSelect[]> => {

  return apiFetch<FamilyForSelect[]>(
    `${BASE_URL}/names`, 
    {
      method: 'GET'
    }
  )
}