import { apiFetch, apiFetchFull } from "../../../lib/apiFetch";
import type { ApiResponse } from "../../../types/global.types";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { User, UserDashboard, UserListResponse, UserPayload } from "../types/user";

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


export const suspendUser = async (userId: string, reason: string) => {
  return apiFetch(`${BASE_URL}/${userId}/suspend`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });
};

export const unsuspendUser = async (userId: string) => {
  return apiFetch(`${BASE_URL}/${userId}/reactivate`, {
    method: "PATCH",
  });
};

export const deleteUser = async (userId: string) => {
  return apiFetch(`${BASE_URL}/${userId}`, {
    method: "DELETE",
  });
};

export const restoreUser = async (userId: string) => {
  return apiFetch(`${BASE_URL}/${userId}/restore`, {
    method: "PATCH",
  });
}


export const getUserById = async (userId: string): Promise<User> => {

  return apiFetch<User>(
    `${BASE_URL}/${userId}`, 
    {
      method: 'GET'
    }
  )
}

export const updateUser = async (
  id: string,
  payload: UserPayload,
  // token?: string,
): Promise<ApiResponse<User>> => {


  return apiFetchFull<User>(
    `${BASE_URL}/${id}`, 
    {
      method: 'PUT',
      // headers: token
      // ? { Authorization: `Bearer ${token}` }
      // : undefined,
      body: JSON.stringify(payload)
    }
  )
}