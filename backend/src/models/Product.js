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


/**
 * le choix de travailler sur les fake collections se fait par 
 * l'interrupteur USE_FAKE_DB du fichier .env
 * 
 * Dans un controller, rien ne change pour faire un find():
 * const { Product } = require("../models/Product");
 * puis
 * const products = await Product.find();
 * 
 * Mais si on veut forcer, alors on peut faire :
 * const { createProductModel } = require("../models/Product");
 * puis
 * const FakeProduct = createProductModel("fakeproducts");
 * const RealProduct = createProductModel("products");
 * et
 * await FakeProduct.find();
 * await RealProduct.find();
 */



/* Pour éviter les doublons lors d'une importation de masse, on crée une version
normalisée du nom du produit: le slug

function normalizeName(name) {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // accents
		.replace(/s\b/g, "")             // pluriel simple
		.replace(/[^a-z0-9 ]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}


*/