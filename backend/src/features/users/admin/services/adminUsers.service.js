const mongoose = require("mongoose");
const User = require("../../../../models/User");
const Order = require("../../../../models/Order");
const Role = require("../../../../models/Role");
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
  if (filters.isSuspended !== undefined) {
    filter.isSuspended = filters.isSuspended === "true";
  }

  if (filters.isDeleted !== undefined) {
    filter.isDeleted = filters.isDeleted === "true";
  }

  if (filters.role) {
    filter.roles = new mongoose.Types.ObjectId(filters.role);
  }

  // 🔀 SORT
  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  // 1️⃣ récupérer users paginés
  const [items, totalItems] = await Promise.all([
    User.find(filter)
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

  const user = await User.findById(userId).lean();

  if (!user) {
    throw new NotFoundError("User introuvable.");
  }

  // Stats globales
  const statsAggregation = await Order.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$totalTTC" },
        refundedAmount: {
          $sum: {
            $cond: [{ $eq: ["$isPaid", true] }, 0, 0], // placeholder si logique remboursement globale plus tard
          },
        },
      },
    },
  ]);

  const stats = statsAggregation[0] || {
    totalOrders: 0,
    totalSpent: 0,
    refundedAmount: 0,
  };

  // ❌ commandes annulées
  const cancelledOrders = await Order.countDocuments({
    user: userId,
    "details.status": "cancelled",
  });

  // 🕒 dernières commandes (5)
  const recentOrders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("orderNumber totalTTC status isPaid createdAt")
    .lean();

  return {
    user,
    stats: {
      totalOrders: stats.totalOrders || 0,
      totalSpent: stats.totalSpent || 0,
      refundedAmount: stats.refundedAmount || 0,
      cancelledOrders,
    },
    recentOrders,
  };
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




module.exports = {
  getUsers,
  getUserById,
  suspendUser,
  reactivateUser,
  softDeleteUser,
  updateUserRoles,
  restoreUser,
};
