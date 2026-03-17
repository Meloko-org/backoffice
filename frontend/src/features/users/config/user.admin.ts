import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getRoleNames } from "../../roles/api/roles.api";
import { getUsersList } from "../api/users.api";
import UserDetails from "../components/UserDetails";
import UserFormPage from "../pages/UserFormPage";
import { createUserColumns } from "./user.columns";
import { createUserFilters } from "./user.filters";
import { userActions } from "./userActionsRegistry";

export const usersAdmin = createModelAdmin({
  model: "users",

  getList: getUsersList,
  loaders: {
    roles: getRoleNames
  },

  filters: createUserFilters,
  columns: createUserColumns,

  actions: userActions,
  details: UserDetails,
  entityName: "user",

  form: UserFormPage,
})