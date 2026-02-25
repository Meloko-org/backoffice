const Product = require("../models/Product");

async function resolveProductAction(productSlug) {
	const existingProduct = await Product.findOne({
		slug: productSlug,
	}).select("_id");

	if (!existingProduct) return "create";

	return "existing";
}

module.exports = {
	resolveProductAction,
}