const express = require("express");
const { shopFeaturesNames } = require("../controllers/shopFeatures.controllers");
const router = express.Router();
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");



router.get(
  "/names", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  shopFeaturesNames
);

module.exports = router;