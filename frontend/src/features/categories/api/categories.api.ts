import { apiFetch } from "../../../lib/apiFetch";
import type {
  ProductCategory,
  CategoryListResponse,
  CategoryPayload,
  UpdateCategoryPayload,
} from "../types/category";

const BASE_URL = "http://localhost:4000/admin/categories"


export const getCategories = async(params: {
  page?: number;
  limit?: number;
}): Promise<CategoryListResponse> => {

  return apiFetch<CategoryListResponse>(
    `${BASE_URL}/?page=${params.page}&limit=${params.limit}`, 
    {
      method: "GET"
    }
  )
}

export const createCategory = async (payload: CategoryPayload): Promise<ProductCategory> => {

  return apiFetch<ProductCategory>(
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
): Promise<ProductCategory> => {

  return apiFetch<ProductCategory>(
    `${BASE_URL}/${id}`, 
    {
      method: 'POST',
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