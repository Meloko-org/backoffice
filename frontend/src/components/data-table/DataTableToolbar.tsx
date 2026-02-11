import type { ReactNode } from "react";

interface DataToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  actions?: ReactNode;
}

export const DataTableToolbar = ({
  search,
  onSearchChange,
  actions,
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

      {actions}
    </div>
  );
};
