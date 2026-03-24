import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";
import { getCategoryNames } from "../../categories/api/categories.api";
import { getFamilyNamesForCategory } from "../../families/api/families.api";
import type { ProductFormValues } from "../types/product";


export async function fetchCategories(): Promise<FieldOption[]> {
  const data = await getCategoryNames();

  return data.map((cat: any) => ({
    value: cat._id,
    label: cat.name
  }))
}

export type ProductFormCtx = {
  categories?: FieldOption<string>[];
}

/* loader dynamique dépendant des catégories donc non référencé dans AdminModel */
export async function fetchFamiliesForCategory(categoryId: string): Promise<FieldOption[]> {
  const data = await getFamilyNamesForCategory(categoryId);

  return data.map((fam: any) => ({
    value: fam._id,
    label: fam.name
  }))
}

// const VAT_RATES = import.meta.env.VITE_VAT_RATES;
const VAT_RATES = [5.5, 10, 20];

export const productFormSchema = (
  ctx: ProductFormCtx & { values: Partial<ProductFormValues>}
) =>
  defineFormSchema<ProductFormValues>({
    sections: [
      {
        title: "Choix de la catégorie",
        fields: {
          categoryId: field.select({
            label: "Catégorie",
            required: true,
            floating: true,
            options: ctx.categories ?? [],
            disabled: ({ mode }) => mode === "edit",
          }),
        }
      },

      {
        title: "Choix de la famille",
        isEnabled: ({ values, mode }) =>
          mode === "edit" || !!values.categoryId,
        fields: {
          familyId: field.select({
            label: "Famille",
            required: true,
            floating: true,
            options: async (values) => {
              if (!values.categoryId) return [];
              return fetchFamiliesForCategory(values.categoryId)
            },
            disabled: ({ mode }) => mode === "edit",
            optionsDeps: ["categoryId"],
            dependsOn: ["categoryId"],
          }),
        }
      },

      {
        title: "Informations générales",
        isAlertContainer: true,
        isEnabled: ({ values, mode }) =>
          mode === "edit" || !!values.familyId,
        fields: {
          name: field.input({
            label: "Nom",
            required: true,
            floating: true,
          }),

          weightMeasurement: field.input({
            label: "Mesure",
            required: true,
            inputType: "number",
            floating: true,
          }),

          weightUnit: field.radioGroup({
            label: "Unité",
            required: true,
            options: [
              {label: "gr", value: "gr"},
              {label: "pièce", value: "piece"},
            ]
          }),

          vatRate: field.radioGroup({
            label: "TVA",
            required: true,
            options: VAT_RATES.map((rate) => ({
              label: `${rate} %`,
              value: rate.toString(),
            })),
          })
        }
      }
    ]
  })