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
          className="w-64"
        />
      ) : (
        <div />
      )}

      <div className="flex gap-1">
        <label htmlFor="selector" className="leading-3 text-sm text-right flex flex-col justify-center">
          <span className="block">nombre</span>
          <span className="block">par page</span>
        </label>
        <select
          id="selector"
          value={limit}
          onChange={(e) => onLimitChange?.(Number(e.target.value))}
          className=" w-20"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="grow flex justify-between">
        {actions}
      </div>

      
    </div>
  );
};
