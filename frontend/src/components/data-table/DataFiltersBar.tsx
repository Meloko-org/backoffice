import React from "react";
import { Power } from "lucide-react";

type FilterLabel = string | React.ReactElement;

export type SelectFilterConfig = {
  type: "select";
  key: string;
  label: string;
  extraLabel: FilterLabel;
  options: { label: string; value: string }[];
};

export type MultiSelectFilterConfig = {
  type: "multiSelect";
  key: string;
  label: string;
  extraLabel: FilterLabel;
  options: { label: string; value: string }[];
};


export type DateRangeFilterConfig = {
  type: "dateRange";
  fromKey: string;
  toKey: string;
  label: string;
  extraLabel: FilterLabel;
};

export type BooleanFilter = {
  type: "boolean";
  key: string;
  label: string;
  extraLabel: FilterLabel;
};


export type FilterConfig =
  | SelectFilterConfig
  | MultiSelectFilterConfig
  | DateRangeFilterConfig
  | BooleanFilter;



type Props = {
  filters: Record<string, string | undefined>;
  onChange: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  config: FilterConfig[];
  showReset?: boolean;
};




export function DataFiltersBar({ filters, onChange, config, showReset }: Props) {

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  const handleChange = (key: string, value: string) => {
    onChange((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };


  return (
    <div className="data-filters-bar">

      <p className="filter-bar-title text-primary/50 font-semibold">FILTRES</p>

      <div className="data-filter-container">
      {showReset && hasActiveFilters && (
        <button
          type="button"
          className="btn-reset-filter"
          onClick={() => onChange({})}
        >
          <Power />
        </button>
      )}

      {config.map((filter, index) => {

        if (filter.type === "select") {
          return (
            <div key={index} className="filter-item">
              <label className="filter-item-label">{filter.extraLabel}</label>
              <select
                value={filters[filter.key] || ""}
                onChange={(e) =>
                  handleChange(filter.key, e.target.value)
                }
                className="toolbar-elt"
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (filter.type === "multiSelect") {
          const selectedValues = filters[filter.key]
            ? filters[filter.key]!.split(",")
            : [];

          return (
            <div key={index} className="filter-item">
              <label className="filter-item-label">{filter.extraLabel}</label>
              <select
                multiple
                value={selectedValues}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions).map(
                    (opt) => opt.value
                  );

                  handleChange(
                    filter.key,
                    values.length ? values.join(",") : ""
                  );
                }}
                className="toolbar-elt"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }


        if (filter.type === "dateRange") {
          return (
            <div key={index} className="filter-item">
              <label className="filter-item-label">{filter.extraLabel}</label>
              <div className="date-range">
                <input
                  type="date"
                  value={filters[filter.fromKey] || ""}
                  onChange={(e) =>
                    handleChange(filter.fromKey, e.target.value)
                  }
                  className="filter-bar-elt"
                />
                {/* <span>→</span> */}
                <input
                  type="date"
                  value={filters[filter.toKey] || ""}
                  onChange={(e) =>
                    handleChange(filter.toKey, e.target.value)
                  }
                  className="filter-bar-elt"
                />
              </div>
            </div>
          );
        }

        
        if (filter.type === "boolean") {
          return (
            <div key={index} className="filter-item">
              <label className="filter-item-label">{filter.extraLabel}</label>
              <select
                value={filters[filter.key] || ""}
                onChange={(e) =>
                  handleChange(filter.key, e.target.value)
                }
                className="toolbar-elt"
              >
                <option value="">{filter.label}</option>
                <option value={"true"}>Oui</option>
                <option value={"false"}>Non</option>
              </select>
            </div>
          );
        }
    

        return null;
      })}
      </div>

    </div>
  );
}


/* Récupérer les filtres d'un multi-select, côté backend:

ex: 
if (filters.roles) {
  const rolesArray = filters.roles.split(",");
  filter.roles = { $in: rolesArray.map(id => new mongoose.Types.ObjectId(id)) };
}
*/
