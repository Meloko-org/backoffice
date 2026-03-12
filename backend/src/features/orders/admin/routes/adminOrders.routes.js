const express = require("express");
const { 
  listOrders,
  getOrder
} = require("../controllers/adminOrders.controller")
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");
const router = express.Router();


router.get(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  getOrder
);

router.get(
  "/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  listOrders
);


module.exports = router;