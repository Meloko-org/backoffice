const LOWERCASE_WORDS = new Set([
  "de",
  "du",
  "des",
  "la",
  "le",
  "les",
  "à",
  "au",
  "aux",
  "et",
  "en",
  "pour",
  "sur",
]);

const ELISIONS = new Set(["d", "l", "qu"]);

module.exports= {
  LOWERCASE_WORDS,
	ELISIONS,
}