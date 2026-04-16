import { apiFetch, apiFetchFull } from "../../../lib/apiFetch";
import type { ApiResponse } from "../../../types/global.types";
import type { ListParams, ListResult } from "../../../types/list.types";
import type {
  ProductCategory,
  CategoryListResponse,
  CategoryPayload,
  UpdateCategoryPayload,
  CategoryForSelect,
} from "../types/category";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/categories`;



/* getCategories travaille avec les types backend purs */
export const getCategories = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<CategoryListResponse> => {

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

  return apiFetch<CategoryListResponse>(
    `${BASE_URL}/?${query.toString()}`,
    {
      method: "GET",
    }
  );
};

/* getCategoriesList est l'adaptateur qui fait le lien entre getCategories et useAdminList */
/* elle transforme les types backend en types interne standard */
export const getCategoriesList = async (
  params: ListParams
): Promise<ListResult<ProductCategory>> => {

  const res = await getCategories(params);

  return {
    items: res.items,
    pagination: {
      page: res.pagination.page,
      limit: res.pagination.limit,
      totalItems: res.pagination.totalItems,
      totalPages: res.pagination.totalPages,
    },
  };
};





export const createCategory = async (
  payload: CategoryPayload
): Promise<ApiResponse<ProductCategory>> => {

  return apiFetchFull<ProductCategory>(
    `${BASE_URL}/`, 
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
}


export const updateCategory = async (
  id: string,
  payload: UpdateCategoryPayload,
): Promise<ApiResponse<ProductCategory>> => {

  return apiFetchFull<ProductCategory>(
    `${BASE_URL}/${id}`, 
    {
      method: 'PUT',
      body: JSON.stringify(payload)
    }
  )
}


export const getCategoryById = async (id: string): Promise<ProductCategory> => {

  return apiFetch<ProductCategory>(
    `${BASE_URL}/${id}`, 
    {
      method: 'GET'
    }
  )
}


export const deleteCategory = async (id: string): Promise<void> => {

  return apiFetch<void>(
    `${BASE_URL}/${id}`, 
    {
      method: 'DELETE'
    }
  )
}


export const getCategoryNames = async (): Promise<CategoryForSelect[]> => {

  return apiFetch<CategoryForSelect[]>(
    `${BASE_URL}/names`, 
    {
      method: 'GET'
    }
  )
}







/*
Règle d’or à retenir (et à appliquer partout)

🔒 Les fichiers *.api.ts ne retournent jamais ApiResponse<T>

👉 ils retournent le vrai type métier (ProductCategory, CategoryList, etc.)

Le type ApiResponse<T> :

existe pour décrire le contrat backend

vit uniquement dans apiFetch / normalisation

ne remonte jamais jusqu’aux composants



Règle d’or DELETE / PUT / POST
Action	Retour frontend
GET list	ListResponse
GET by id	Entity
POST create	Entity
PUT/PATCH update	Entity
DELETE	void

*/