import { apiFetch } from "../../../lib/apiFetch";
import type { TypeForSelect } from "../types/type";


const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/types`;


export const getTypeNames = async (): Promise<TypeForSelect[]> => {

  return apiFetch<TypeForSelect[]>(
    `${BASE_URL}/names`, 
    {
      method: 'GET'
    }
  )
}



