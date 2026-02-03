import type { ApiResponse } from "../../../types/global.types";
import type {
  ProductCategory,
  CategoryListResponse,
  CategoryPayload,
  UpdateCategoryPayload,
} from "../types/category";

const BASE_URL = "http://localhost:4000/admin/categories"

export const getCategories = async (params: {
  page?: number;
  limit?: number;
}): Promise<ApiResponse<CategoryListResponse>> => {

	console.log("get categories called")

	const response = await fetch(`${BASE_URL}/?page=${params.page}&limit=${params.limit}`, {
		method: 'GET',
	});

	const data = await response.json()

  return data;
};

export const createCategory = async (
  payload: CategoryPayload
) => {

  const response = await fetch(`${BASE_URL}/`, {
		method: 'POST',
		body: JSON.stringify(payload)
	});

	const data = await response.json()

  return data;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryPayload
) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
		method: 'POST',
		body: JSON.stringify(payload)
	});

	const data = await response.json()

  return data;
};

export const deleteCategory = async (id: string) => {

  const response = await fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE'
	});

	const data = await response.json()

  return data;
};

export const getCategoryById = async (id: string): Promise<ApiResponse<ProductCategory>> => {
  const response = await fetch(`${BASE_URL}/${id}`);

	const data = await response.json()

  console.log("data in getCategoryById :", data)

  return data;
}
