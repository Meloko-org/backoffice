import type { FilterConfig } from "../../../../components/data-table/DataFiltersBar";
import type { Column } from "../../../../components/data-table/DataTable";
import type { FormSchema } from "../../../../core/forms/types";
import type { ApiResponse, ApiSuccessResponse } from "../../../../types/global.types";
import type { createActionsRegistry } from "../actions/actionRegistry";
import type { RightPanelType } from "../rightPanel/rightPanelRegistry";


/** ici on crée une "Admin Model Configuration"
 *  
 * TListCtx : le contexte d’exécution des actions UI pour ce modèle
 */ 

/* Config du model global */
export type ModelAdminConfig<
  TEntity,
  TFormValues = TEntity,
  TListCtx = any,
  TFormCtx = any
> = {

  model: string;
  
  /* LIST */
  columns?: (ctx: TListCtx) => Column<TEntity>[];
  filters?: (data: Record<string, any>) => FilterConfig[];
  toolbar?: {
    actions?: (ctx: TListCtx) => React.ReactNode;
  }

  /* DATA */
  getList?: (params: any) => Promise<any>;
  getOne?: (id: string) => Promise<TEntity>;
  loaders?: Record<string, () => Promise<any>>;

  /* ACTIONS */
  actions?: {
    registry: ReturnType<typeof createActionsRegistry<TEntity, TListCtx>>;
    useContext: () => TListCtx;
  };

  /* RIGHT PANEL */
  details?: React.ComponentType<any>;
  entityName: RightPanelType;

  /* FORM */
  form?: AdminFormConfig<TFormValues, TFormCtx>;
};



/* config du form */
export type AdminFormConfig<TValues, Ctx = any> = {
  
  /** Schema (TON form engine) */
  schema: 
    | FormSchema<TValues>
    | ((ctx: Ctx & { values: Partial<TValues> }) => FormSchema<TValues>);

  /** Valeurs initiales (optionnel) */
  defaultValues?: Partial<TValues>;

  /** Chargement des données en edit */
  getOne?: (id: string) => Promise<TValues>;

  /** Actions */
  create?: (data: TValues) => Promise<ApiResponse<any>>;
  update?: (id: string, data: TValues) => Promise<ApiResponse<any>>;

  /** Callback succès */
  onSuccess?: (response: ApiSuccessResponse<any>) => void;

  /** Context (comme pour les columns 👍) */
  useContext?: () => Ctx;

  /** 🔥 Loaders spécifiques au form */
  loaders?: Record<string, () => Promise<any>>;
};




export function createModelAdmin<
  TEntity,
  TFormValues = TEntity,
  TListCtx = any,
  TFormCtx = any
>(
  config: ModelAdminConfig<TEntity, TFormValues, TListCtx, TFormCtx>
) {
  console.log("config registry :", config)
  return config;
}