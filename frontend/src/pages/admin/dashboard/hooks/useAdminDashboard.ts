import { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/dashboard.api";
import type { AdminDashboardData } from "../types";

export function useDashboard() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}