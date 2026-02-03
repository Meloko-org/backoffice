function validateProductPayload(payload) {
  const errors = [];

  if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      errors.push("name invalide");
    }
  }

  if (payload.vatRate !== undefined) {
    if (
      typeof payload.vatRate !== "number" ||
      payload.vatRate < 0 ||
      payload.vatRate > 100
    ) {
      errors.push("vatRate invalide");
    }
  }

  if (payload.weight !== undefined) {
    if (
      typeof payload.weight !== "object" ||
      typeof payload.weight.value !== "number" ||
      typeof payload.weight.unit !== "string"
    ) {
      errors.push("weight invalide");
    }
  }

  return errors;
}


module.exports = {
	validateProductPayload,
}