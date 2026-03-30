const Order = require("../../../models/Order");
const User = require("../../../models/User");
const Shop = require("../../../models/Shop");
const Stock = require("../../../models/Stock");
const mongoose = require("mongoose");
const getCollection = require("../../../utils/collectionName");


async function getTodayStats() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const stats = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: null,
        orders: { $sum: 1 },
        revenue: {
          $sum: {
            $cond: ["$isPaid", "$totalTTC", 0],
          },
        },
      },
    },
  ]);

  return {
    ordersCount: stats[0]?.orders || 0,
    revenue: stats[0]?.revenue || 0,
  };
}


async function getUserStats() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const [total, today] = await Promise.all([
    User.countDocuments({ isDeleted: false }),
    User.countDocuments({
      createdAt: { $gte: start },
      isDeleted: false,
    }),
  ]);

  return {
    total,
    today,
  };
}


async function getShopStats() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const result = await Shop.aggregate([
    {
      $match: {
        isOpen: true, // ✅ uniquement shops actifs
      },
    },

    {
      $facet: {
        // 🔹 TOTAL
        total: [
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              premium: {
                $sum: {
                  $cond: [{ $eq: ["$isPremium", true] }, 1, 0],
                },
              },
            },
          },
        ],

        // 🔹 TODAY
        today: [
          {
            $match: {
              createdAt: { $gte: startOfToday },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              premium: {
                $sum: {
                  $cond: [{ $eq: ["$isPremium", true] }, 1, 0],
                },
              },
            },
          },
        ],

        // 🔹 WEEK
        week: [
          {
            $match: {
              createdAt: { $gte: startOfWeek },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              premium: {
                $sum: {
                  $cond: [{ $eq: ["$isPremium", true] }, 1, 0],
                },
              },
            },
          },
        ],
      },
    },
  ]);

  const data = result[0];

  return {
    total: data.total[0]?.count || 0,
    totalPremium: data.total[0]?.premium || 0,

    newToday: data.today[0]?.count || 0,
    newTodayPremium: data.today[0]?.premium || 0,

    newWeek: data.week[0]?.count || 0,
    newWeekPremium: data.week[0]?.premium || 0,
  };
}
    

async function getAlerts() {
  const [stockIssues, cancelledOrders] = await Promise.all([
    Order.countDocuments({
      "details.stockIssue": true,
    }),

    Order.countDocuments({
      "details.status": "cancelled",
    }),
  ]);

  return {
    stockIssues,
    cancelledOrders,
  };
}
    

async function getRecentOrders() {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("orderNumber totalTTC createdAt isPaid");

  return orders.map((o) => ({
    id: o._id,
    orderNumber: o.orderNumber,
    total: o.totalTTC,
    createdAt: o.createdAt,
    isPaid: o.isPaid,
  }));
}
    

async function getRecentUsers() {
  const users = await User.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("email createdAt firstname lastname");

  return users.map((u) => ({
    id: u._id,
    email: u.email,
    name: `${u.firstname || ""} ${u.lastname || ""}`.trim(),
    createdAt: u.createdAt,
  }));
}


async function getOrdersTimeseries(days = 7) {
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - days + 1);

  const result = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: from },
        isPaid: true,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        orders: { $sum: 1 },
        revenue: { $sum: "$totalTTC" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result.map((d) => ({
    date: d._id,
    orders: d.orders,
    revenue: d.revenue,
  }));
}


async function getRevenue7Days() {
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - 6);

  const result = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: from },
        isPaid: true,
      },
    },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$totalTTC" },
      },
    },
  ]);

  return result[0]?.revenue || 0;
}


async function getAverageCart() {
  const result = await Order.aggregate([
    {
      $match: { isPaid: true },
    },
    {
      $group: {
        _id: null,
        avgCart: { $avg: "$totalTTC" },
      },
    },
  ]);

  return Math.round(result[0]?.avgCart || 0);
}


