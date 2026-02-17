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
			unique: true,
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
			ref: "Type",
			required: true,
		},
	},
	{ timestamps: true },
);


const collectionName = process.env.USE_FAKE_DB === "true"
	? "fakeproductcategories"
	: "productcategories";


const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, collectionName);

module.exports = ProductCategory;


