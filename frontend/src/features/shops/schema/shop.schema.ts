import { defineFormSchema, field } from "../../../core/forms/schema"
import type { FieldOption } from "../../../core/forms/types"
import type { ShopFormValues } from "../types/shop"

// export async function fetchTypes


export type ShopFormCtx = {
  types?: FieldOption<string>[];
  features?: FieldOption<string>[];
}

export const shopFormSchema = (
  ctx: ShopFormCtx & { values: Partial<ShopFormValues>}
) => 
  defineFormSchema<ShopFormValues>({
    sections: [
      {
        title: "Informations générales",
        isAlertContainer: true,
        fields: {
          name: field.input({
            label: "Nom",
            required: true,
            floating: true,
          }),
          siret: field.input({
            label: "Siret",
            required: true,
            floating: true,
          }),
          logo: field.file({
            label: "Logo",
            required: false,
          }),
          shortDesc: field.textarea({
            label: "Description courte",
            required: true,
            floating: true,
          }),
          longDesc: field.textarea({
            label: "description longue",
            required: false,
            floating: true,
            rows: 10,
          }),
        },

      },
      {
        title: "Adresse",
        fields: {
          address1: field.input({
            label: "Adresse",
            required: true,
            floating: true,
          }),
          address2: field.input({
            label: "Complément",
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
          }),
        }
      },
      {
        title: "Business",
        fields: {
          types: field.checkboxGroup({
            label: "Types",
            required: true,
            options: ctx.types ?? [],
            style: "list",
          }),
          isOpen: field.radioGroup({
            label: "Ouvert / Fermé",
            required: true,
            options: [
              { label: "Ouvert", value: "true"},
              { label: "Fermé", value: "false"}
            ]
          }),
          reopenDate: field.date({
            label: "Date de réouverture",
            required: false,
            disabled: ({ values }) => values.isOpen === "true"
          }),
          isPremium: field.radioGroup({
            label: "Premium",
            required: true,
            options: [
              { label: "Oui", value: "true"},
              { label: "non", value: "false"}
            ]
          }),
          PremiumDate: field.date({
            label: "Date premium",
            required: false,
            disabled: ({ values }) => values.isPremium === "false"
          })
        }
      },
      {
        title: "Features",
        fields: {
          features: field.checkboxGroup({
            label: "Liste des features",
            required: false,
            options: ctx.features ?? [],
            style: "list"
          })
        }
      }
    ]
  })