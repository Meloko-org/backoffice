/**
 * contrat global de tous les modèles
 */

import type { usersAdmin } from "../../../../features/users/config/user.admin";


export type AdminModels = {
  users: typeof usersAdmin;
};

