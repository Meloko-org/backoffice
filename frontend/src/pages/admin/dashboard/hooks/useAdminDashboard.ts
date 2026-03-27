import { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/dashboard.api";
import type { AdminDashboardData } from "../types";

export function useAdminDashboard() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  console.log("admin data :", data)

  return { data, loading };
}