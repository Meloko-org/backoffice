import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getFamilyNames } from "../../families/api/families.api";
import { createProduct, getProductById, getProductsList, updateProduct } from "../api/products.api";
import ProductDetails from "../components/ProductDetails";
import { useProductActionsContext } from "../hooks/useProductActionContext";
import { mapFormToPayload, mapProductToFormValues } from "../mappers/product.mapper";
import { fetchCategories, productFormSchema, type ProductFormCtx } from "../schema/product.schema";
import type { Product, ProductFormValues } from "../types/product";
import type { ProductActionContext } from "./product.actions";
import { createProductsColumns } from "./product.columns";
import { createProductFilters } from "./product.filters";
import { productActions } from "./productActionsRegistry";

export const productsAdmin = createModelAdmin<
  Product,
  ProductFormValues,
  ProductActionContext,
  ProductFormCtx
>({
  model: "products",
  
  getList: getProductsList,
  loaders: {
    families: getFamilyNames,
  },
  
  filters: createProductFilters,
  columns: createProductsColumns,
  toolbar: {
    actions: (ctx) => (
      <button
        className="btn-primary"
        onClick={() => ctx.navigate("/admin/products/create")}
      >
        Créer un produit
      </button>
    )
  },

  actions: {
    registry: productActions,
    useContext: useProductActionsContext
  },

  details: ProductDetails,
  entityName: "product",

  form: {
    schema: productFormSchema,

    defaultValues: {
      name: "",
      description: "",
      image: "",
      categoryId: "",
      familyId: "",
      weightMeasurement: 0,
      weightUnit: "gr",
      vatRate: "0"
    },

    getOne: async (id) => {
      const product = await getProductById(id);
      return mapProductToFormValues(product);
    },

    update: async (id, values) => {
      const payload = mapFormToPayload(values);
      return updateProduct(id, payload);
    },

    create: async (values) => {
      const payload = mapFormToPayload(values);
      return createProduct(payload)
    },

    loaders: {
      categories: async () => {
        return fetchCategories();
      },
    },

    useContext: () => ({}),
  },
})