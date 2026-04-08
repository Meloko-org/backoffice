import { defineFormSchema, field } from "../../../core/forms/schema"
import type { ProducerFormValues } from "../types/producer"

export type ProducerFormCtx = {

}

export const producerFormSchema = (
  ctx: ProducerFormCtx & { values: Partial<ProducerFormValues>}
) =>
  defineFormSchema<ProducerFormValues>({
    sections: [
      {
        title: "Informations générales",
        isAlertContainer: true,
        fields: {
          socialReason: field.input({
            label: "Raison sociale",
            required: true,
            floating: true,
          }),
          siren: field.input({
            label: "SIREN",
            required: true,
            floating: true,
            validate: (value) => {
              if (!/^\d{9}$/.test(value)) {
                return "Le SIREN doit contenir 9 chiffres";
              }
              return null;
            }
          }),
          iban: field.input({
            label: "IBAN",
            required: true,
            floating: true,

            format: (value) => {
              if (!value) return "";
              return value
                .replace(/\s/g, "")
                .match(/.{1,4}/g)
                ?.join(" ") || "";
            },

            parse: (value) => {
              return value.replace(/\s/g, "");
            },
            validate: (value) => {
              if (!value.startsWith("FR")) {
                return "IBAN invalide (doit commencer par FR)";
              }
              if (value.length < 27) {
                return "IBAN trop court";
              }
              return null;
            }
          }),
          bic: field.input({
            label: "BIC",
            required: true,
            floating: true,
          })
        }
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
          country: field.input({
            label: "Pays",
            required: true,
            floating: true,
          }),
        }
      }
    ]
  })