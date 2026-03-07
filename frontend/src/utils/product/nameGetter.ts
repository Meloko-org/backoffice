import type { OrderProduct, ProductLine } from "../../features/orders/types/order";


export const getNameFromProductLine = (line: ProductLine | OrderProduct) => {

  if (!line) return null;

  if (line.product.productCustomName) return line.product.productCustomName;

  return `${line.product.product.family.name} ${line.product.product.name}`
}