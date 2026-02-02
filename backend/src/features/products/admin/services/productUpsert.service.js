const { Product } = require("../../../../models/Product");
const { UPDATE_WHITELIST } = require("../domain/product.rules");


/**
 * Crée ou met à jour un produit à partir de données normalisées
 */
async function upsertProduct(productData) {
	
  const { name, description, image, vatRate, weightUnit, weightMeasurement, family, slug } = productData;

  if (!slug) {
    throw new Error("Slug manquant pour le produit");
  }

  const existingProduct = await Product.findOne({ slug });

	// si le produit existe déjà
  if (existingProduct) {
		const update= {}

		for (const field of UPDATE_WHITELIST) {
			if (productData[field] !== undefined) {
				update[field] = productData[field];
			}
		}

		// s'il y a des champs autorisés pour màj (whitelist)
		if (Object.keys(update).length > 0) {
			await Product.updateOne(
				{ _id: existingProduct._id },
				{ $set: update }
			);

			return {
				status: "updated",
				id: existingProduct._id,
			};
		}
    
    return {
      status: "existing",
      id: existingProduct._id,
    };
  }

  const createdProduct = await Product.create({
		name,
		slug,
		family,
		description: description || "",
		image: image || null,
		weight: {
			unit: weightUnit,
			measurement: weightMeasurement,
		}
	});

  return {
    status: "created",
    id: createdProduct._id,
  };
}

module.exports = {
  upsertProduct,
};
