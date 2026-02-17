import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";
import { getCategoryNames } from "../../categories/api/categories.api";
import { getTagCategoryNames } from "../../tagCategories/api/tagCategory.api";
import type { FamilyFormValues } from "../types/family";


async function fetchTagCategories(): Promise<FieldOption[]> {
  console.log("fetchTagCategories called");
  const data = await getTagCategoryNames();

  return data.map((t: any) => ({
    value: t._id,
    label: t.name,
    description: t.description,
    color: t.color,
  }))
}

async function fetchCategories(): Promise<FieldOption[]> {
  const data = await getCategoryNames();

  return data.map((t: any) => ({
    value: t._id,
    label: t.name,
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
            options: fetchCategories,
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
            floating: true,
          }),

          tagCategories: field.checkboxGroup({
            label: "Tag Catégories",
            required: false,
            options: fetchTagCategories,
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