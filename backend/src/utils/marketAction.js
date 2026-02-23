const Market = require('../models/Market');

async function resolveMarketAction(marketSlug) {
	const existingMarket = await Market.findOne({
		slug: marketSlug,
	}).select("_id");

	if (!existingMarket) return "create";

	return "existing";
}

module.exports = {
	resolveMarketAction,
}