const mongoose = require("mongoose");
const Market = require("../../../../models/Market");
const { getCoordinates } = require("../../../../services/coordinates.service");
const { ValidationError, NotFoundError, ApiError } = require("../../../../utils/ApiError");
const { normalizeSlug } = require("../../../../utils/normalize");

async function getMarkets({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  filters = {}
}) {

  const skip = (page - 1) * limit;

  const filter = {};

  // 🔎 SEARCH
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i", // insensible à la casse
    };
  }

  if (filters.postalCode) {
    filter["address.postalCode"] = filters.postalCode;
  }


  // 🔀 SORT
  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  const [items, totalItems] = await Promise.all([
    Market.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Market.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}

async function createMarket(payload) {
  const {
    name,
    description,
    image,
    address,
  } = payload;

  const slug = normalizeSlug(name);

  const existingMarket = await Market.findOne({ slug });
  if (existingMarket) {
    throw new ValidationError("Un point de vente existe déjà avec ce slug.");
  }

  if (!address.address1) {
    address.address1 = "Pas d'adresse spécifique"
  }

  // créer les coordonnés et les ajouter à l'address
  const { latitude, longitude } = await getCoordinates({name, address, type: "poi"})

  address.latitude = latitude;
  address.longitude = longitude;

  return Market.create({
    name,
    slug,
    description: description || "",
    image: image || null,
    address
  })
}


async function updateMarket(marketId, payload) {
  let shouldGetCoordinates = 0;

  const market = await Market.findById(marketId);

  if (!market) {
    throw new NotFoundError("Point de vente introuvable.")
  }

  if (payload.name && payload.name !== market.name) {
    const newSlug = normalizeSlug(payload.name);

    const existing = await Market.findOne({
      slug: newSlug,
      _id: { $ne: market._id },
    });

    if (existing) {
      throw new ValidationError({
        name: "Un point de vente avec ce nom existe déjà dans cette famille",
      });
    }

    market.name = payload.name;
    market.slug = newSlug;
    shouldGetCoordinates++;
  }

  if (payload.description !== undefined) {
    market.description = payload.description;
  }

  if (payload.image !== undefined) {
    market.image = payload.image;
  }

  if (payload.address.address1 !== undefined && payload.address.address1 !== market.address.address1) {
    market.address.address1 = payload.address.address1;
    shouldGetCoordinates++;
  }

  if (payload.address.address2 !== undefined) {
    market.address.address2 = payload.address.address2;
  }
  if (payload.address.postalCode !== undefined) {
    market.address.postalCode = payload.address.postalCode;
    shouldGetCoordinates++;
  }
  if (payload.address.city !== undefined) {
    market.address.city = payload.address.city;
    shouldGetCoordinates++;
  }

  if (shouldGetCoordinates > 1) {
    const { latitude, longitude } = await getCoordinates({name: market.name, address: market.address, type: "poi"});

    market.address.latitude = latitude;
    market.address.longitude = longitude;
  }

  await market.save();
  return market;

}


async function deleteMarket(marketId) {
  const market = await Market.findById(marketId);

  if (!market) {
    throw new NotFoundError("Point de vente introuvable.");
  }

  // vérifier qu'aucun shop n'utilise ce point de vente

  await market.deleteOne();
}


async function getMarketById(marketId) {
  if (!mongoose.Types.ObjectId.isValid(marketId)) {
    throw new ApiError("Id du market invalide.", 400)
  }

  const market = await Market.findById(marketId);

  if (!market) {
    throw new NotFoundError("Point de vente introuvable.")
  }

  return market;
}



async function getDistinctPostalCodes() {
  return Market.distinct("address.postalCode");
}

module.exports = {
  getMarkets,
  createMarket,
  updateMarket,
  deleteMarket,
  getMarketById,
  getDistinctPostalCodes,
}