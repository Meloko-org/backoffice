import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import UserDetails from "../components/UserDetails";
import UserFormPage from "../pages/UserFormPage";
import { createUserColumns } from "./user.columns";
import { createUserFilters } from "./user.filters";
import { userActions } from "./userActionsRegistry";

export const usersAdmin = createModelAdmin({
  model: "users",

  filters: createUserFilters,

  columns: createUserColumns,

  actions: userActions,

  details: UserDetails,

  form: UserFormPage,
})