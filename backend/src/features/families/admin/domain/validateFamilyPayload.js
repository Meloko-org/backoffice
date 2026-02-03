function validateFamilyPayload(payload) {
	const errors = [];

	if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      errors.push("name invalide");
    }
  }

	if (payload.productsTypes === undefined ||
		!payload.productsTypes.includes(["classic", "bulk", "both"])
	) {
		errors.push("ProductsType invalide.")
	}

	return errors;
}

module.exports = {
	validateFamilyPayload,
}