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

function normalizeName(str, {
  removeAccents = false,
} = {}) {
  if (!str || typeof str !== "string") return str;

  let normalized = str.toLowerCase();

  if (removeAccents) {
    normalized = normalized
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  normalized = normalized.replace(/'/g, "’");

  normalized = normalized.replace(
    /\b(d|l|qu)\s+([a-zàâçéèêëîïôûùüÿñæœ])/gi,
    "$1’$2"
  );

  const words = normalized.split(/\s+/).filter(Boolean);

  return words
    .map((word, index) => {
      const elisionMatch = word.match(/^([a-z]+)’([a-zàâçéèêëîïôûùüÿñæœ].*)$/i);
      if (elisionMatch && ELISIONS.has(elisionMatch[1])) {
        return `${elisionMatch[1]}’${capitalize(elisionMatch[2])}`;
      }

      if (index === 0) return capitalize(word);
      if (LOWERCASE_WORDS.has(word)) return word;

      return capitalize(word);
    })
    .join(" ");
}


function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


function normalizeStreet(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

module.exports = { 
  normalizeSlug,
  normalizeName, 
  normalizeStreet,
};