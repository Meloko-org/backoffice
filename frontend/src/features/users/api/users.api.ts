import { apiFetch } from "../../../lib/apiFetch";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { User, UserDashboard, UserListResponse } from "../types/user";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/users`;



export const getUsers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<UserListResponse> => {

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

  return apiFetch<UserListResponse>(
    `${BASE_URL}/?${query.toString()}`,
    {
      method: "GET",
    }
  );
}

export const getUsersList = async (
  params: ListParams
): Promise<ListResult<User>> => {


  console.log("liste params :", params)

  const res = await getUsers(params);

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


export const getUserDashboard = async (
  id: string,
  page: number,
  limit: number,
): Promise<UserDashboard> => {

  const queryObject: Record<string, string> = {
    page: String(page ?? 1),
    limit: String(limit ?? 10),
  };

  const query = new URLSearchParams(queryObject);

  return apiFetch<UserDashboard>(
    `${BASE_URL}/${id}/dashboard?${query.toString()}`,
    {
      method: "GET",
    }
  )
}