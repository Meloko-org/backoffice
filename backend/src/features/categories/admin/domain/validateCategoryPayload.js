const Type = require("../../../../models/Type");

function validateCategoryPayload(payload) {
	const errors = [];

	if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      errors.push("name invalide");
    }
  }

	if (payload.type === undefined) {
		errors.push("type manquant.")
	} else {
		const type = Type.findById(type);

		if (!type) {
			errors.push("Ce type n'existe pas.")
		}
	}



	return errors;
}

module.exports = {
	validateCategoryPayload,
}