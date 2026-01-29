const schema = require("../config/marketCsv.schema");

function validateCsvRow(row) {
  const errors = [];
	const warnings = [];

	const data = {};

	function pushIssue(message, required) {
		if (required) {
			errors.push(message)
		} else {
			warnings.push(message)
		}
 	}


	for ( const [field, config] of Object.entries(schema)) {
		const value = row[config.column];

		if (value === undefined || value === "") {
			pushIssue(`${field} manquant`, config.required === true);
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

	console.log("errors :", errors)
	console.log("warnings :", warnings)

	return {
		data,
		errors,
		warnings,
		isvalid: errors.length === 0,
	}
 }


module.exports = {
	validateCsvRow,
}