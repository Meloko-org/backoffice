import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";
import { getTypeNames } from "../../types/api/types.api";

export type CategoryFormValues = {
  name: string;
  type: string;
  description: string;
  image: string | null;
};

async function fetchTypes(): Promise<FieldOption[]> {

  const data = await getTypeNames()

  return data.map((t: any) => ({
    value: t._id,
    label: t.name,
  }));
}


export const categorySchema =
  defineFormSchema<CategoryFormValues>({
    sections: [
      {
        title: "Informations générales",
        fields: {
          name: field.input({
            label: "Nom",
            required: true,
            floating: true,
          }),

          type: field.select({
            label: "Type",
            required: true,
            floating: true,
            options: fetchTypes,
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
        },
      },
    ],
  });
