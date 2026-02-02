const mongoose = require("mongoose");
const weightSchema = require("./Weight");

const productSchema = mongoose.Schema(
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
		},
		family: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "productFamily",
		},
		weight: {
			type: weightSchema,
			required: true,
		},
		vatRate: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

/**
 * Factory – 1 instance = 1 collection
 */
function createProductModel(collectionName) {
  const modelName = `Product_${collectionName}`;

  return (
    mongoose.models[modelName] ||
    mongoose.model(modelName, productSchema, collectionName)
  );
}

/**
 * Sélection automatique via .env
 */
const Product = process.env.USE_FAKE_DB === "true"
  ? createProductModel("fakeproducts")
  : createProductModel("products");

module.exports = {
	Product,
	createProductModel,
};




