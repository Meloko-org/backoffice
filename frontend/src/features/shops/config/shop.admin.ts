import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getShopsList } from "../api/shops.api";
import ShopDetails from "../components/ShopDetails";
import { useShopActionsContext } from "../hooks/useShopActionsContext";
import { shopFormSchema, type ShopFormCtx } from "../schema/shop.schema";
import type { Shop, ShopFormValues } from "../types/shop";
import type { ShopActionContext } from "./shop.actions";
import { createShopColumns } from "./shop.columns";
import { createShopFilters } from "./shop.filters";
import { shopActions } from "./shopActionsregistry";

export const shopsAdmin = createModelAdmin<
  Shop,
  ShopFormValues,
  ShopActionContext,
  ShopFormCtx
>({
  model: "shops",

  getList: getShopsList,
  loaders: {},

  filters: createShopFilters,
  columns: createShopColumns,

  actions: {
    registry: shopActions,
    useContext: useShopActionsContext,
  },

  details: ShopDetails,
  entityName: "shop",

  form: {
    schema: shopFormSchema,

    defaultValues: {

    },

    // getOne: async (id) => {

    // },

    // update: async (id, values) => {

    // },

    loaders: {},

    useContext: () => ({})
  }
})