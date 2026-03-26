const Order = require("../../../models/Order");
const User = require("../../../models/User");
const mongoose = require("mongoose");


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
    orders: stats[0]?.orders || 0,
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



module.exports = {
  getTodayStats,
  getUserStats,
  getAlerts,
  getRecentOrders,
  getRecentUsers,
}