import type { ReactNode } from "react";
import { DataTable, type Column, type SortDirection } from "./DataTable";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTablePagination, type Align } from "./DataTablePagination";
import type { FilterConfig } from "./DataFiltersBar";
import type { PaginationMeta } from "../../types/global.types";

interface DataListLayoutProps<T> {
  data: T[];
  pagination?: PaginationMeta;
  paginationAlign: Align;
  columns: Column<T>[];
  loading?: boolean;

  // 🔥 état contrôlé
  search?: string;
  onSearchChange?: (value: string) => void;

  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;

  filters?: Record<string, any>;
  onFiltersChange?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  filtersConfig?: FilterConfig[];
  filterReset?: boolean;

  limit: number;
  onLimitChange: (limit: number) => void;

  showToolbar?: boolean;
  showPagination?: boolean;

  onPageChange?: (page: number) => void;

  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;

  actions?: ReactNode;
}

export function DataListLayout<T>({
  data,
  pagination,
  paginationAlign,
  columns,
  loading,

  search,
  onSearchChange,

  sortKey,
  sortDirection,
  onSort,

  filters,
  filtersConfig,
  onFiltersChange,
  filterReset,

  limit,
  onLimitChange,

  showToolbar = true,
  showPagination = true,
  onPageChange,
  getRowId,
  onRowClick,
  actions,
}: DataListLayoutProps<T>) {

  return (
    <div className="space-y-1">
      {showToolbar && (
        <DataTableToolbar
          search={search}
          onSearchChange={onSearchChange}
          filters={filters}
          onFiltersChange={onFiltersChange}
          filtersConfig={filtersConfig}
          filterReset={filterReset}
          actions={actions}
          limit={limit}
          onLimitChange={onLimitChange}
        />
      )}

      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={onSort}
        getRowId={getRowId}
        onRowClick={onRowClick}
      />

      {showPagination && pagination && onPageChange && (
        <DataTablePagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onChange={onPageChange}
          align={paginationAlign}
        />
      )}
    </div>
  );
}
