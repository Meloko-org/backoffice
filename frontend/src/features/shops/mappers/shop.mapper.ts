import type { ShopFormValues, ShopPayload } from "../types/shop";

export function mapShopToFormValues(shop: any): ShopFormValues {
  return {
    name: shop.name,
    siret: shop.siret,
    address1: shop.address?.address1 || "",
    address2: shop.address?.address2 || "",
    postalCode: shop.address?.postalCode || "",
    city: shop.address?.city || "",

    logo: shop.logo,

    shortDesc: shop.shortDesc,
    longDesc: shop.longDesc,

    photos: shop.photos || [],
    video: shop.video || [],

    types: shop.types?.map((t: any) => t._id) || [],

    isPremium: shop.isPremium.toString(),
    PremiumDate: shop.PremiumDate
      ? new Date(shop.PremiumDate).toISOString().split("T")[0]
      : null,

    isOpen: shop.isOpen.toString(),
    reopenDate: shop.reopenDate
      ? new Date(shop.reopenDate).toISOString().split("T")[0]
      : null,

    features: shop.features?.map((f: any) => f._id) || [],
  };
}

export function mapFormValuesToPayload(
  values: ShopFormValues
): ShopPayload {
  return {
    name: values.name,
    siret: values.siret,

    address: {
      address1: values.address1,
      address2: values.address2,
      postalCode: values.postalCode,
      city: values.city,
    },

    logo: values.logo,

    shortDesc: values.shortDesc,
    longDesc: values.longDesc,

    photos: values.photos || [],
    video: values.video || [],

    types: values.types,

    isPremium: values.isPremium === "true",
    PremiumDate: values.PremiumDate
      ? new Date(values.PremiumDate)
      : null,
    isOpen: values.isOpen === "true",
    reopenDate: values.reopenDate
      ? new Date(values.reopenDate)
      : null,

    features: values.features,
  };
}