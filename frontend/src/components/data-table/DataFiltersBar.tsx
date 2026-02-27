import React from "react";
import { Power } from "lucide-react";

export type SelectFilterConfig = {
  type: "select";
  key: string;
  label: string;
  options: { label: string; value: string }[];
};

export type DateRangeFilterConfig = {
  type: "dateRange";
  fromKey: string;
  toKey: string;
  label: string;
};

type BooleanFilter = {
  type: "boolean";
  key: string;
  label: string;
};


export type FilterConfig =
  | SelectFilterConfig
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

  console.log("active filters :", hasActiveFilters)
  console.log("showreset :", showReset)

  return (
    <div className="data-filters-bar">

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
            <div key={index} >
              {/* <label>{filter.label}</label> */}
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

        if (filter.type === "dateRange") {
          return (
            <div key={index} className="filter-item">
              <label>{filter.label}</label>
              <div className="date-range">
                <input
                  type="date"
                  value={filters[filter.fromKey] || ""}
                  onChange={(e) =>
                    handleChange(filter.fromKey, e.target.value)
                  }
                />
                <span>→</span>
                <input
                  type="date"
                  value={filters[filter.toKey] || ""}
                  onChange={(e) =>
                    handleChange(filter.toKey, e.target.value)
                  }
                />
              </div>
            </div>
          );
        }

        
        if (filter.type === "boolean") {
          return (
            <div key={index} >
              {/* <label>{filter.label}</label> */}
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
  );
}
