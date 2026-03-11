import { defineFormSchema, field } from "../../../core/forms/schema";
import type { FieldOption } from "../../../core/forms/types";
import { getRoleNames } from "../../roles/api/roles.api";
import type { UserFormValues } from "../types/user";


async function fetchRoles(): Promise<FieldOption<string>[]> {
  const data = await getRoleNames();

  return data.map((r: any) => ({
    value: r._id,
    label: r.name,
  }))
}

export const userSchema = 
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
        }
      },

      {
        title: "Rôle",
        fields: {
          roles: field.radioGroup({
            label: "Roles",
            required: true,
            options: fetchRoles,
          })
        }
      },

      {
        title: "Suspension",
        isVisible: ({ values }) => Boolean(values.suspensionReason),
        fields: {
          suspensionReason: field.select({
            label: "Raison de la suspension",
            required: false,
            floating: true,
            options: [
              { label: "Fraude", value: "fraud"},
              { label: "Spam", value:"spam" },
              { label: "Abus", value: "abuse" }
            ]
          })
        }
      }
    ]
  })