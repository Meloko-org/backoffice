const express = require("express");
const router = express.Router();
const requireAuth = require("../../../middlewares/requireAuth");
const requireRole = require("../../../middlewares/requireRole");
const { dashboard, topProducts, topProductDetails } = require("../controllers/dashboard.controller");

router.get(
  "/",
  requireAuth,
  requireRole("super-admin", "admin" ,"dev", "support"),
  dashboard
)

router.get(
  "/topProducts",
  requireAuth,
  requireRole("super-admin", "admin" ,"dev", "support"),
  topProducts
)

router.get(
  "/topProducts/:id",
  requireAuth,
  requireRole("super-admin", "admin" ,"dev", "support"),
  topProductDetails
)


module.exports = router;