const mongoose = require("mongoose");
const addressSchema = require("./Address");

const marketSchema = mongoose.Schema(
	{
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
			required: false, 
		},
		image: {
			type: String 
			},
		address: addressSchema,
	},
	{
		timestamps: true
	}
);


const collectionName = process.env.USE_FAKE_DB === "true"
	? "fakemarkets"
	: "markets";


const Market = mongoose.model("Market", marketSchema, collectionName);

module.exports = Market;


