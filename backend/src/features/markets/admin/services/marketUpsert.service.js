const Market = require('../../../../models/Market');
const { UPDATE_WHITELIST } = require("../domain/market.rules");
const { getCoordinates } = require("../../../../services/coordinates.service");


async function upsertMarket(marketData, {geoRateLimit}) {

  const { 
		name, 
		description,
		image,
		address1,
		address2,
		city,
		postalCode,
		country,
		slug,
	} = marketData;

	if (!slug) {
		throw new Error("Slug manquant pour le market");
	}

	const existingMarket = await Market.findOne({ slug });

	if (existingMarket) {
		const update = {};

		for (const field of UPDATE_WHITELIST) {
			if (marketData[field] !== undefined) {
				update[field] = marketData[field];
			}
		}

		if (Object.keys(update).length > 0) {
			await Market.updateOne(
				{ _id: existingMarket._id },
				{ $set: update }
			);

			return {
				status: "updated",
				id: existingMarket._id,
			}
		}

		return {
			status: "existing",
			id: existingMarket._id,
		}
	}


	// trouver les coordonnées du market
	const address = {
		address1,
		city,
		postalCode,
	}

	if (geoRateLimit) {
    await geoRateLimit();
  }

	const { latitude, longitude } = await getCoordinates({name, address, type: "poi"})


	const createdMarket = await Market.create({
		name,
		description: description || "",
		image: image || null,
		slug,
		address: {
			address1: address1 || "Pas d'adresse spécifique.",
			address2,
			city,
			postalCode,
			country,
			latitude, 
			longitude,
		}
	})


	return {
		status: "created",
		id: createdMarket._id
	}

}


module.exports = {
	upsertMarket,
}