import type { OrderProduct, ProductLine } from "../../features/orders/types/order";
import type { ProductAnalytics } from "../../pages/admin/dashboard/types";


export const getNameFromProductLine = (line: ProductLine | OrderProduct) => {

  if (!line) return null;

  if (line.product.productCustomName) return line.product.productCustomName;

  return `${line.product.product.family.name} ${line.product.product.name}`
}


export const getNameFromAnalytics = (product: ProductAnalytics["product"]) => {

  return product.type.includes("classic") ? product.name : `${product.family} ${product.name}`
}