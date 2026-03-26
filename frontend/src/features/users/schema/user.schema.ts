import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";
import { getRoleNames } from "../../roles/api/roles.api";
import type { UserFormValues } from "../types/user";


export async function fetchRoles(): Promise<FieldOption<string>[]> {
  const data = await getRoleNames();

  return data
    .filter((r: any) => r.name !== "super-admin")
    .map((r: any) => ({
      value: r._id,
      label: r.name,
    }))
}

export type UserFormCtx = {
  roles?: FieldOption<string>[];
};


export const userFormSchema = (
  ctx: UserFormCtx & { values: Partial<UserFormValues> }
) =>
  defineFormSchema<UserFormValues>({
    sections: [
      {
        title: "Informations générales",
        isAlertContainer: true,
        fields: {
          firstname: field.input({
            label: "Nom",
            required: true,
            floating: true,
          }),
          lastname: field.input({
            label: "Prénom",
            required: true,
            floating: true,
          }),
          avatar: field.input({
            label: "Avatar",
            required: false,
            floating: true,
          }),
        },
      },

      {
        title: "Rôle",
        fields: {
          role: field.radioGroup({
            label: "Roles",
            required: true,
            options: ctx.roles ?? [],
          }),
        },
      },

      {
        title: "Suspension",
        isVisible: ({ values }) => Boolean(values.suspensionReason),
        fields: {
          suspensionReason: field.select({
            label: "Raison de la suspension",
            options: [
              { label: "Fraude", value: "fraud" },
              { label: "Spam", value: "spam" },
              { label: "Abus", value: "abuse" },
            ],
          }),
        },
      },
    ],
  });


