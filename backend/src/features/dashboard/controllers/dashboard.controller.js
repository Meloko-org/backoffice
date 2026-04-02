const mongoose = require("mongoose");
const { 
  getTodayStats, 
  getUserStats, 
  getShopsStats,
  getAlerts, 
  getRecentOrders, 
  getRecentUsers, 
  getOrdersTimeseries,
  getRevenue7Days,
  getAverageCart,
  getTopMarkets, 
  getTopProducts,
  getTopShops,
  getTopMarketsByUsage,
  getTopProductDetails,
  getProductGlobalStats,
  getProductTimeline,
  getProductTopShops,
  getProductPricing,
  getTopShopDetails,
  buildProductInsights,
  getShopStats,
  getShopTimeline,
  getShopTopProducts,
  getShopRevenueByMarket,
  buildShopInsights,
} = require("../services/dashboard.services");
const getStockIdsFromProduct = require("../../../helpers/productHelper");



const dashboard = async (req, res) => {
  const role = req.user.role.name;

  // requêtes parallèles
  const [
    todayStats,
    userStats,
    shopsStats,
    alerts,
    recentOrders,
    recentUsers,
    timeseries,
    revenue7Days,
    avgCart,
    topMarkets,
    topProducts,
    topShops,
    topMarketsByUsage
  ] = await Promise.all([
    getTodayStats(),
    getUserStats(),
    getShopsStats(),
    getAlerts(), //
    getRecentOrders(),
    getRecentUsers(), //
    getOrdersTimeseries(100),
    getRevenue7Days(),
    getAverageCart(),

    getTopMarkets(),
    getTopProducts(),
    getTopShops(),

    getTopMarketsByUsage(),
  ]);

  const data = {
    today: todayStats,
    users: userStats,
    shops: shopsStats,
    alerts,
    recentOrders,
    recentUsers,
    timeseries,
    revenue7Days,
    avgCart,

    topMarkets,
    topProducts,
    topShops,

    topMarketsByUsage
  };

  // 🔥 filtrage par rôle
  if (!["super-admin", "admin"].includes(role)) {
    delete data.today.revenue;
  }

  // console.log("dashboard data :", data)

  res.json(data);
}



// pour le widget TopProducts et le panel TopProductsListPanel
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

// pour le panel TopProductPanel
const topProductDetails = async (req, res) => {
  const { id } = req.params;

  const data = await getTopProductDetails(id);

  res.json(data);
};

// pour le panel ProductAnalyticsPanel
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
  const insights = buildProductInsights({ timeline, topShops, pricing });

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

  res.json(data);
}



// pour le widget TopShops et le panel TopShopsListPanel
const topShops = async (req, res) => {

  let { limit } = req.query;

  // sécurisation du param limit
  const parsedLimit = Math.min(
    Math.max(parseInt(limit, 10) || 5, 1), 
    100 
  );
  const data = await getTopShops(parsedLimit);

  res.json(data)
}

// pour le panel TopShopPanel
const topShopDetails = async (req, res) => {
  const { id } = req.params;

  const data = await getTopShopDetails(id);

  res.json(data);
};

// pour le panel ShopAnalyticsPanel
const shopAnalytics = async (req, res) => {
  console.log("shopAnalytics called")
  const { shopId } = req.params;

  const [
    stats,
    timeline,
    topProducts,
    revenueByMarket,
    shop,
  ] = await Promise.all([
    getShopStats(shopId),
    getShopTimeline(shopId),
    getShopTopProducts(shopId),
    getShopRevenueByMarket(shopId),
    mongoose.model("Shop").findById(shopId).lean(),
  ]);

  const insights = buildShopInsights({
    timeline,
    topProducts,
    revenueByMarket,
  });

  const data = {
    shop: {
      _id: shop._id,
      name: shop.name,
      isPremium: shop.isPremium,
    },
    stats,
    timeline,
    topProducts,
    revenueByMarket,
    insights,
  }

  console.log("shop analytics :", data)

  res.json(data);
}




const topMarkets = async (req, res) => {

  let { limit } = req.query;

  // sécurisation du param limit
  const parsedLimit = Math.min(
    Math.max(parseInt(limit, 10) || 5, 1), 
    100 
  );
  const data = await getTopMarkets(parsedLimit);

  console.log(data)

  res.json(data)
}


const topMarketDetails = async (req, res) => {
  const { id } = req.params;

  const data = await getTopMarketDetails(id);

  res.json(data);
};


const marketAnalytics = async (req, res) => {

}



module.exports = {
  dashboard,
  topProducts,
  topProductDetails,
  productAnalytics,
  topShops,
  topShopDetails,
  shopAnalytics,
  topMarkets,
  topMarketDetails,
  marketAnalytics,
}