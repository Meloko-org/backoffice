import { apiFetch } from "../../../lib/apiFetch";
import type { ShopFeaturesForCheckboxGroup } from "../types/shopFeatures"

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/shopFeatures`;



export const getShopFeaturesNames = async (): Promise<ShopFeaturesForCheckboxGroup[]> => {

  return apiFetch<ShopFeaturesForCheckboxGroup[]>(
    `${BASE_URL}/names`, 
    {
      method: 'GET'
    }
  )
}