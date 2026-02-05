import type { ApiResponse } from "../../../types/global.types";
import type { Type } from "../types/type";

const BASE_URL = "http://localhost:4000/admin/types";

export async function getTypeNames(): Promise<ApiResponse<Type[]>> {
  const res = await fetch(`${BASE_URL}/names`);
  return res.json();
}
