import { apiFetch } from "../../../../lib/apiFetch";
import { type AdminDashboardData, type TopProduct, type TopProductDetails } from "../types";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/dashboard`;


export const getAdminDashboard = async (): Promise<AdminDashboardData> => {

  return apiFetch<AdminDashboardData>(
    `${BASE_URL}`, 
    {
      method: 'GET'
    }
  )
}

export const getTopProductsList = async (limit = 20): Promise<TopProduct[]> => {

  return apiFetch<TopProduct[]>(
    `${BASE_URL}/topProducts?limit=${limit}`, 
    {
      method: 'GET'
    }
  )
}

export const getTopProductDetails = async (id: string): Promise<TopProductDetails> => {

  return apiFetch<TopProductDetails>(
    `${BASE_URL}/topProducts/${id}`, 
    {
      method: 'GET'
    }
  )
}