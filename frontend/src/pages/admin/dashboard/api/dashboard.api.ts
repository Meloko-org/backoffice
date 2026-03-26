import { apiFetch, apiFetchFull } from "../../../../lib/apiFetch";
import type { AdminDashboardData } from "../types";

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