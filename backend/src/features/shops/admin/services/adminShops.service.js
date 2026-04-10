const mongoose = require("mongoose");
const Shop = require("../../../../models/Shop");
const getCollection = require("../../../../utils/collectionName")
const getCollectionInstance = require("../../../../helpers/collectionHelpers")

async function getShops({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  filters = {},
}) {
  const skip = (page - 1) * limit;

  const pipeline = [];


  /* ---------------- FILTER ---------------- */
  const match = {};

  // 🔎 SEARCH
  if (search) {
    match.$or = [
      { name: { $regex: search, $options: "i" } },
    ];
  }

  // 🎛 FILTERS
  if (filters.isOpen === "true") {
    match.isOpen = true;
  } else if (filters.isOpen === "false") {
    match.isOpen = false
  }

  if (filters.isPremium === "true") {
    match.isPremium = true;
  } else if (filters.isPremium === "false") {
    match.isPremium = false
  }

  if (filters.isValidated === "true") {
    match.isValidated = true;
  } else if (filters.isValidated === "false") {
    match.isValidated = false
  }

  if (filters.type) {
    match.types = new mongoose.Types.ObjectId(filters.type);
  }

  if (filters.paidAtFrom || filters.paidAtTo) {
    match.createdAt = {};

    if (filters.paidAtFrom) {
      match.createdAt.$gte = new Date(filters.paidAtFrom);
    }

    if (filters.paidAtTo) {
      match.createdAt.$lte = new Date(filters.paidAtTo);
    }
  }

  pipeline.push({ $match: match });

  /* ---------------- LOOKUP TYPES ---------------- */
  pipeline.push({
    $lookup: {
      from: "types",
      localField: "types",
      foreignField: "_id",
      as: "types",
    },
  });

  /* ---------------- SORT ---------------- */
  pipeline.push({
    $sort: {
      [sortKey]: sortDirection === "asc" ? 1 : -1,
    },
  });

  /* ---------------- PAGINATION ---------------- */
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  /* ---------------- PROJECTION ---------------- */
  pipeline.push({
    $project: {
      _id: 1,
      name: 1,
      isOpen: 1,
      isPremium: 1,
      isValidated: 1,
      createdAt: 1,

      types: {
        $map: {
          input: "$types",
          as: "type",
          in: {
            _id: "$$type._id",
            label: "$$type.label",
          },
        },
      },
    },
  });

  /* ---------------- EXEC ---------------- */
  const collection = getCollectionInstance("shops");

  const items = await collection.aggregate(pipeline).toArray();

  /* ---------------- COUNT ---------------- */
  const totalItems = await collection.countDocuments(match);

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


async function getShopById(shopId) {
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    throw new ApiError("Invalid shopId", 400);
  }

  const pipeline = [];

  /* ---------------- MATCH ---------------- */
  pipeline.push({
    $match: {
      _id: new mongoose.Types.ObjectId(shopId),
    },
  });

  /* ---------------- TYPES ---------------- */
  pipeline.push({
    $lookup: {
      from: "types",
      localField: "types",
      foreignField: "_id",
      as: "types",
    },
  });

  /* ---------------- PRODUCER ---------------- */
  pipeline.push({
    $lookup: {
      from: getCollection("producers"),
      localField: "producer",
      foreignField: "_id",
      as: "producer",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$producer",
      preserveNullAndEmptyArrays: true,
    },
  });

  /* ---------------- USER ---------------- */
  pipeline.push({
    $lookup: {
      from: getCollection("users"),
      localField: "producer.owner",
      foreignField: "_id",
      as: "owner",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$owner",
      preserveNullAndEmptyArrays: true,
    },
  });

  /* ---------------- PROJECTION ---------------- */
  pipeline.push({
    $project: {
      _id: 1,
      name: 1,
      logo: 1,
      siret: 1,
      address: 1,

      isOpen: 1,
      isPremium: 1,
      isValidated: { $ifNull: ["$isValidated", false] },

      createdAt: 1,

      types: {
        $map: {
          input: "$types",
          as: "type",
          in: {
            _id: "$$type._id",
            label: "$$type.label",
          },
        },
      },

      stats: {
        photosCount: { $size: { $ifNull: ["$photos", []] } },
        videosCount: { $size: { $ifNull: ["$video", []] } },
        crewCount: { $size: { $ifNull: ["$crew", []] } },
        featuresCount: { $size: { $ifNull: ["$features", []] } },
      },

      socials: {
        $filter: {
          input: [
            {
              platform: "instagram",
              isEnabled: "$socials.instagram.isEnabled",
              username: "$socials.instagram.username",
            },
            {
              platform: "facebook",
              isEnabled: "$socials.facebook.isEnabled",
              username: "$socials.facebook.username",
            },
            {
              platform: "tiktok",
              isEnabled: "$socials.tiktok.isEnabled",
              username: "$socials.tiktok.username",
            },
          ],
          as: "social",
          cond: { $eq: ["$$social.isEnabled", true] },
        },
      },

      owner: {
        _id: "$owner._id",
        firstname: "$owner.firstname",
        lastname: "$owner.lastname",
      },
    },
  });

  const collection = getCollectionInstance("shops");

  const result = await collection.aggregate(pipeline).toArray();

  const shop = result[0];

  if (!shop) {
    throw new NotFoundError("Shop introuvable");
  }

  return shop;
}


async function updateShop(shopId, payload) {
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    throw new ApiError("Invalid shopId", 400);
  }

  const update = {
    name: payload.name,
    siret: payload.siret,
    address: payload.address,

    logo: payload.logo,

    shortDesc: payload.shortDesc,
    longDesc: payload.longDesc,

    photos: payload.photos || [],
    video: payload.video || [],

    types: payload.types || [],

    isOpen: payload.isOpen,
    reopenDate: payload.reopenDate ?? null,

    features: payload.features || [],
  };

  // admin only
  if (payload.isPremium !== undefined) {
    update.isPremium = payload.isPremium;
    update.PremiumDate = payload.isPremium ? new Date() : null;
  }

  const shop = await Shop.findByIdAndUpdate(shopId, update, {
    new: true,
  });

  if (!shop) {
    throw new NotFoundError("Shop introuvable");
  }

  return shop;
}

async function getFormShop(shopId) {

    if (!mongoose.Types.ObjectId.isValid(shopId)) {
    throw new ApiError("Invalid shopId", 400);
  }

  const shop = await Shop.findById(shopId)
    .populate({
      path: "types",
      ref: "Type", 
      select: "_id label"
    })
    .populate({
      path: "features",
      ref: "ShopFeatures",
      select: "_id, label"
    })
    .lean();

  if (!shop) {
    throw new NotFoundError("Shop introuvable");
  }

  return {
    _id: shop._id,

    name: shop.name,
    siret: shop.siret,

    address: shop.address,

    logo: shop.logo,

    shortDesc: shop.shortDesc,
    longDesc: shop.longDesc,

    photos: shop.photos || [],
    video: shop.video || [],

    types: shop.types || [],

    isOpen: shop.isOpen,
    reopenDate: shop.reopenDate,
    isPremium: shop.isPremium,
    PremiumDate: shop.PremiumDate,

    features: shop.features || [],
  };
}




module.exports = {
  getShops,
  getShopById,
  updateShop,
  getFormShop,
}