const schema = require("../config/productCsv.schema");

function validateCsvRow(row) {
  const errors = [];
  const warnings = [];

  const data = {
    category: {},
    family: {},
    product: {},
  };

  function pushIssue(detail, required ) {
    if (required) {
      errors.push({
        details: [detail],
        message: "Problème de données",
      });
    } else {
      warnings.push(detail);
    }
  }

  for (const section of ["category", "family", "product"]) {
    const fields = schema[section];

    for (const [field, config] of Object.entries(fields)) {
      const value = row[config.column];

      if (value === undefined || value === "") {
        pushIssue(
          `${section}.${field} manquant`,
          config.required === true
        );
        continue;
      }

      if (config.enum && !config.enum.includes(value)) {
        pushIssue(
          `${section}.${field} invalide (${value})`,
          true // enum invalide = toujours error
        );
        continue;
      }

      if (config.type === "number") {
        const numberValue = Number(value);
        if (Number.isNaN(numberValue)) {
          pushIssue(
            `${section}.${field} doit être un nombre`,
            true
          );
          continue;
        }
        data[section][field] = numberValue;
      } else {
        data[section][field] = value.trim();
      }
    }
  }

  return {
    data,
    errors,
    warnings,
    isValid: errors.length === 0,
  };
}


module.exports = {
  validateCsvRow,
};
