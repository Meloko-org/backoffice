export const formatPriceToEuros = (cents: number): string | null => {
  if (typeof cents !== "number") return "—";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}