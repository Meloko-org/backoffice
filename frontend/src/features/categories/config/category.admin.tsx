import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getTypeNames } from "../../types/api/types.api";
import { createCategory, getCategoriesList, getCategoryById, updateCategory } from "../api/categories.api";
import CategoryDetails from "../components/CategoryDetails";
import { useCategoryActionsContext } from "../hooks/useCategoryActionContext";
import { mapCategoryToFormValues, mapFormValuesToPayload } from "../mappers/category.mapper";
import { categoryFormSchema, fetchTypes, type CategoryFormCtx } from "../schema/category.schema";
import type { CategoryFormValues, ProductCategory } from "../types/category";
import type { CategoryActionContext } from "./category.actions";
import { createCategoriesColumns } from "./category.columns";
import { createCategoryFilters } from "./category.filters";
import { categoryActions } from "./categoryActionsRegistry";

export const categoriesAdmin = createModelAdmin<
  ProductCategory,
  CategoryFormValues,
  CategoryActionContext,
  CategoryFormCtx
>({
  model: "categories",

  filters: createCategoryFilters,
  columns: createCategoriesColumns,
  toolbar: {
    actions: (ctx) => (
      <button
        className="btn-primary"
        onClick={() => ctx.navigate("/admin/categories/create")}
      >
        Créer une catégorie
      </button>
    )
  },
  
  getList: getCategoriesList,
  loaders: {
    types: getTypeNames,
  },

  actions: {
    registry: categoryActions,
    useContext: useCategoryActionsContext
  },

  details: CategoryDetails,
  entityName: "category",

  form: {
    schema: categoryFormSchema,

    defaultValues: {
      name: "",
      description: "",
      image: null,
      type: "",
    },

    getOne: async (id) => {
      const category = await getCategoryById(id);
      return mapCategoryToFormValues(category);
    },

    update: async (id, values) => {
      const payload = mapFormValuesToPayload(values);
      return updateCategory(id, payload);
    },

    create: async (values) => {
      const payload = mapFormValuesToPayload(values);
      return createCategory(payload)
    },

    loaders: {
      types: async () => {
        return fetchTypes();
      },
    },

    useContext: () => ({}),
  },
})