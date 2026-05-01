const express = require("express");
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");
const { listShops, getShop, validate, unvalidate, formShop, shopDashboard, shopNotes, shopOrders, shopOrder, shopNote } = require("../controllers/adminShops.controller");
const router = express.Router();


router.patch(
  "/:id/validate",
  requireAuth,
  requireRole("admin", "super-admin"),
  validate
)

router.patch(
  "/:id/unvalidate",
  requireAuth,
  requireRole("admin", "super-admin"),
  unvalidate
)


router.get(
  "/form/:id",
  requireAuth,
  requireRole("admin", "super-admin"),
  formShop
)

router.get(
  "/:id/dashboard",
  requireAuth,
  requireRole("admin", "super-admin"),
  shopDashboard
)

router.get(
  "/:id/orders",
  requireAuth,
  requireRole("admin", "super-admin"),
  shopOrders
)

router.get(
  "/:id/notes",
  requireAuth,
  requireRole("admin", "super-admin"),
  shopNotes
)

router.get(
  "/order/:id",
  requireAuth,
  requireRole("admin", "super-admin"),
  shopOrder
)

router.get(
  "/note/:id",
  requireAuth,
  requireRole("admin", "super-admin"),
  shopNote
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