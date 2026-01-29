const { LOWERCASE_WORDS, ELISIONS } = require("./domain/name.rule");

function normalizeSlug(str, { prefix } = {}) {
  if (!str) return "";

  let slug =  str
    .toLowerCase()
    .normalize("NFD")                     // accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/s\b/g, "")                  // pluriel simple (fruits → fruit)
    .replace(/[^a-z0-9]+/g, "-")          // espaces & symboles → "-"
    .replace(/-+/g, "-")                  // collapse ---
    .replace(/^-|-$/g, "");               // trim "-"

  return prefix ? `${prefix}-${slug}` : slug;
}

function normalizeName(str) {
  if (!str || typeof str !== "string") return str;

  // 1️⃣ normalisation de base
  let normalized = str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, "’"); // apostrophe typographique

  // 2️⃣ reconstruire les élisions mal tapées : "d olive" → "d’olive"
  normalized = normalized.replace(
    /\b(d|l|qu)\s+([a-z])/g,
    "$1’$2"
  );

  const words = normalized.split(/\s+/).filter(Boolean);

  return words
    .map((word, index) => {
      // 3️⃣ élision → ex: d’olive
      const elisionMatch = word.match(/^([a-z]+)’([a-z].*)$/);
      if (elisionMatch && ELISIONS.has(elisionMatch[1])) {
        return `${elisionMatch[1]}’${capitalize(elisionMatch[2])}`;
      }

      // 4️⃣ premier mot → majuscule
      if (index === 0) {
        return capitalize(word);
      }

      // 5️⃣ mot faible
      if (LOWERCASE_WORDS.has(word)) {
        return word;
      }

      // 6️⃣ normal
      return capitalize(word);
    })
    .join(" ");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


module.exports = { 
  normalizeSlug,
  normalizeName, 
};