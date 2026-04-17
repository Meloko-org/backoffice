const mongoose = require("mongoose");
const Shop = require("../../../../models/Shop");
const Note = require("../../../../models/Note");
const getCollection = require("../../../../utils/collectionName")
const getCollectionInstance = require("../../../../helpers/collectionHelpers");
const { NotFoundError } = require("../../../../utils/ApiError");

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




async function getShopDashboard(shopId) {
  const shopCollection = getCollectionInstance("shops");

  const _id = new mongoose.Types.ObjectId(shopId);

  const [shopData] = await shopCollection.aggregate([
    { $match: { _id } },

    // TYPES
    {
      $lookup: {
        from: "types",
        localField: "types",
        foreignField: "_id",
        as: "types",
      },
    },

    // FEATURES
    {
      $lookup: {
        from: getCollection("shopfeatures"),
        localField: "features",
        foreignField: "_id",
        as: "features",
      },
    },

    // PRODUCER
    {
      $lookup: {
        from: getCollection("producers"),
        localField: "producer",
        foreignField: "_id",
        as: "producer",
      },
    },
    { $unwind: { path: "$producer", preserveNullAndEmptyArrays: true } },

    // USER
    {
      $lookup: {
        from: getCollection("users"),
        localField: "producer.owner",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

    // LOOKUP markets
    {
      $lookup: {
        from: "markets",
        localField: "markets.market",
        foreignField: "_id",
        as: "marketsData",
      },
    },

    {
      $project: {
        name: 1,
        siret: 1,
        isValidated: 1,
        isOpen: 1,
        isPremium: 1,
        createdAt: 1,

        address: {
          address1: 1,
          address2: 1,
          postalCode: 1,
          city: 1,
          country: 1,
          latitude: { $toDouble: "$address.latitude" },
          longitude: { $toDouble: "$address.longitude" },
        },

        logo: 1,
        shortDesc: 1,
        longDesc: 1,
        photos: 1,
        video: 1,

        socials: 1,
        socialPostSettings: 1,
        clickCollect: 1,
        markets: {
          $map: {
            input: "$markets",
            as: "m",
            in: {
              _id: "$$m.market",
              isActive: "$$m.isActive",
              openingHours: "$$m.openingHours",
              name: {
                $let: {
                  vars: {
                    matchedMarket: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$marketsData",
                            as: "md",
                            cond: { $eq: ["$$md._id", "$$m.market"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: "$$matchedMarket.name",
                },
              },
            },
          },
        },

        crew: 1,

        types: {
          $map: {
            input: "$types",
            as: "t",
            in: { _id: "$$t._id", label: "$$t.label" },
          },
        },

        features: {
          $map: {
            input: "$features",
            as: "f",
            in: { _id: "$$f._id", label: "$$f.label" },
          },
        },

        producer: {
          _id: "$producer._id",
          socialReason: "$producer.socialReason",
          onboardingStep: "$producer.onboardingStep",
          siren: "$producer.siren",
        },

        user: {
          _id: "$user._id",
          firstname: "$user.firstname",
          lastname: "$user.lastname",
          email: "$user.email",
        },
      },
    },
  ]).toArray();

  if (!shopData) throw new Error("Shop not found");


  return {
    shop: {
      ...shopData,
      producer: undefined,
      user: undefined,
    },
    producer: shopData.producer,
    user: shopData.user,
  };
}

async function getShopOrders(
  shopId,
  page = 1,
  limit = 10,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  filters = {}
) {
  const orderCollection = getCollectionInstance("orders");

  const _id = new mongoose.Types.ObjectId(shopId);
  const skip = (page - 1) * limit;

  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  const basePipeline = [
    { $match: { "details.shop": _id } },
    { $unwind: "$details" },
    { $match: { "details.shop": _id } },

    {
      $lookup: {
        from: getCollection("users"),
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

    ...(search
      ? [
          {
            $match: {
              $or: [
                { orderNumber: { $regex: search, $options: "i" } },
                { "user.firstname": { $regex: search, $options: "i" } },
                { "user.lastname": { $regex: search, $options: "i" } },
              ],
            },
          },
        ]
      : []),
  ];

  const pipeline = [
    ...basePipeline,

    {
      $facet: {
        items: [
          {
            $project: {
              _id: 1,
              orderNumber: 1,
              createdAt: 1,
              isPaid: 1,
              isWithdrawn: 1,

              user: {
                _id: "$user._id",
                firstname: "$user.firstname",
                lastname: "$user.lastname",
              },

              shopDetail: {
                status: "$details.status",
                _id: "$details._id",
                shopTotalTTC: "$details.shopTotalTTC",
                withdrawMode: "$details.withdrawMode",
                withdrawDay: "$details.withdrawDay",
              },
            },
          },
          { $sort: sort },
          { $skip: skip },
          { $limit: limit },
        ],

        totalCount: [{ $count: "count" }],

        stats: [
          {
            $group: {
              _id: null,
              avgTTC: { $avg: "$details.shopTotalTTC" },
              totalOrders: { $sum: 1 },
            },
          },
        ],
      },
    },
  ];

  const [result] = await orderCollection.aggregate(pipeline).toArray();

  return {
    items: result.items,
    stats: {
      avgTTC: result.stats[0]?.avgTTC || 0,
      totalOrders: result.stats[0]?.totalOrders || 0,
    },
    pagination: {
      page,
      limit,
      totalItems: result.totalCount[0]?.count || 0,
      totalPages: Math.ceil(
        (result.totalCount[0]?.count || 0) / limit
      ),
    },
  };
}

async function getShopNotes(
  shopId,
  page = 1,
  limit = 10,
  search,
  sortKey = "createdAt",
  sortDirection = "desc"
) {
  const collection = getCollectionInstance("notes");
  const _id = new mongoose.Types.ObjectId(shopId);
  const skip = (page - 1) * limit;

  const matchStage = { shop: _id };

  if (search) {
    matchStage.comment = { $regex: search, $options: "i" };
  }

  const sortStage = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  const pipeline = [
    { $match: matchStage },

    {
      $lookup: {
        from: getCollection("users"),
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

    {
      $facet: {
        items: [
          {
            $project: {
              note: { $toDouble: "$note" },
              createdAt: 1,
              comment: 1,
              source: 1,
              user: {
                _id: "$user._id",
                lastname: "$user.lastname",
              },
            },
          },
          { $sort: sortStage },
          { $skip: skip },
          { $limit: limit },
        ],

        totalCount: [{ $count: "count" }],

        stats: [
          {
            $group: {
              _id: null,
              avgRating: { $avg: "$note" },
              totalNotes: { $sum: 1 },
            },
          },
        ],
      },
    },
  ];

  const [result] = await collection.aggregate(pipeline).toArray();

  return {
    items: result.items,
    stats: {
      avgRating: result.stats[0]?.avgRating
        ? Number(result.stats[0].avgRating.toString())
        : 0,
      totalNotes: result.stats[0]?.totalNotes || 0,
    },
    pagination: {
      page,
      limit,
      totalItems: result.totalCount[0]?.count || 0,
      totalPages: Math.ceil(
        (result.totalCount[0]?.count || 0) / limit
      ),
    },
  };
}

async function getShopOrderById(detailId) {
  const orderCollection = getCollectionInstance("orders");

  const _id = new mongoose.Types.ObjectId(detailId);

  const [result] = await orderCollection.aggregate([
    // 1. unwind details
    { $unwind: "$details" },

    // 2. match sur le subOrder
    {
      $match: {
        "details._id": _id,
      },
    },

    {
      $lookup: {
        from: getCollection("users"),
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

    // 3. unwind products
    {
      $unwind: {
        path: "$details.products",
        preserveNullAndEmptyArrays: true,
      },
    },

    // 4. lookup STOCK
    {
      $lookup: {
        from: getCollection("stocks"),
        localField: "details.products.product",
        foreignField: "_id",
        as: "stock",
      },
    },
    { $unwind: { path: "$stock", preserveNullAndEmptyArrays: true } },

    // 5. lookup PRODUCT
    {
      $lookup: {
        from: getCollection("products"),
        localField: "stock.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },

    // 6. lookup FAMILY
    {
      $lookup: {
        from: getCollection("productfamilies"),
        localField: "product.family",
        foreignField: "_id",
        as: "family",
      },
    },
    { $unwind: { path: "$family", preserveNullAndEmptyArrays: true } },

    // 7. reconstruire chaque produit
    {
      $addFields: {
        "details.products.name": {
          $cond: [
            { $ifNull: ["$stock.productCustomName", false] },
            "$stock.productCustomName",
            {
              $concat: [
                { $ifNull: ["$family.name", ""] },
                " ",
                { $ifNull: ["$product.name", ""] },
              ],
            },
          ],
        },
        "details.products.image": {
          $ifNull: ["$stock.image", "$product.image"],
        },
      },
    },

    // 8. regroupement des produits
    {
      $group: {
        _id: "$details._id",

        orderId: { $first: "$_id" },

        user: {
          $first: {
            _id: "$user._id",
            firstname: "$user.firstname",
            lastname: "$user.lastname",
          }
        },

        withdrawMode: { $first: "$details.withdrawMode" },
        withdrawMarket: { $first: "$details.withdrawMarket" },
        withdrawMarketId: { $first: "$details.withdrawMarketId" },
        withdrawDay: { $first: "$details.withdrawDay" },

        shopTotalTTC: { $first: "$details.shopTotalTTC" },
        shopTotalHT: { $first: "$details.shopTotalHT" },
        shopTotalVAT: { $first: "$details.shopTotalVAT" },

        status: { $first: "$details.status" },
        invoice: { $first: "$details.invoice" },
        creditNotes: { $first: "$details.creditNotes" },
        stockIssue: { $first: "$details.stockIssue" },

        products: {
          $push: {
            _id: "$details.products._id",
            name: "$details.products.name",
            image: "$details.products.image",

            quantity: "$details.products.quantity",
            unit: "$details.products.unit",

            unitPriceTTC: "$details.products.unitPriceTTC",
            unitPriceHT: "$details.products.unitPriceHT",
            vatRate: "$details.products.vatRate",

            totalPrice: "$details.products.totalPriceTTC",

            productStatus: "$details.products.productStatus",
            refunded: "$details.products.refunded",
          },
        },
      },
    },
  ]).toArray();

  if (!result) throw new Error("SubOrder not found");

  return result;
}


async function getShopNoteById(noteId) {

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError("Invalid noteId", 400);
  }

  const note = await Note.findById(noteId)
    .populate({
      path: "user",
      ref: "User",
      select: "firstname lastname"
    })
    .lean();

  if (!note) {
    throw new NotFoundError("Note introuvable")
  }

  return {
    ...note,
    note: note.note ? Number(note.note.toString()) : null,
  }
}



module.exports = {
  getShops,
  getShopById,
  updateShop,
  getFormShop,
  getShopDashboard,
  getShopOrders,
  getShopNotes,
  getShopOrderById,
  getShopNoteById,
} 