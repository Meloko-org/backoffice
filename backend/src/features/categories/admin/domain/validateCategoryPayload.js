const Type = require("../../../../models/Type");
const { ValidationError } = require("../../../../utils/ApiError");

async function validateCategoryPayload(payload) {

	if (!payload.name) {
    throw new ValidationError("Name manquant.");
  }

	if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      throw new ValidationError("Name invalide.");
    }
  }

	if (!payload.type) {
		throw new ValidationError("type manquant.");

	} else {
		const existingType = await Type.findById(payload.type);

		if (!existingType) {
			throw new Validation("Ce type n'existe pas.");
		}
	}

}


module.exports = {
	validateCategoryPayload,
}