const BASE_URL = "http://localhost:4000/admin/types";

export async function getTypeNames() {
  const res = await fetch(`${BASE_URL}/names`);
  return res.json();
}
