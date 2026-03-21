import type { AdminModels } from "../registries/admin/adminModels";
import type { AdminFormConfig, ModelAdminConfig } from "../registries/admin/createModelAdmin";

/* ENTITY */
export type InferEntity<K extends keyof AdminModels> =
  AdminModels[K] extends ModelAdminConfig<infer TEntity, any, any, any>
    ? TEntity
    : never;

/* FORM VALUES */
export type InferFormValues<K extends keyof AdminModels> =
  AdminModels[K] extends { form: AdminFormConfig<infer TValues, any> }
    ? TValues
    : never;

/* FORM CTX */
export type InferFormCtx<K extends keyof AdminModels> =
  AdminModels[K] extends { form: AdminFormConfig<any, infer TCtx> }
    ? TCtx
    : never;

/* LIST CTX */
export type InferListCtx<K extends keyof AdminModels> =
  AdminModels[K] extends ModelAdminConfig<any, any, infer TListCtx, any>
    ? TListCtx
    : never;