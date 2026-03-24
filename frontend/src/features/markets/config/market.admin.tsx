import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { createMarket, getMarketById, getMarketsList, updateMarket } from "../api/markets.api";
import MarketDetails from "../components/MarketDetails";
import { useMarketActionsContext } from "../hooks/useMarketActionContext";
import { mapFormToPayload, mapMarketToFormValues } from "../mappers/market.mapper";
import { marketFormSchema, type MarketFormCtx } from "../schema/market.schema";
import { type Market, type MarketFormValues } from "../types/markets";
import type { MarketActionContext } from "./market.actions";
import { createMarketsColumns } from "./market.columns";
import { createMarketFilters } from "./market.filters";
import { marketActions } from "./marketActionsRegistry";

export const marketsAdmin = createModelAdmin<
  Market,
  MarketFormValues,
  MarketActionContext,
  MarketFormCtx
>({
  model: "markets",

  getList: getMarketsList,
  loaders: {},

  filters: createMarketFilters,
  columns: createMarketsColumns,
  toolbar: {
    actions: (ctx) => (
      <button
        className="btn-primary"
        onClick={() => ctx.navigate("/admin/markets/create")}
      >
        Créer un point de vente
      </button>
    )
  },

  actions: {
    registry: marketActions,
    useContext: useMarketActionsContext
  },

  details: MarketDetails,
  entityName: "market",

  form: {
    schema: marketFormSchema,

    defaultValues: {
      name: "",
      description: "",
      image: "",
      address1: "",
      address2: "",
      postalCode: "",
      city: "",
    },

    getOne: async (id) => {
      const market = await getMarketById(id);
      return mapMarketToFormValues(market)
    },

    update: async (id, values) => {
      const payload = mapFormToPayload(values)
      return updateMarket(id, payload);
    },

    create: async (values) => {
      const payload = mapFormToPayload(values);
      return createMarket(payload);
    },

    loaders: {},

    useContext: () => ({}),
  }
})