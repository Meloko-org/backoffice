const mongoose = require("mongoose");
const Market = require("../../../../models/Market");
const { getCoordinates } = require("../../../../services/coordinates.service");
const { ValidationError, NotFoundError, ApiError, GeolocationNotFoundError } = require("../../../../utils/ApiError");
const { normalizeSlug, normalizeDecimalFields, normalizeName } = require("../../../../utils/normalize");

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


  items.forEach(normalizeDecimalFields);

  console.log("item0 :", items[0])

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
    address.address1 = "Pas d'adresse spécifique";
  }

  let latitude = null;
  let longitude = null;


  let warnings = [];

  try {
    const coords = await getCoordinates({
      name,
      address,
      type: "poi"
    });

    latitude = coords.latitude;
    longitude = coords.longitude;

  } catch (error) {

    if (error instanceof GeolocationNotFoundError) {
      warnings.push({
        code: "GEOLOCATION_NOT_FOUND",
        message: "Les coordonnées GPS n'ont pas été trouvées automatiquement."
      });
    } else {
      // 🔥 Cas critique (service down, réseau, quota…)
      throw error;
    }
  }

  address.latitude = latitude;
  address.longitude = longitude;

  const normalizedName = normalizeName(name);
  address.city = normalizeName(address.city);

  const market =  Market.create({
    name: normalizedName,
    slug,
    description: description || "",
    image: image || null,
    address
  });

  return { market, warnings }
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

    market.name = normalizeName(payload.name);
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
    market.address.city = normalizeName(payload.address.city);
    shouldGetCoordinates++;
  }

  let warnings = [];
  if (shouldGetCoordinates > 1) {

    try {
      const coords = await getCoordinates({name: market.name, address: market.address, type: "poi"});

      market.address.latitude = coords.latitude;
      market.address.longitude = coords.longitude;

    } catch (error) {

      if (error instanceof GeolocationNotFoundError) {
        warnings.push({
          code: "GEOLOCATION_NOT_FOUND",
          message: "Les coordonnées GPS n'ont pas été trouvées automatiquement."
        });
      } else {
        // 🔥 Cas critique (service down, réseau, quota…)
        throw error;
      }
    }
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

  /**
   * utilisation de lean() pour pouvoir utiliser normalizeDecimalFields qui 
   * agit sur les objet JS brut, ce que produit lean().
   */
  const market = await Market.findById(marketId).lean();

  if (!market) {
    throw new NotFoundError("Point de vente introuvable.")
  }

  normalizeDecimalFields(market)

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