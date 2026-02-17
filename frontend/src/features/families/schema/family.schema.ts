import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldCheckbox } from "../../../core/forms/types";
import { getTagCategoryNames } from "../../tagCategories/api/tagCategory.api";
import type { FamilyFormValues } from "../types/family";


async function fetchTagCategories(): Promise<FieldCheckbox[]> {
  const data = await getTagCategoryNames();

  return data.map((t: any) => ({
    value: t._id,
    label: t.name,
    color: t.param,
  }))
}



export const familySchema = 
  defineFormSchema<FamilyFormValues>({
    sections: [
      {
        title: "Informations générales",
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
            options: fetchTagCategories,
            disabled: ({ mode }) => mode === "edit",
          }),

          description: field.textarea({
            label: "Description",
            required: false,
            floating: true,
          }),

          image: field.input({
            label: "Image",
            required: false,
          }),

          tagCategories: field.select({
            label: "Tag Catégories",
            required: false,
            floating: true,
          }),

          productTypes: field.checkbox({
            label: "Product Type",
            required: true,
          })
        }
      }

    ]
  })