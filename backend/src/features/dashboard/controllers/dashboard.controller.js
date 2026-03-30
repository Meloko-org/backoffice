const { 
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
} = require("../services/dashboard.services");



const dashboard = async (req, res) => {
  const role = req.user.role.name;

  // requêtes parallèles
  const [
    todayStats,
    userStats,
    shopStats,
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
    getShopStats(),
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
    shops: shopStats,
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

  res.json(data);
}


const topProducts = async (req, res) => {

  let { limit } = req.query;

  // sécurisation du param limit
  const parsedLimit = Math.min(
    Math.max(parseInt(limit, 10) || 5, 1), 
    100 
  );
  const data = await getTopProducts(parsedLimit);

  res.json(data)
}


const topProductDetails = async (req, res) => {
  const { id } = req.params;

  const data = await getTopProductDetails(id);

  console.log("product detail :", data)

  res.json(data);
};


module.exports = {
  dashboard,
  topProducts,
  topProductDetails,
}