import { apiFetch, apiFetchFull } from "../../../lib/apiFetch";
import type { ApiResponse } from "../../../types/global.types";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { Producer, ProducerDetails, ProducerListResponse, ProducerPayload } from "../types/producer";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/producers`;


export const getProducers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<ProducerListResponse> => {

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

  return apiFetch<ProducerListResponse>(
    `${BASE_URL}/?${query.toString()}`,
    {
      method: "GET",
    }
  );
}


export const getProducersList = async (
  params: ListParams
): Promise<ListResult<Producer>> => {

  const res = await getProducers(params);

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


export const getProducerById = async (producerId: string): Promise<ProducerDetails> => {

  console.log("youpi")

  return apiFetch<ProducerDetails>(
    `${BASE_URL}/${producerId}`, 
    {
      method: 'GET'
    }
  )
}

export const updateProducer = async (
  id: string,
  payload: ProducerPayload,
): Promise<ApiResponse<Producer>> => {

  return apiFetchFull<Producer>(
    `${BASE_URL}/${id}`, 
    {
      method: 'PUT',
      body: JSON.stringify(payload)
    }
  )
}