module.exports = {
	name: {
		column: "market_name",
		required: true,
	},
	description: {
		column: "market_description",
		required: false,
	},
	image: {
		column: "market_image",
		required: false,
	},
	address1: {
		column: "market_address1",
		required: true,
	},
	address2: {
		column: "market_address2",
		required: false,
	},
	city: {
		column: "market_city",
		required: true,
	},
	postalCode: {
		column: "market_postalCode",
		required: true,
	},
	country: {
		column: "market_country",
		required: false,
	},
};