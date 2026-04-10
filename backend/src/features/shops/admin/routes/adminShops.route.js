const express = require("express");
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");
const { listShops, getShop, formShop } = require("../controllers/adminShops.controller");
const router = express.Router();


router.get(
  "/form/:id",
  requireAuth,
  requireRole("admin", "super-admin"),
  formShop
)

router.get(
  "/:id",
  requireAuth,
  requireRole("admin", "super-admin"),
  getShop
)


router.get(
  "/",
  requireAuth,
  requireRole("admin", "super-admin"),
  listShops
)

module.exports = router;