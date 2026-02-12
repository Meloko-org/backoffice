import { apiFetch } from "../../../lib/apiFetch";
import type { TypeForSelect } from "../types/type";


const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/types/names`;
// const BASE_URL = "http://localhost:4000/admin/types";

// export async function getTypeNames(): Promise<ApiResponse<Type[]>> {
//   const res = await fetch(`${BASE_URL}/names`);
//   return res.json();
// }


export const getTypeNames = async (): Promise<TypeForSelect[]> => {

  return apiFetch<TypeForSelect[]>(
    `${BASE_URL}`, 
    {
      method: 'GET'
    }
  )
}

// export const getTypeNamesList = async (): Promise<TypeForSelect> => {

//   const res = await getTypeNames();

//   return {
//     items: res.items,
//   }
// }