async function getRevenueByMarket() {
  return Order.aggregate([
    {
      $match: { isPaid: true },
    },

    {
      $unwind: "$details",
    },

    // ✅ FILTRE CRUCIAL
    {
      $match: {
        "details.withdrawMode": "market",
      },
    },

    {
      $group: {
        _id: "$details.withdrawMarket",
        revenue: { $sum: "$details.shopTotalTTC" },
        count: { $sum: 1 },
      },
    },

    {
      $project: {
        _id: 0,
        name: "$_id",
        revenue: 1,
        count: 1,
      },
    },

    {
      $sort: { revenue: -1 },
    },

    {
      $limit: 5,
    },
  ]);
}


async function getTopProducts(limit = 5) {

  return Order.aggregate([
    { $match: { isPaid: true } },

    { $unwind: "$details" },
    { $unwind: "$details.products" },

    {
      $group: {
        _id: "$details.products.product", // stockId
        quantity: { $sum: "$details.products.quantity" },
        revenue: { $sum: "$details.products.totalPriceTTC" },
      },
    },

    // 🔹 STOCK
    {
      $lookup: {
        from: "stocks",
        localField: "_id",
        foreignField: "_id",
        as: "stock",
      },
    },
    { $unwind: "$stock" },

    // 🔹 PRODUCT
    {
      $lookup: {
        from: "products",
        localField: "stock.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },

    // 🔹 FAMILY
    {
      $lookup: {
        from: "productfamilies",
        localField: "product.family",
        foreignField: "_id",
        as: "family",
      },
    },
    { $unwind: { path: "$family", preserveNullAndEmptyArrays: true } },

    // 🔥 NAME + UNIT + FORMATTED QUANTITY
    {
      $addFields: {
        // 🧾 NOM
        name: {
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

        // ⚖️ UNIT
        unit: "$product.weight.unit",

        // 🔥 FORMAT QUANTITY
        quantityFormatted: {
          $cond: [
            { $eq: ["$product.weight.unit", "gr"] },
            {
              $concat: [
                {
                  $toString: {
                    $round: [
                      { $divide: ["$quantity", 1000] },
                      2
                    ],
                  },
                },
                " kg",
              ],
            },
            {
              $toString: "$quantity",
            },
          ],
        },
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        quantity: 1, // brut (utile si besoin)
        quantityFormatted: 1, // ✅ affichage
        revenue: 1,
      },
    },

    { $sort: { quantity: -1 } },
    { $limit: limit },
  ]);
}


async function getTopShops() {
  return Order.aggregate([
    { $match: { isPaid: true } },
    { $unwind: "$details" },

    {
      $group: {
        _id: "$details.shop",
        revenue: { $sum: "$details.shopTotalTTC" },
        orders: { $sum: 1 },
      },
    },

    {
      $lookup: {
        from: "shops",
        localField: "_id",
        foreignField: "_id",
        as: "shop",
      },
    },

    { $unwind: { path: "$shop", preserveNullAndEmptyArrays: true } },

    {
      $project: {
        name: "$shop.name",
        revenue: 1,
        orders: 1,
      },
    },

    { $sort: { revenue: -1 } },
    { $limit: 5 },
  ]);
}


async function getTopMarketsByUsage() {
  return Order.aggregate([
    {
      $match: { isPaid: true },
    },

    {
      $unwind: "$details",
    },

    // ✅ FILTRE ESSENTIEL
    {
      $match: {
        "details.withdrawMode": "market",
      },
    },

    {
      $group: {
        _id: "$details.withdrawMarket",
        count: { $sum: 1 },
      },
    },

    {
      $project: {
        _id: 0,
        name: "$_id",
        count: 1,
      },
    },

    {
      $sort: { count: -1 },
    },

    {
      $limit: 5,
    },
  ]);
}


async function getTopProductDetails(stockId) {
  const objectId = new mongoose.Types.ObjectId(stockId);

  // =========================
  // 1️⃣ STATS
  // =========================
  const statsResult = await Order.aggregate([
    { $match: { isPaid: true } },
    { $unwind: "$details" },
    { $unwind: "$details.products" },

    {
      $match: {
        "details.products.product": objectId,
      },
    },

    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$details.products.quantity" },
        totalRevenue: { $sum: "$details.products.totalPriceTTC" },
        orders: { $addToSet: "$_id" }, // 🔥 set d’orders uniques
      },
    },

    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalRevenue: 1,
        ordersCount: { $size: "$orders" }, // ✅ FIX
      },
    },
  ]);

  const stats = statsResult[0] || {
    totalQuantity: 0,
    totalRevenue: 0,
    ordersCount: 0,
  };

  // =========================
  // 2️⃣ TIMELINE (7 ou 30 jours)
  // =========================
  const timeline = await Order.aggregate([
    { $match: { isPaid: true } },
    { $unwind: "$details" },
    { $unwind: "$details.products" },

    {
      $match: {
        "details.products.product": objectId,
      },
    },

    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
        },
        quantity: { $sum: "$details.products.quantity" },
        revenue: { $sum: "$details.products.totalPriceTTC" },
      },
    },

    {
      $project: {
        _id: 0,
        date: "$_id.date",
        quantity: 1,
        revenue: 1,
      },
    },

    { $sort: { date: 1 } },
  ]);

  // =========================
  // 3️⃣ STOCK (SAFE via mongoose)
  // =========================
  const stock = await mongoose.model("Stock")
    .findById(objectId)
    .populate({
      path: "product",
      populate: { path: "family" },
    })
    .populate("shop")
    .lean();

  if (!stock) return null;

  // =========================
  // 4️⃣ NOM PRODUIT
  // =========================
  const name =
    stock.productCustomName ||
    `${stock.product?.family?.name || ""} ${stock.product?.name || ""}`.trim();

  // =========================
  // 5️⃣ RETURN FINAL
  // =========================
  return {
    _id: stock._id,

    name,

    product: {
      _id: stock.product?._id,
      name: stock.product?.name,
      family: stock.product?.family?.name,
    },

    shop: {
      _id: stock.shop?._id,
      name: stock.shop?.name,
    },

    pricing: {
      unit: stock.product?.weight?.unit,
      priceTTC: stock.price,
    },

    stats,

    timeline,
  };
}

