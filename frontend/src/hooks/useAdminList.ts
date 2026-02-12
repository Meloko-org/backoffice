import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import type { ListParams, ListResult, PaginationMeta } from "../types/list.types";


type Fetcher<T> = (params: ListParams) => Promise<ListResult<T>>;

/*
	"useAdminList est un hook générique.
	Il travaille avec n’importe quel type T.
	Tu dois lui donner une fonction capable de récupérer une liste de T."
*/
export function useAdminList<T>(fetcher: Fetcher<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit ] = useState(5);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [sortKey, setSortKey] = useState<string>();
  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState<Record<string, any>>({});

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const result = await fetcher({
        page,
        limit,
        search: debouncedSearch,
        sortKey,
        sortDirection,
        filters,
      });

      setItems(result.items);
      setPagination(result.pagination);
    } finally {
      setLoading(false);
    }
  };

  // reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters, limit]);

 

  useEffect(() => {

    console.log("FETCH PARAMS:", {
      page,
      limit,
      search: debouncedSearch,
      sortKey,
      sortDirection,
      filters,
    });
    fetchData();
  }, [page, debouncedSearch, sortKey, sortDirection, filters, limit]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
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

    filters,
    setFilters,

    limit,
    setLimit,

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