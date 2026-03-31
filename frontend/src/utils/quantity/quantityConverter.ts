export function formatQty(qty: number, unit: "gr" | "piece") {
  if (unit === "gr") {
    if (qty >= 1000) return `${(qty / 1000).toFixed(1)} kg`;
    return `${qty} gr`;
  }

  return `${qty}`;
}