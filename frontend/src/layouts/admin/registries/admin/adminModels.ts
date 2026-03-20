/**
 * contrat global de tous les modèles
 */

import type { UserActionContext } from "../../../../features/users/config/user.actions";
import type { UserFormCtx } from "../../../../features/users/schema/user.schema";
import type { User, UserFormValues } from "../../../../features/users/types/user";
import type { ModelAdminConfig } from "./createModelAdmin";

export interface AdminModels {
  users: ModelAdminConfig<
    User,
    UserFormValues,
    UserActionContext,
    UserFormCtx
  >;
}