import type { FilterConfig } from "../../../../components/data-table/DataFiltersBar";
import type { Column } from "../../../../components/data-table/DataTable";

export type ModelAdminConfig<T = any, Ctx = any> = {
  model: string;

  /* LIST */
  columns?: (ctx: Ctx) => Column<T>[];
  filters?: (...args: any[]) => FilterConfig[];

  /* DATA */
  getList?: (params: any) => Promise<any>
  loaders?: Record<string, () => Promise<any>>;

  /* ACTIONS */
  actions?: any;

  /* RIGHT PANEL */
  details?: React.ComponentType<any>;
  entityName?: string;

  /* FORM */
  form?: React.ComponentType<any>;
  schema?: any;
};

export function createModelAdmin<T, Ctx = any>(
  config: ModelAdminConfig<T, Ctx>
) {
  return config;
}