import { apiFetch } from "../../../lib/apiFetch";
import type { TagCategoryForCheckbox } from "../types/tagCategory";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/tagCategories`;


export const getTagCategoryNames = async (): Promise<TagCategoryForCheckbox[]> => {

  return apiFetch<TagCategoryForCheckbox[]>(
    `${BASE_URL}/names`, 
    {
      method: 'GET'
    }
  )
}