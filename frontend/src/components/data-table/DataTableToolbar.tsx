import type { ReactNode } from "react";
import { DataFiltersBar, type FilterConfig } from "./DataFiltersBar";

interface DataToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  actions?: ReactNode;
  limit: number;
  onLimitChange: (limit: number) => void;
  filters?: Record<string, any>;
  onFiltersChange?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  filtersConfig?: FilterConfig[];
  filterReset?: boolean;
}

export const DataTableToolbar = ({
  search,
  onSearchChange,
  actions,
  limit,
  onLimitChange,
  filters,
  onFiltersChange,
  filtersConfig,
  filterReset,
}: DataToolbarProps) => {
  return (

    <div className="table-toolbar flex items-center justify-between mb-4 gap-4 px-3">
      {onSearchChange ? (
        <input
          type="text"
          placeholder="Rechercher..."
          value={search ?? ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="toolbar-elt toolbar-search"
        />
      ) : (
        <div />
      )}

      <div className="flex gap-1">
        <label htmlFor="selector" className="toolbar-label">
          <span className="block">nbr/</span>
          <span className="block">page</span>
        </label>
        <select
          id="selector"
          value={limit}
          onChange={(e) => onLimitChange?.(Number(e.target.value))}
          className="toolbar-elt toolbar-nbr"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="grow flex justify-end">
        <div className="">
          {filters && onFiltersChange && filtersConfig && (
            <DataFiltersBar
              filters={filters}
              onChange={onFiltersChange}
              config={filtersConfig}
              showReset={filterReset}
            />
          )}
        </div>
        {actions && (
          <div className="grow flex justify-end">
            {actions}
          </div>
        )}
      </div>

      
    </div>
  );
};
