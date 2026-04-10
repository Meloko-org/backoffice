import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { fetchCategories, fetchTagCategories } from "../../../utils/form/formFetchers";
import { getCategoryNames } from "../../categories/api/categories.api";
import { createFamily, getFamiliesList, getFamilyById, updateFamily } from "../api/families.api";
import FamilyDetails from "../components/FamilyDetails";
import { useFamilyActionsContext } from "../hooks/useFamilyActionsContext";
import { mapFamilyToFormValues, mapFormValuesToPayload } from "../mappers/family.mapper";
import { familyFormSchema, type FamilyFormCtx } from "../schema/family.schema";
import { type ProductFamily, type FamilyFormValues } from "../types/family";
import type { FamilyActionContext } from "./family.actions";
import { createFamiliesColumns } from "./family.columns";
import { createFamilyFilters } from "./family.filters";
import { familyActions } from "./familyActionsRegistry";

export const familiesAdmin = createModelAdmin<
  ProductFamily,
  FamilyFormValues,
  FamilyActionContext,
  FamilyFormCtx
>({
  model: "families",

  filters: createFamilyFilters,
  columns: createFamiliesColumns,
  toolbar: {
    actions: (ctx) => (
      <button
        className="btn-primary"
        onClick={() => ctx.navigate("/admin/families/create")}
      >
        Créer une famille
      </button>
    )
  },

  getList: getFamiliesList,
  loaders: {
    categories: getCategoryNames,
  },

  actions: {
    registry: familyActions,
    useContext: useFamilyActionsContext
  },

  details: FamilyDetails,
  entityName: "family",

  form: {
    schema: familyFormSchema,
    
    defaultValues: {
      name: "",
      description: "",
      image: null,
      category: "",
      tagCategories: [],
      productsTypes: "classic", 
    },

    getOne: async (id) => {
      const family = await getFamilyById(id);
      return mapFamilyToFormValues(family);
    },

    update: async (id, values) => {
      const payload = mapFormValuesToPayload(values);
      return updateFamily(id, payload);
    },

    create: async (values) => {
      const payload = mapFormValuesToPayload(values);
      return createFamily(payload)
    },

    loaders: {
      categories: async () => {
        return fetchCategories();
      },
      tagCategories: async () => {
        return fetchTagCategories();
      }
    },

    useContext: () => ({}),
  }
})