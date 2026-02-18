const { ValidationError } = require("../../../../utils/ApiError");

function validateFamilyPayload(payload) {

	if (!payload.name) {
    throw new ValidationError("Name manquant.");
  }

	if (!payload.category) {
    throw new ValidationError("Category manquant.");
  }

	if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      throw new ValidationError("Name invalide.")
    }
  }

	if (!payload.productsTypes) {
		throw new ValidationError("productsTypes manquant.")
	}

	if (payload.productsTypes !== undefined) {

		const allowed = ["classic", "bulk", "both"];

		if (!Array.isArray(payload.productsTypes) || payload.productsTypes.some((type) => !allowed.includes(type))) {
			throw new ValidationError("productsTypes invalide.")
		}
	}

	if (
		payload.tagCategories !== undefined &&
		!Array.isArray(payload.tagCategories)
	) {
		throw new ValidationError("tagCategories doit être un tableau");
	}

}

module.exports = {
	validateFamilyPayload,
}