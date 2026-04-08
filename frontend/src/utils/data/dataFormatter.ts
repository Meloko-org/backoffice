export function formatIBAN(iban: string): string {
  if (!iban) return "";

  return iban
    .replace(/\s/g, "")        // enlève espaces existants
    .match(/.{1,4}/g)          // groupe par 4
    ?.join(" ") || "";
}