const express = require("express");
const router = express.Router();
const requireAuth = require("../../../middlewares/requireAuth");
const requireRole = require("../../../middlewares/requireRole");
const { dashboard } = require("../controllers/dashboard.controller");

router.get(
  "/",
  requireAuth,
  requireRole("super-admin", "admin" ,"dev", "support"),
  dashboard
)


module.exports = router;