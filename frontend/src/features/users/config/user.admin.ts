import { useUserActionsContext } from "../../users/hooks/useUserActionsContext";
import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getRoleNames } from "../../roles/api/roles.api";
import { getUserById, getUsersList, updateUser } from "../api/users.api";
import UserDetails from "../components/UserDetails";
import { mapFormValuesToPayload, mapUserToFormValues } from "../mappers/user.mapper";
import { fetchRoles, userFormSchema, type UserFormCtx } from "../schema/user.schema";
import type { User, UserFormValues } from "../types/user";
import type { UserActionContext } from "./user.actions";
import { createUserColumns } from "./user.columns";
import { createUserFilters } from "./user.filters";
import { userActions } from "./userActionsRegistry";

export const usersAdmin = createModelAdmin<
  User,
  UserFormValues,
  UserActionContext,
  UserFormCtx
>({
  model: "users",

  getList: getUsersList,
  loaders: {
    roles: getRoleNames
  },

  filters: createUserFilters,
  columns: createUserColumns,

  actions: {
    registry: userActions,
    useContext: useUserActionsContext
  },

  details: UserDetails,
  entityName: "user",

  form: {
    schema: userFormSchema,

    defaultValues: {
      firstname: "",
      lastname: "",
      avatar: "",
      suspensionReason: "",
      role: "",
    },

    getOne: async (id) => {
      const user = await getUserById(id);
      return mapUserToFormValues(user);
    },

    update: async (id, values) => {
      const payload = mapFormValuesToPayload(values);
      return updateUser(id, payload);
    },

    loaders: {
      roles: async () => {
        return fetchRoles();
      },
    },

    useContext: () => ({}),
  },
})