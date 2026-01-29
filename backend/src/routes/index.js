const productsRoutes = require("../features/products/public/routes/products.routes.js");
const adminProductsRoutes = require("../features/products/admin/routes/AdminProducts.routes");
const adminMarketsRoutes = require("../features/markets/admin/routes/AdminMarkets.routes.js");


module.exports = {
  productsRoutes,
	adminProductsRoutes,
  adminMarketsRoutes,
};
