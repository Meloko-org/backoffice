import type { ProducerDetails, ProducerFormValues, ProducerPayload } from "../types/producer";

export const mapProducerToFormValues = (
  producer: ProducerDetails
): ProducerFormValues => {

  return {
    socialReason: producer.socialReason,
    siren: producer.siren,
    iban: producer.iban,
    bic: producer.bic,
    address1: producer.address.address1 || "",
    address2: producer.address.address2 || "",
    postalCode: producer.address.postalCode || "",
    city: producer.address.city || "",
    country: producer.address.country || "",
  }
}

export const mapFormValuesToPayload = (
  values: ProducerFormValues
): ProducerPayload => {

  return {
    socialReason: values.socialReason,
    siren: values.siren,
    iban: values.iban,
    bic: values.bic,
    address: {
      address1: values.address1,
      address2: values.address2,
      postalCode: values.postalCode,
      city: values.city,
      country: values.country,
    }
  }
}