const mongoose = require("mongoose");
const User = require("../../../../models/User");
const Order = require("../../../../models/Order");
const Role = require("../../../../models/Role");
const Producer = require("../../../../models/Producer");
const { ApiError, NotFoundError, ValidationError } = require("../../../../utils/ApiError");


async function getUsers({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  filters = {},
}) {

  const skip = (page - 1) * limit;

  const filter = {};

  // 🔎 SEARCH
  if (search) {
    filter.$or = [
      { email: { $regex: search, $options: "i" } },
      { firstname: { $regex: search, $options: "i" } },
      { lastname: { $regex: search, $options: "i" } },
    ];
  }

  // 🎛 FILTERS
  const statusMap = {
    active: { isDeleted: false, isSuspended: false},
    suspended: { isSuspended: true },
    deleted: { isDeleted: true },
  };

  if (filters.status && statusMap[filters.status]) {
    Object.assign(filter, statusMap[filters.status]);
  }

  if (filters.role) {
    filter.role = new mongoose.Types.ObjectId(filters.role);
  }

  // 🔀 SORT
  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  // 1️⃣ récupérer users paginés
  const [items, totalItems] = await Promise.all([
    User.find(filter)
      .populate({
        path: "role",
        model: "Role",
        select: "name"
      })
      .populate("bookmarks", "name")
      .populate({
        path: "deletedByAdmin",
        model: "User",
        select: "lastname"
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments(filter),
  ]);

  // 2️⃣ récupérer stats commandes pour ces users uniquement
  const userIds = items.map((u) => u._id);

  const ordersStats = await Order.aggregate([
    { $match: { user: { $in: userIds } } },
    {
      $group: {
        _id: "$user",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$totalTTC" },
      },
    },
  ]);

  // transformer en map pour accès rapide
  const statsMap = {};
  ordersStats.forEach((stat) => {
    statsMap[stat._id.toString()] = stat;
  });

  // 3️⃣ injecter stats dans items
  items.forEach((user) => {
    const stats = statsMap[user._id.toString()];
    user.totalOrders = stats?.totalOrders || 0;
    user.totalSpent = stats?.totalSpent || 0;
  });

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


async function getUserById(userId) {

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError("Invalid user id", 400);
  }

  const user = await User.findById(userId)
    .populate({
      path: "role",
      model: "Role",
      select: "name"
    })
    .lean();

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  return user;
}


async function suspendUser(userId, reason, adminId = null) {

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  if (user.isSuspended) {
    return user;
  }

  /* appel à clerk */

  user.isSuspended = true;
  user.suspendedAt = new Date();
  user.suspensionReason = reason || "No reason provided";

  await user.save();

  return user;
}


async function reactivateUser(userId) {

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  user.isSuspended = false;
  user.suspendedAt = null;
  user.suspensionReason = null;

  await user.save();

  return user;
}


async function softDeleteUser(userId, adminId = null) {

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  if (user.isDeleted) {
    return user;
  }

  user.isDeleted = true;
  user.deletedAt = new Date();
  user.deletedByAdmin = adminId;

  // sécurité : on suspend automatiquement
  user.isSuspended = true;
  user.suspendedAt = new Date();
  user.suspensionReason = "Account deleted by admin";

  await user.save();

  return user;
}


async function updateUserRoles(userId, rolesIds) {

  if (!Array.isArray(rolesIds) || rolesIds.length === 0) {
    throw new ValidationError("User must have at least one role");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  // vérifier que tous les rôles existent
  const rolesCount = await Role.countDocuments({
    _id: { $in: rolesIds },
  });

  if (rolesCount !== rolesIds.length) {
    throw new Error("One or more roles are invalid");
  }

  user.roles = rolesIds;

  await user.save();

  return user;
}

async function updateUser(userId, payload, currentUser) {

  if (!payload.role) {
    throw new ValidationError("User must have a role");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  if (payload.firstname && payload.firstname !== user.firstname) {
    user.firstname = payload.firstname
  }

  if (payload.lastname && payload.lastname !== user.lastname) {
    user.lastname = payload.lastname;
  }

  if (payload.avatar !== user.avatar) {
    user.avatar = payload.avatar;
  }

  if (payload.suspensionReason && payload.suspensionReason !== user.suspensionReason) {
    user.suspensionReason = payload.suspensionReason;
  }

  if (
    payload.role === "super-admin" &&
    currentUser.role.name !== "super-admin"
  ) {
    throw new ForbiddenError("Cannot assign super-admin role");
  }

  // vérifier que le rôle existe
  const roleExists = await Role.exists({ _id: payload.role });

  if (!roleExists) {
    throw new ValidationError("Role invalide");
  }

  user.role = payload.role;

  await user.save();

  return user;
}


async function restoreUser(userId) {

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  if (!user.isDeleted) {
    return user;
  }

  user.isDeleted = false;
  user.deletedAt = null;
  user.deletedByAdmin = null;

  await user.save();

  return user;
}


async function getUserDashboard(
  userId,
  page = 1,
  limit = 10
) {

  const objectUserId = new mongoose.Types.ObjectId(userId);

  /* =========================
     1️⃣ USER
  ========================== */

  const user = await User.findById(userId)
    .populate("role", "name")
    .populate("bookmarks", "name")
    .populate({
      path: "deletedByAdmin",
      model: "User",
      select: "lastname"
    })
    .lean();

  if (!user) {
    throw new Error("User not found");
  }
  
  console.log("user dashbord :", user)

  /* =========================
     2️⃣ PRODUCER
  ========================== */

  const producer = await Producer.findOne({ owner: userId })
    .select("_id")
    .lean();

  /* =========================
     3️⃣ ORDERS AGGREGATION
  ========================== */

  const skip = (page - 1) * limit;

  const ordersAggregation = await Order.aggregate([
    { $match: { user: objectUserId } },

    {
      $facet: {
        stats: [
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalSpentAll: { $sum: "$totalTTC" },
              paidOrdersCount: {
                $sum: {
                  $cond: [{ $eq: ["$isPaid", true] }, 1, 0],
                },
              },
              totalSpentPaid: {
                $sum: {
                  $cond: [
                    { $eq: ["$isPaid", true] },
                    "$totalTTC",
                    0,
                  ],
                },
              },
              lastOrderAt: { $max: "$createdAt" },
            },
          },
        ],

        recentOrders: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              _id: 1,
              orderNumber: 1,
              createdAt: 1,
              totalTTC: 1,
              isPaid: 1,
              isWithdrawn: 1,
              paymentMethod: 1,
            },
          },
        ],

        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  const stats = ordersAggregation[0].stats[0] || {
    totalOrders: 0,
    totalSpentAll: 0,
    paidOrdersCount: 0,
    totalSpentPaid: 0,
    lastOrderAt: null,
  };

  const totalOrdersCount =
    ordersAggregation[0].totalCount[0]?.count || 0;

  /* =========================
     4️⃣ REFUNDED PRODUCTS COUNT
     (separate lightweight aggregation)
  ========================== */

  const refundedProductsAgg = await Order.aggregate([
    { $match: { user: objectUserId } },
    { $unwind: "$details" },
    { $unwind: "$details.products" },
    {
      $match: {
        "details.products.refunded": true,
      },
    },
    {
      $count: "refundedProductsCount",
    },
  ]);

  const refundedProductsCount =
    refundedProductsAgg[0]?.refundedProductsCount || 0;

  /* =========================
     5️⃣ BUILD RESPONSE
  ========================== */

  const averageBasketTTC =
    stats.paidOrdersCount > 0
      ? stats.totalSpentPaid / stats.paidOrdersCount
      : 0;

  return {
    user: {
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: user.avatar,
      addresses: user.addresses,
      bookmarks: user.bookmarks.map((b) => ({
        _id: b._id,
        name: b.name
      })),
      role: {
        _id: user.role._id,
        name: user.role.name,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      isSuspended: user.isSuspended,
      suspendedAt: user.suspendedAt,
      suspensionReason: user.suspensionReason,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      deletedByAdmin: user.deletedByAdmin 
        ? {
          _id: user.deletedByAdmin._id.toString(),
          lastname: user.deletedByAdmin.lastname,
        }
        : null,
      isProducer: !!producer,
      producerId: producer?._id || null,
    },

    business: {
      totalOrders: stats.totalOrders,
      totalSpentTTC: stats.totalSpentPaid,
      averageBasketTTC,
      lastOrderAt: stats.lastOrderAt,
      paidOrdersCount: stats.paidOrdersCount,
      cancelledOrdersCount: 0, // (à voir si on l'ajoute via aggregate)
      refundedProductsCount,
    },

    recentOrders: {
      items: ordersAggregation[0].recentOrders,
      pagination: {
        page,
        limit,
        totalItems: totalOrdersCount, 
        totalPages: Math.ceil(totalOrdersCount / limit),
      },
    },
  };
}




module.exports = {
  getUsers,
  getUserById,
  suspendUser,
  reactivateUser,
  softDeleteUser,
  updateUserRoles,
  updateUser,
  restoreUser,
  getUserDashboard,
};
