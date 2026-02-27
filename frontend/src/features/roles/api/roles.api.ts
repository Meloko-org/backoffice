import { apiFetch } from "../../../lib/apiFetch";
import type { RoleForSelect } from "../types/roles";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/roles`;


export const getRoleNames = async (): Promise<RoleForSelect[]> => {

  return apiFetch<RoleForSelect[]>(
      `${BASE_URL}/names`, 
      {
        method: 'GET'
      }
    )
}