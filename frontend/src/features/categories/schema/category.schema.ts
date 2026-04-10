import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";
import type { CategoryFormValues } from "../types/category";



export type CategoryFormCtx = {
  types?: FieldOption<string>[];
}


export const categoryFormSchema = (
  ctx: CategoryFormCtx & { values: Partial<CategoryFormValues>}
) => 
  defineFormSchema<CategoryFormValues>({
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

          type: field.select({
            label: "Type",
            required: true,
            floating: true,
            options: ctx.types ?? [],
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
