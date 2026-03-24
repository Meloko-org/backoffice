import { defineFormSchema, field } from "../../../core/forms/schema";
import type { MarketFormValues } from "../types/markets";


export type MarketFormCtx = {

}

export const marketFormSchema = (
  ctx: MarketFormCtx & { values: Partial<MarketFormValues>}
) =>
  defineFormSchema<MarketFormValues>({
    sections: [
      {
        title: "Informations générales",
        fields: {
          name: field.input({
            label: "Nom",
            required: true,
            floating: true,
          }),

          description: field.textarea({
            label: "Description",
            required: false,
            floating: true,
          }),

          image: field.input({
            label: "Image",
            required: false,
            floating: true,
          })
        }
      },
      {
        title: "Adresse",
        isAlertContainer: true,
        fields: {
          address1: field.input({
            label: "Adresse 1",
            required: false,
            floating: true,
          }),

          address2: field.input({
            label: "Adresse 2",
            required: false,
            floating: true,
          }),

          postalCode: field.input({
            label: "Code postal",
            required: true,
            floating: true,
          }),

          city: field.input({
            label: "Ville",
            required: true,
            floating: true,
          })
        }
      },
      {
        title: "Coordonnées GPS",
        isVisible: ({ mode }) =>
          mode === "edit",
        fields: {
          latitude: field.input({
            label: "Latitude",
            inputType: "number",
            required: false,
            floating: true,
          }),

          longitude: field.input({
            label: "Longitude",
            inputType: "number",
            required: false,
            floating: true,
          })
        }
      }
    ]
  })