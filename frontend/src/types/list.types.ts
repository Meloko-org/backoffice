/**
 * Définition des types internes standard: (différents des types du backend)
 * toutes les listes Admin utilisent ces types
 */


export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ListResult<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface ListParams {
  page: number;
  limit: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
	filters: Record<string, any>;
}
