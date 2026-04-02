const express = require("express");
const router = express.Router();
const requireAuth = require("../../../middlewares/requireAuth");
const requireRole = require("../../../middlewares/requireRole");
const { dashboard, topProducts, topProductDetails, productAnalytics, topMarkets, topMarketDetails, shopAnalytics, topShops, topShopDetails, marketAnalytics } = require("../controllers/dashboard.controller");


/* products */
router.get(
  "/topProducts/:productId/analytics",
  requireAuth,
  requireRole("super-admin", "admin"),
  productAnalytics
)

router.get(
  "/topProducts",
  requireAuth,
  requireRole("super-admin", "admin"),
  topProducts
)

router.get(
  "/topProducts/:id",
  requireAuth,
  requireRole("super-admin", "admin"),
  topProductDetails
)


/* shops */
router.get(
  "/topShops/:shopId/analytics",
  requireAuth,
  requireRole("super-admin", "admin"),
  shopAnalytics
)

router.get(
  "/topShops",
  requireAuth,
  requireRole("super-admin", "admin"),
  topShops
)

router.get(
  "/topShops/:id",
  requireAuth,
  requireRole("super-admin", "admin"),
  topShopDetails
)

/* markets */
router.get(
  "/topMarkets/:marketId/analytics",
  requireAuth,
  requireRole("super-admin", "admin"),
  marketAnalytics
)

router.get(
  "/topMarkets",
  requireAuth,
  requireRole("super-admin", "admin"),
  topMarkets
)

router.get(
  "/topMarkets/:id",
  requireAuth,
  requireRole("super-admin", "admin"),
  topMarketDetails
)

/* dashboard */
router.get(
  "/",
  requireAuth,
  requireRole("super-admin", "admin"),
  dashboard
)


module.exports = router;