// async function getTopProductDetails(stockId) {
//   const result = await Order.aggregate([
//     { $match: { isPaid: true } },

//     { $unwind: "$details" },
//     { $unwind: "$details.products" },

//     {
//       $match: {
//         "details.products.product": new mongoose.Types.ObjectId(stockId),
//       },
//     },

//     {
//       $group: {
//         _id: null,
//         totalQuantity: { $sum: "$details.products.quantity" },
//         totalRevenue: { $sum: "$details.products.totalPriceTTC" },
//         ordersCount: { $sum: 1 },
//       },
//     },

//     {
//       $lookup: {
//         from: getCollection("stocks"),
//         localField: "_id",
//         foreignField: "_id",
//         as: "stock",
//       },
//     },

//     { $unwind: "$stock" },

//     {
//       $lookup: {
//         from: getCollection("products"),
//         localField: "stock.product",
//         foreignField: "_id",
//         as: "product",
//       },
//     },

//     { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },

//     {
//       $lookup: {
//         from: getCollection("productfamilies"),
//         localField: "product.family",
//         foreignField: "_id",
//         as: "family",
//       },
//     },

//     { $unwind: { path: "$family", preserveNullAndEmptyArrays: true } },

//     {
//       $lookup: {
//         from: getCollection("shops"),
//         localField: "stock.shop",
//         foreignField: "_id",
//         as: "shop",
//       },
//     },

//     { $unwind: "$shop" },

//     {
//       $project: {
//         name: {
//           $ifNull: [
//             "$stock.productCustomName",
//             { $concat: ["$family.name", " ", "$product.name"] },
//           ],
//         },
//         shop: {
//           _id: "$shop._id",
//           name: "$shop.name",
//         },
//         pricing: {
//           unit: "$product.weight.unit",
//           priceTTC: "$stock.priceTTC",
//         },
//         stats: {
//           totalQuantity: "$totalQuantity",
//           totalRevenue: "$totalRevenue",
//           ordersCount: "$ordersCount",
//         },
//       },
//     },
//   ]);

//   console.log("AGG RESULT:", JSON.stringify(result, null, 2));

//   return result[0] || null;
// }

module.exports = {
  getTodayStats,
  getUserStats,
  getShopStats,
  getAlerts,
  getRecentOrders,
  getRecentUsers,
  getOrdersTimeseries,
  getRevenue7Days,
  getAverageCart,
  getRevenueByMarket,
  getTopProducts,
  getTopShops,
  getTopMarketsByUsage,
  getTopProductDetails,
}