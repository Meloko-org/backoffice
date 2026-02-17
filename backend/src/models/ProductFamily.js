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
		productsTypes: {
			type: [String],
			enum: ["bulk", "classic", "both"],
			required: true,
			default: ["classic"],
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			required: true,
		},
		tagCategories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "TagCategory",
			},
		],
	},
	{ timestamps: true },
);



const collectionName = process.env.USE_FAKE_DB === "true"
	? "fakeproductfamilies"
	: "productfamilies";


const ProductFamily = mongoose.model("ProductFamily", productFamilySchema, collectionName);

module.exports = ProductFamily;

