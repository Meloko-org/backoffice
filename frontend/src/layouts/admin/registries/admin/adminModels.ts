import type { UserActionContext } from "../../../../features/users/config/user.actions";
import type { User } from "../../../../features/users/types/user";
import type { ModelAdminConfig } from "./createModelAdmin";

export interface AdminModels {
  users: ModelAdminConfig<User, UserActionContext>
}