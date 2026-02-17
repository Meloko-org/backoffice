const productsRoutes = require("../features/products/public/routes/products.routes.js");
const adminProductsRoutes = require("../features/products/admin/routes/AdminProducts.routes");
const adminMarketsRoutes = require("../features/markets/admin/routes/AdminMarkets.routes.js");
const adminCategoriesRoutes = require("../features/categories/admin/routes/categories.routes.js");
const adminFamiliesRoutes = require("../features/families/admin/routes/families.routes.js");
const adminTypesRoutes = require("../features/types/admin/routes/types.routes.js");
const adminTagCategoriesRoutes = require("../features/tagCategories/admin/routes/tagCategories.routes.js");


module.exports = {
  productsRoutes,
	adminProductsRoutes,
  adminMarketsRoutes,
  adminCategoriesRoutes,
  adminFamiliesRoutes,
  adminTypesRoutes,
  adminTagCategoriesRoutes,
};
