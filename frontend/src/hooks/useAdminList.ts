import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import type { PaginationMeta } from "../types/global.types";


type FetchParams = {
  page: number;
  limit: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
};



type Fetcher<T> = (params: FetchParams) => Promise<{
  items: T[];
  pagination: PaginationMeta;
}>;

/*
	"useAdminList est un hook générique.
	Il travaille avec n’importe quel type T.
	Tu dois lui donner une fonction capable de récupérer une liste de T."
*/
export function useAdminList<T>(fetcher: Fetcher<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetcher({
        page,
        limit,
        search: debouncedSearch,
        sortKey,
        sortDirection,
      });

      setItems(data.items);
      setPagination(data.pagination);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, sortKey, sortDirection]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return {
    items,
    pagination,
    loading,

    page,
    setPage,

    search,
    setSearch,

    sortKey,
    sortDirection,
    handleSort,

    refetch: fetchData,
  };
}




/*
Objectif du hook useAdminList

On veut centraliser :
page
limit
search (debounced)
sortKey
sortDirection
loading
data
pagination
refetch()

Et rendre le hook agnostique du modèle (categories, users, shops…).
*/