const { ProductFamily } = require("../../../../models/ProductFamily");
const { UPDATE_WHITELIST } = require("../domain/family.rules");

/**
 * Crée ou récupère une famille
 */
async function upsertFamily(familyData) {
  const {
    slug,
    name,
    description,
    image,
    productsTypes,
    category,
  } = familyData;

  if (!slug) {
    throw new Error("Slug famille manquant");
  }

  const existingFamily = await ProductFamily.findOne({ slug });

  if (existingFamily) {
    const update = [];

		for (const field of UPDATE_WHITELIST) {
			if (familyData[field] !== undefined) {
				update[field] = familyData[field];
			}
		}

		// s'il y a des champs autorisés pour màj (whitelist)
		if (Object.keys(update).length > 0) {
			await ProductFamily.updateOne(
				{ _id: existingFamily._id },
				{ $set: update }
			);

			return {
				status: "updated",
				id: existingFamily._id,
			};
		}
    
    return {
      status: "existing",
      id: existingFamily._id,
    };
  }

  if (!name || !category || !productsTypes) {
    throw new Error(`Données famille incomplètes pour "${slug}"`);
  }

  const createdFamily = await ProductFamily.create({
    slug,
    name,
    description: description || "",
    image: image || null,
    productsTypes,
    category,
		tagCategories: [],
  });

  return {
    status: "created",
    id: createdFamily._id,
  };
}

module.exports = {
  upsertFamily,
};
