import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getProducerById, getProducersList, updateProducer } from "../api/producer.api";
import ProducerDetails from "../components/ProducerDetails";
import { useProducerActionsContext } from "../hooks/useProducerActionsContext";
import { mapFormValuesToPayload, mapProducerToFormValues } from "../mappers/producer.mapper";
import { producerFormSchema, type ProducerFormCtx } from "../schema/producer.schema";
import type { Producer, ProducerFormValues } from "../types/producer";
import type { ProducerActionContext } from "./producer.action";
import { createProducerColumns } from "./producer.columns";
import { createProducersFilters } from "./producer.filters";
import { producerActions } from "./producerActionsRegistry";

export const producersAdmin = createModelAdmin<
  Producer,
  ProducerFormValues,
  ProducerActionContext,
  ProducerFormCtx
>({
  model: "producers",

  getList: getProducersList,
  loaders: {},

  filters: createProducersFilters,
  columns: createProducerColumns,

  actions: {
    registry: producerActions,
    useContext: useProducerActionsContext
  },

  details: ProducerDetails,
  entityName: "producer",

  form: {
    schema: producerFormSchema,

    defaultValues: {
      socialReason: "",
      siren: "",
      iban: "",
      bic: "",
      address1: "",
      address2: "",
      postalCode: "",
      city: "",
      country: "",
    },

    getOne: async (id) => {
      const producer = await getProducerById(id)
      return mapProducerToFormValues(producer)
    },

    update: async (id, values) => {
      const payload = mapFormValuesToPayload(values)
      return updateProducer(id, payload)
    },

    useContext: () => ({}),

  }
})