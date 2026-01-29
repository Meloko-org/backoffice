const { ProductCategory } = require("../../../../models/ProductCategory");
const { UPDATE_WHITELIST } = require("../domain/category.rules");
const Type = require("../../../../models/Type");
const { normalizeSlug } = require("../../../../utils/normalize");
const mongoose = require("mongoose")

/**
 * Crée ou récupère une catégorie
 */
async function upsertCategory(categoryData) {
  const { slug, name, description, image, type } = categoryData;

  if (!slug) {
    throw new Error("Slug catégorie manquant");
  }

  const existingCategory = await ProductCategory.findOne({ slug });

  if (existingCategory) {
    const update = [];

		for (const field of UPDATE_WHITELIST) {
			if (categoryData[field] !== undefined) {
				update[field] = categoryData[field];
			}
		}

		if (Object.keys(update).length > 0) {
			await ProductCategory.updateOne(
				{ _id: existingCategory._id },
				{ $set: update }
			);

			return {
				status: "updated",
				id: existingCategory._id,
			}
		}

		return {
			status: "existing",
			id: existingCategory._id,
		}
  }

  if (!name || !type) {
    throw new Error(`Données catégorie incomplètes pour "${slug}"`);
  }

	// console.log("types collection :", await Type.find().lean());

	const typeSlug = normalizeSlug(type);
	// console.log("typeSlug :", typeSlug)
	const typeDoc = await Type.findOne({ slug: typeSlug})

	if (!typeDoc) {
		throw new Error(`Type de catégorie inconnu "${type}"`);
	}

	const typeDocId = typeDoc._id;

	console.log("type détecté :", typeDocId)

  const createdCategory = await ProductCategory.create({
    slug,
    name,
    description,
    image: image ?? null,
    type: typeDocId,
  });

  return {
    status: "created",
    id: createdCategory._id,
  };
}

module.exports = {
  upsertCategory,
};

