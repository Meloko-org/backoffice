const schema = require("../config/productCsv.schema");

function validateCsvRow(row) {
  const errors = [];
  const warnings = [];

  const data = {
    category: {},
    family: {},
    product: {},
  };

  function pushIssue(message, required) {
    if (required) {
      errors.push(message);
    } else {
      warnings.push(message);
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


// function validateCsvRow(row, { mode = "strict" } = {}) {
//   const errors = [];
//   const warnings = [];

//   const data = {
//     category: {},
//     family: {},
//     product: {},
//   };

//   function pushIssue(message, { required = false } = {}) {
//     if (required || mode === "strict") {
//       errors.push(message);
//     } else {
//       warnings.push(message);
//     }
//   }

//   for (const section of ["category", "family", "product"]) {
//     const fields = schema[section];

//     for (const [field, config] of Object.entries(fields)) {
//       const value = row[config.column];

//       if (config.required && (value === undefined || value === "")) {
//         pushIssue( `${section}.${field} manquant`, { required: true});
//         continue;
//       }

//       if (value !== undefined && value !== "") {
//         if (config.enum && !config.enum.includes(value)) {
//           pushIssue(`${section}.${field} invalide (${value})`);
//           continue;
//         }

//         if (config.type === "number") {
//           const numberValue = Number(value);
//           if (Number.isNaN(numberValue)) {
//             pushIssue(`${section}.${field} doit être un nombre`);
//             continue;
//           }
//           data[section][field] = numberValue;
//         } else {
//           data[section][field] = value.trim();
//         }
//       }
//     }
//   }

//   if (errors.length) {
//     const error = new Error("Validation CSV échouée");
//     error.details = errors;
//     throw error;
//   }

//   return { data, errors, warnings };
// }


module.exports = {
  validateCsvRow,
};
