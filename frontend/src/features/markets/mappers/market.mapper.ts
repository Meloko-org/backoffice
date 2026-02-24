import type { CreateMarketPayload, Market, MarketFormValues } from "../types/markets";

export function mapFormToPayload(
  values: MarketFormValues
): CreateMarketPayload {
  return {
    name: values.name,
    description: values.description || undefined,
    image: values.image || undefined,
    address: {
      address1: values.address1,
      address2: values.address2 || undefined,
      postalCode: values.postalCode,
      city: values.city,
      latitude: values.latitude,
      longitude: values.longitude,
    }
  }
}


export function mapMarketToFormValues(
  market: Market,
): MarketFormValues {

  return {
    name: market.name,
    description: market.description ?? "",
    image: market.image ?? undefined,
    address1: market.address.address1,
    address2: market.address.address2 ?? "",
    postalCode: market.address.postalCode,
    city: market.address.city,
    latitude: market.address.latitude ?? "",
    longitude: market.address.longitude ?? "",
  }
}