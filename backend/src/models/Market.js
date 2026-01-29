const mongoose = require("mongoose");
const addressSchema = require("./Address");

const marketSchema = mongoose.Schema({
  name: { 
		type: String, 
		required: true 
	},
	slug: {
		type: String,
		required: true,
		index: true,
	},
  description: { 
		type: String, 
		required: true 
	},
  image: {
		 type: String 
		},
  address: addressSchema,
});

function createMarketModel(collectionName) {
	const modelName = `Market_${collectionName}`;

	return (
		mongoose.models[modelName] ||
		mongoose.model(modelName, marketSchema, collectionName)
	);
}

/**
 * Sélection automatique via .env
 */
const Market = process.env.USE_FAKE_DB === "true"
	? createMarketModel("fakeproducts")
	: createMarketModel("products");

module.exports = {
	Market,
	createMarketModel,
};
