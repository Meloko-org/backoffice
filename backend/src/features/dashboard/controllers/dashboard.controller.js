const { 
  getTodayStats, 
  getUserStats, 
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
} = require("../services/dashboard.services");

const dashboard = async (req, res) => {
  const role = req.user.role.name;

  // requêtes parallèles
  const [
    todayStats,
    userStats,
    alerts,
    recentOrders,
    recentUsers,
    timeseries,
    revenue7Days,
    avgCart,
    revenueByMarket,
    topProducs,
    topShops,
    topMarketsByUsage
  ] = await Promise.all([
    getTodayStats(),
    getUserStats(),
    getAlerts(),
    getRecentOrders(),
    getRecentUsers(),
    getOrdersTimeseries(100),
    getRevenue7Days(),
    getAverageCart(),
    getRevenueByMarket(),
    getTopProducts(),
    getTopShops(),
    getTopMarketsByUsage(),
  ]);

  const data = {
    today: todayStats,
    users: userStats,
    alerts,
    recentOrders,
    recentUsers,
    timeseries,
    revenue7Days,
    avgCart,
    revenueByMarket,
    topProducs,
    topShops,
    topMarketsByUsage
  };

  // 🔥 filtrage par rôle
  if (!["super-admin", "admin"].includes(role)) {
    delete data.today.revenue;
  }

  console.log("data :", data)

  res.json(data);
}


module.exports = {
  dashboard,
}