import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { fetchShopFeatures, fetchTypes } from "../../../utils/form/formFetchers";
import { getShopForm, getShopsList, updateShop } from "../api/shops.api";
import ShopDetails from "../components/ShopDetails";
import { useShopActionsContext } from "../hooks/useShopActionsContext";
import { mapFormValuesToPayload, mapShopToFormValues } from "../mappers/shop.mapper";
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
      name: "",
      siret: "",

      address1: "",
      address2: "",
      postalCode: "",
      city: "",

      logo: "",

      shortDesc: "",
      longDesc: "",

      photos: [],
      video: [],

      types: [],

      isPremium: "",
      PremiumDate: "",
      isOpen: "",
      reopenDate: "",

      features: [],
    },

    getOne: async (id) => {
      const shop = await getShopForm(id)
      return mapShopToFormValues(shop)
    },

    update: async (id, values) => {
      const payload = mapFormValuesToPayload(values);
      return updateShop(id, payload);
    },

    loaders: {
      types: async () => {
        return fetchTypes();
      },
      features: async () => {
        return fetchShopFeatures();
      }
    },

    useContext: () => ({})
  }
})