import type { ReactNode } from "react";

interface DataToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  actions?: ReactNode;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export const DataTableToolbar = ({
  search,
  onSearchChange,
  actions,
  limit,
  onLimitChange,
}: DataToolbarProps) => {
  return (

    <div className="table-toolbar flex items-center justify-between mb-4 gap-4 px-3">
      {onSearchChange ? (
        <input
          type="text"
          placeholder="Rechercher..."
          value={search ?? ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="admin-input w-64"
        />
      ) : (
        <div />
      )}

      <label htmlFor="selector" >nombre</label>
      <select
        id="selector"
        value={limit}
        onChange={(e) => onLimitChange?.(Number(e.target.value))}
        className="admin-input w-24"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>

      {actions}
    </div>
  );
};
