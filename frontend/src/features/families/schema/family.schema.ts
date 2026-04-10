import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";
import type { FamilyFormValues } from "../types/family";





export type FamilyFormCtx = {
  tagCategories?: FieldOption<string>[];
  categories?: FieldOption<string>[];
}



export const familyFormSchema = (
  ctx: FamilyFormCtx & { values: Partial<FamilyFormValues>}
) =>
  defineFormSchema<FamilyFormValues>({
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

          category: field.select({
            label: "Catégorie",
            required: true,
            floating: true,
            options: ctx.categories ?? [],
            disabled: ({ mode }) => mode === "edit",
          }),

          description: field.textarea({
            label: "Description",
            required: false,
            floating: true,
          }),

          image: field.file({
            label: "Image",
            required: false,
          }),

          tagCategories: field.checkboxGroup({
            label: "Catégories de tags",
            required: false,
            options: ctx.tagCategories ?? [],
            style: "flat"
          }),

          productsTypes: field.radioGroup({
            label: "Product Type",
            required: true,
            options: [
              {label: "Classique", value: "classic"},
              {label: "Vrac", value: "bulk"}
            ],
          })
        }
      }

    ]
  })