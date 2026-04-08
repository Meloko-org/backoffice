const mongoose = require("mongoose");
const Producer = require("../../../../models/Producer");
const User = require("../../../../models/User");
const { ApiError, NotFoundError } = require("../../../../utils/ApiError");
const getCollection = require("../../../../utils/collectionName");



async function getProducers({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  filters = {},
}) {
  const skip = (page - 1) * limit;

  const sortOrder = sortDirection === "asc" ? 1 : -1;

  // 🎛 mapping status
  const statusMap = {
    active: { isDeleted: false, isSuspended: false },
    suspended: { isSuspended: true },
    deleted: { isDeleted: true },
  };

  // 🧱 PIPELINE
  const pipeline = [];

  // 🔗 1. JOIN USER
  pipeline.push({
    $lookup: {
      from: getCollection("users"),
      localField: "owner",
      foreignField: "_id",
      as: "owner",
    },
  });

  pipeline.push({ $unwind: "$owner" });

  // 🔎 2. SEARCH
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { "owner.firstname": { $regex: search, $options: "i" } },
          { "owner.lastname": { $regex: search, $options: "i" } },
          { siren: { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  // 🎛 3. FILTERS (status user)
  if (filters.status && statusMap[filters.status]) {
    const condition = statusMap[filters.status];

    const match = {};

    if (condition.isDeleted !== undefined) {
      match["owner.isDeleted"] = condition.isDeleted;
    }

    if (condition.isSuspended !== undefined) {
      match["owner.isSuspended"] = condition.isSuspended;
    }

    pipeline.push({ $match: match });
  }

  if (filters.onboardingStep !== undefined) {
    const step = Number(filters.onboardingStep);

    if (!isNaN(step)) {
      pipeline.push({
        $match: {
          onboardingStep: step,
        }
      })
    }
  }

  // 🏪 4. JOIN SHOP (léger)
  pipeline.push({
    $lookup: {
      from: getCollection("shops"),
      localField: "_id",
      foreignField: "producer",
      as: "shop",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$shop",
      preserveNullAndEmptyArrays: true, // important si pas encore de shop
    },
  });

  // ✂️ 5. PROJECTION (important pour perf)
  pipeline.push({
    $project: {
      _id: 1,
      socialReason: 1,
      siren: 1,
      createdAt: 1,
      onboardingStep: 1,

      owner: {
        _id: "$owner._id",
        firstname: "$owner.firstname",
        lastname: "$owner.lastname",
        isDeleted: "$owner.isDeleted",
        isSuspended: "$owner.isSuspended",
      },

      shop: {
        _id: "$shop._id",
        name: "$shop.name",
        isOpen: "$shop.isOpen",
        isPremium: "$shop.isPremium",
      },
    },
  });

  // 🔀 6. SORT
  pipeline.push({
    $sort: {
      [sortKey === "firstname" ? "owner.firstname" : sortKey]: sortOrder,
    },
  });

  // 📊 7. COUNT (avant pagination)
  const countPipeline = [...pipeline, { $count: "total" }];
  const countResult = await Producer.aggregate(countPipeline);

  const totalItems = countResult[0]?.total || 0;

  // 📦 8. PAGINATION
  pipeline.push(
    { $skip: skip },
    { $limit: limit }
  );

  // 🚀 9. EXEC
  const items = await Producer.aggregate(pipeline);

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



async function getProducerById(producerId) {
  if (!mongoose.Types.ObjectId.isValid(producerId)) {
    throw new ApiError("Invalid producerId", 400);
  }

  const pipeline = [];

  // 🎯 match
  pipeline.push({
    $match: {
      _id: new mongoose.Types.ObjectId(producerId),
    },
  });

  // 👤 USER
  pipeline.push({
    $lookup: {
      from: getCollection("users"),
      localField: "owner",
      foreignField: "_id",
      as: "owner",
    },
  });

  pipeline.push({
    $unwind: "$owner",
  });

  // 🏪 SHOP
  pipeline.push({
    $lookup: {
      from: getCollection("shops"),
      localField: "_id",
      foreignField: "producer",
      as: "shop",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$shop",
      preserveNullAndEmptyArrays: true,
    },
  });

  pipeline.push({
    $lookup: {
      from: "types",
      localField: "shop.types",
      foreignField: "_id",
      as: "shopTypes",
    },
  });

  // ✨ projection clean
  pipeline.push({
    $project: {
      _id: 1,
      socialReason: 1,
      siren: 1,
      iban: 1,
      bic: 1,
      onboardingStep: 1,
      address: 1,
      createdAt: 1,

      owner: {
        _id: "$owner._id",
        firstname: "$owner.firstname",
        lastname: "$owner.lastname",
        isDeleted: "$owner.isDeleted",
        isSuspended: "$owner.isSuspended",
      },

      shop: {
        _id: "$shop._id",
        name: "$shop.name",
        isOpen: "$shop.isOpen",
        isPremium: "$shop.isPremium",
        siret: "$shop.siret",
        createdAt: "$shop.createdAt",
        address: "$shop.address",
        types: {
          $map: {
            input: "$shopTypes",
            as: "type",
            in: {
              _id: "$$type._id",
              label: "$$type.label",
            },
          },
        },
        marketsCount: {
          $size: { $ifNull: ["$shop.markets", []] },
        },
      },
    },
  });

  const result = await Producer.aggregate(pipeline);

  const producer = result[0];

  if (!producer) {
    throw new NotFoundError("Producer introuvable.");
  }

  return producer;
}


async function updateProducer(producerId, payload) {

  const producer = await Producer.findById(producerId)

  if (!producer) {
    throw new NotFoundError("Producer introuvable.");
  }

  const user = await User.findById(producer.owner)

  if (!user) {
    throw new NotFoundError("le producer n'est associé à aucun user");
  }

  if (payload.socialReason && payload.socialReason !== producer.socialReason) {
    producer.socialReason = payload.socialReason
  }

  if (payload.siren && payload.siren !== producer.siren) {
    producer.siren = payload.siren
  }
  
  if (payload.iban && payload.iban !== producer.iban) {
    producer.iban = payload.iban
  }
  
  if (payload.bic && payload.bic !== producer.bic) {
    producer.bic = payload.bic
  }
  
  if (payload.onboardingStep !== undefined && payload.onboardingStep !== producer.onboardingStep) {
    producer.onboardingStep = payload.onboardingStep
  }

  if (payload.address) {
    producer.address = {
      ...producer.address?.toObject?.(),
      ...payload.address,
    };
  }

  await producer.save();

  return producer;


}

module.exports = {
  getProducers,
  getProducerById,
  updateProducer,
}