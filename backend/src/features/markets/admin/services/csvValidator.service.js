const schema = require("../config/marketCsv.schema");

function validateCsvRow(row) {
  const errors = [];
	const warnings = [];

	const data = {};

	function pushIssue(detail, required) {
		if (required) {
			errors.push({
        details: [detail],
        message: "Problème de données",
      });
		} else {
			warnings.push(detail)
		}
 	}


	for ( const [field, config] of Object.entries(schema)) {
		const value = row[config.column];

		if (value === undefined || value === "") {
			pushIssue(`${field} manquant`, config.required === true);
			continue;
		}

		const trimmedValue = value.trim();

		// 🔎 validation par pattern (ex: code postal)
		if (config.pattern && !config.pattern.test(trimmedValue)) {
			pushIssue(
				config.patternMessage || `${field} invalide (${trimmedValue})`,
				true
			);
			continue;
		}

		/* inutile pour les markets (pour l'instant) */
		// if (config.enum && !config.enum.includes(value)) {
		// 	pushIssue(`${field} invalide (${value})`, true);
		// 	continue;
		// }

		if (config.type === "number") {
			const numberValue = Number(value);
			if (Number.isNaN(numberValue)) {
				pushIssue(`${field} doit être un nombre`, true);
				continue;
			}
			data[field] = numberValue;
		} else {
			data[field] = value.trim();
		}
	}


	return {
		data,
		errors,
		warnings,
		isValid: errors.length === 0,
	}
 }


module.exports = {
	validateCsvRow,
}