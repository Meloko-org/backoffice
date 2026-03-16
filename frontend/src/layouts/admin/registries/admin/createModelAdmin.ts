import type { FilterConfig } from "../../../../components/data-table/DataFiltersBar";
import type { Column } from "../../../../types/DataTable.types";

export type ModelAdminConfig<T = any, Ctx = any> = {
  model: string;

  /* LIST */
  columns?: (ctx: Ctx) => Column<T>[];
  filters?: (...args: any[]) => FilterConfig[];

  /* ACTIONS */
  actions?: any;

  /* RIGHT PANEL */
  details?: React.ComponentType<any>;

  /* FORM */
  form?: React.ComponentType<any>;
  schema?: any;
};

export function createModelAdmin<T, Ctx = any>(
  config: ModelAdminConfig<T, Ctx>
) {
  return config;
}