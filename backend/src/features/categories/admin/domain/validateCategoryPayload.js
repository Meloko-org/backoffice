const Type = require("../../../../models/Type");

async function validateCategoryPayload(payload) {
	const errors = [];

	if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      errors.push("name invalide");
    }
  }

	if (!payload.type) {
		errors.push("type manquant.")
	} else {
		const existingType = await Type.findById(payload.type);

		if (!existingType) {
			errors.push("Ce type n'existe pas.")
		}
	}

	return errors;
}


module.exports = {
	validateCategoryPayload,
}