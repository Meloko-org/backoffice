const express = require("express");
const { 
  listOrders,
  getOrder
} = require("../controllers/adminOrders.controller")
const router = express.Router();


router.get("/:id", getOrder);
router.get("/", listOrders);


module.exports = router;