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



/**
 * Helper type qui garantit que le modèle admin possède un `form` défini.
 *
 * 👉 Pourquoi ?
 * Certains modèles (ex: orders) n'ont pas de form (`form` = undefined).
 * Mais dans certaines pages (AdminFormPage), on a besoin d'assurer à TypeScript
 * que le form existe bien pour accéder à ses propriétés (schema, create, update, etc.).
 *
 * 👉 Ce type transforme :
 * ModelAdminConfig<T> avec form optionnel
 * en :
 * ModelAdminConfig<T> avec form obligatoire
 *
 * 👉 Utilisé avec un type guard (`hasForm`) pour affiner le type à runtime.
 */
export type AdminWithForm<T extends ModelAdminConfig<any, any, any, any>> =
  T & { form: NonNullable<T["form"]> };