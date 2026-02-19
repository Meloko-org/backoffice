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
			unique: true,
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
			ref: "ProductFamily",
			required: true,
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



const collectionName = process.env.USE_FAKE_DB === "true"
	? "fakeproducts"
	: "products";


const Product = mongoose.model("Product", productSchema, collectionName);

module.exports = Product;





