import { defineFormSchema } from "../../../core/forms/schema"
import type { ShopFormValues } from "../types/shop"

export type ShopFormCtx = {

}

export const shopFormSchema = (
  ctx: ShopFormCtx & { values: Partial<ShopFormValues>}
) => 
  defineFormSchema<ShopFormValues>({
    sections: [
      
    ]
  })