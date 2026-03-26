import type { AdminFormConfig } from "../layouts/admin/registries/admin/createModelAdmin";


/**
 * Type guard permettant de vérifier qu’un modèle admin possède un `form`.
 *
 * 👉 Pourquoi ?
 * TypeScript ne comprend pas automatiquement que `if (admin.form)`
 * garantit l'existence du form (surtout avec des generics et unions).
 *
 * 👉 Ce guard permet de :
 * - faire un check runtime (admin.form existe)
 * - informer TypeScript que `admin` est maintenant un AdminWithForm
 *
 * 👉 Résultat :
 * Après ce check, on peut accéder à admin.form sans erreurs de typage.
 */
export function hasForm(
  admin: any
): admin is { form: AdminFormConfig<any, any> } {
  return !!admin.form;
}