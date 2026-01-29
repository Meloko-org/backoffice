const mongoose = require("mongoose");

const productFamilySchema = mongoose.Schema(
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
		productsTypes: {
			type: [String],
			enum: ["bulk", "classic", "both"],
			required: true,
			default: ["classic"],
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "productcategory",
			required: true,
		},
		tagCategories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "tagCategories",
			},
		],
	},
	{ timestamps: true },
);

function createProductFamilyModel(collectionName) {
	const modelName = `ProductFamily_${collectionName}`;

	return (
		mongoose.models[modelName] || 
		mongoose.model(modelName, productFamilySchema, collectionName)
	);
}

/**
 * Sélection automatique via .env
 */
const ProductFamily = process.env.USE_FAKE_DB === "true"
	? createProductFamilyModel("fakeproductfamilies")
	: createProductFamilyModel("productfamilies");

module.exports = {
	ProductFamily, 
	createProductFamilyModel
}