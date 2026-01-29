const mongoose = require("mongoose");

const productCategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			index: true,
		},
		description: {
			type: String,
			required: false,
		},
		image: {
			type: String,
			required: false,
			default: null,
		},
		type: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "types",
			required: true,
		},
	},
	{ timestamps: true },
);


function createProductCategoryModel(collectionName) {
	const modelName = `ProductCategory_${collectionName}`;

	return (
		mongoose.models[modelName] || 
		mongoose.model(modelName, productCategorySchema, collectionName)
	);
}

/**
 * Sélection automatique via .env
 */
const ProductCategory = process.env.USE_FAKE_DB === "true"
	? createProductCategoryModel("fakeproductcategories")
	: createProductCategoryModel("productcategories");

module.exports = {
	ProductCategory, createProductCategoryModel
}
