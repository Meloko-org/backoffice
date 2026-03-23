import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";
import type { RoleForSelect } from "../../roles/types/roles";

export function createUserFilters(
  data: Record<string, any>
): FilterConfig[] {

  const roles: RoleForSelect[] = data.roles || [];

  return [
    {
      type: "select",
      key: "role",
      label: "Rôle",
      options: roles.map((r) => ({
        label: r.name,
        value: r._id,
      })),
    },
    {
      type: "select",
      key: "status",
      label: "Statut",
      options: [
        { label: "Actif", value: "active" },
        { label: "Suspendu", value: "suspended" },
        { label: "Supprimé", value: "deleted" },
      ],
    },
  ]
  
}
