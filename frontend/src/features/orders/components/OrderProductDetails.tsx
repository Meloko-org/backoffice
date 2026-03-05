import type { ProductLine } from "../types/order";

type Props = {
  product: ProductLine;
}

export default function OrderProductDetails({ product}: Props) {

  if (!product) return null;

  return (
    <div className="p-4 space-y-3 text-sm relative"></div>
  )
}