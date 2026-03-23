import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import type { ListParams, ListResult, PaginationMeta } from "../types/list.types";
import { useSearchParams } from "react-router-dom";
import { adminEvents } from "../features/users/events/adminEvents";

/*
	"useAdminList est un hook générique.
	Il travaille avec n’importe quel type T.
	Tu dois lui donner une fonction capable de récupérer une liste de T."
*/

type Fetcher<T> = (params: ListParams) => Promise<ListResult<T>>;

type UseAdminListOptions = {
  syncWithUrl?: boolean;
  defaultLimit?: number;
};

export function useAdminList<T>(
  fetcher: Fetcher<T>,
  options?: UseAdminListOptions & { model: string }
) {
  const syncWithUrl = options?.syncWithUrl ?? false;
  const defaultLimit = options?.defaultLimit ?? 5;

  // Router (toujours appelé, mais utilisé seulement si syncWithUrl = true)
  const [searchParams, setSearchParams] = useSearchParams();

  // ---------- STATE ----------
  const [items, setItems] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [sortKey, setSortKey] = useState<string>();
  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState<Record<string, any>>({});

  const [loading, setLoading] = useState(false);

  const isInitialized = useRef(false);

  // ---------- INIT FROM URL ----------
  useEffect(() => {
    if (!syncWithUrl) {
      isInitialized.current = true;
      return;
    }

    const urlPage = Number(searchParams.get("page"));
    const urlLimit = Number(searchParams.get("limit"));
    const urlSearch = searchParams.get("search");
    const urlSortKey = searchParams.get("sortKey");
    const urlSortDirection = searchParams.get("sortDirection");

    if (urlPage) setPage(urlPage);
    if (urlLimit) setLimit(urlLimit);
    if (urlSearch) setSearch(urlSearch);
    if (urlSortKey) setSortKey(urlSortKey);
    if (urlSortDirection === "asc" || urlSortDirection === "desc") {
      setSortDirection(urlSortDirection);
    }

    const urlFilters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (
        !["page", "limit", "search", "sortKey", "sortDirection"].includes(key)
      ) {
        urlFilters[key] = value;
      }
    });

    setFilters(urlFilters);

    isInitialized.current = true;
  }, []);

  // ---------- SYNC TO URL ----------
  useEffect(() => {
    if (!syncWithUrl) return;
    if (!isInitialized.current) return;

    const params: Record<string, string> = {};

    if (page !== 1) params.page = String(page);
    if (limit !== defaultLimit) params.limit = String(limit);
    if (debouncedSearch) params.search = debouncedSearch;
    if (sortKey) params.sortKey = sortKey;
    if (sortDirection !== "asc") params.sortDirection = sortDirection;

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params[key] = String(value);
      }
    });

    setSearchParams(params);
  }, [
    page,
    limit,
    debouncedSearch,
    sortKey,
    sortDirection,
    filters,
  ]);

  // ---------- FETCH ----------
  const fetchData = useCallback(async () => {
    if (!isInitialized.current) return;

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
  }, [page, debouncedSearch, sortKey, sortDirection, filters, limit]);

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters, limit]);

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, sortKey, sortDirection, filters, limit]);

  // ajout de la subscription
  useEffect(() => {
    if (!options?.model) return;
    const eventName = `${options.model}:refresh`
    const unsubscribe = adminEvents.subscribe(eventName, fetchData);
    return unsubscribe;
  }, [fetchData]);

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

    limit,
    setLimit,

    search,
    setSearch,

    sortKey,
    sortDirection,
    handleSort,

    filters,
    setFilters,

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