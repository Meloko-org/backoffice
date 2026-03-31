const mongoose = require("mongoose");
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
  getProductGlobalStats,
  getProductTimeline,
  getProductTopShops,
  getProductPricing,
  getProductInsights,
} = require("../services/dashboard.services");
const getStockIdsFromProduct = require("../../../helpers/productHelper");



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
    topProducts,
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
    topProducts,
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

  // console.log("product detail :", data)

  res.json(data);
};



const productAnalytics = async (req, res) => {
  const { productId } = req.params;

  // 1️⃣ récupérer les stocks
  const stockIds = await getStockIdsFromProduct(productId);

  if (!stockIds.length) {
    return res.json(null);
  }

  // 2️⃣ requêtes parallèles
  const [
    stats,
    timeline,
    topShops,
    pricing,
  ] = await Promise.all([
    getProductGlobalStats(stockIds),
    getProductTimeline(stockIds),
    getProductTopShops(stockIds),
    getProductPricing(productId),
  ]);

  // 3️⃣ récupérer info produit
  const product = await mongoose.model("Product")
    .findById(productId)
    .populate("family")
    .lean();

  // 4️⃣ insights
  const insights = await getProductInsights({ timeline, topShops, pricing });

  const data = {
    product: {
      _id: product._id,
      name: product.name,
      family: product.family?.name,
      unit: product.weight.unit,
      type: product.family.productsTypes,
    },
    stats,
    timeline,
    topShops,
    pricing,
    insights,
  }

  console.log(data)

  res.json(data);
}

module.exports = {
  dashboard,
  topProducts,
  topProductDetails,
  productAnalytics,
}