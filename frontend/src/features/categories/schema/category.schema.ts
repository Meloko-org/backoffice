import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";

export type CategoryFormValues = {
  name: string;
  type: string;
  description: string;
  image: string | null;
};

async function fetchTypes(): Promise<FieldOption[]> {
  const res = await fetch("/admin/types");
  const data = await res.json();

  return data.data.map((t: any) => ({
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
          name: field.floatingInput({
            label: "Nom",
            required: true,
          }),

          type: field.floatingSelect({
            label: "Type",
            required: true,
            options: async () => fetchTypes(),
          }),
          
          description: field.floatingInput({
            label: "Description",
            required: false,
          }),
          
          image: field.floatingInput({
            label: "Image",
            required: false,
          }),
        },
      },
    ],
  });
