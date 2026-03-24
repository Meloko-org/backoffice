/**
 * contrat global de tous les modèles
 */

import type { categoriesAdmin } from "../../../../features/categories/config/category.admin";
import type { familiesAdmin } from "../../../../features/families/config/family.admin";
import type { usersAdmin } from "../../../../features/users/config/user.admin";


export type AdminModels = {
  users: typeof usersAdmin;
  categories: typeof categoriesAdmin;
  families: typeof familiesAdmin;
};

