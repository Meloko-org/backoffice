import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  getRowId: (row: T) => string;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  emptyMessage = "Aucune donnée",
  sortKey,
  sortDirection,
  onSort,
  onRowClick,
  getRowId,
}: DataTableProps<T>) {
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!loading && data.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              return (
                <th
                  key={String(col.key)}
                  align="left"
                  className={`${col.className ?? ""} ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() =>
                    col.sortable && onSort && onSort(String(col.key))
                  }
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && isSorted && (
                      <span className="text-xs">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={getRowId(row)}
              className={`transition ${
                onRowClick
                  ? "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                  : ""
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render
                    ? col.render(row)
                    : String((row as any)[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
