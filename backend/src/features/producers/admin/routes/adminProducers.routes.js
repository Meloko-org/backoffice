const express = require("express");
const { listProducers, getProducer, update } = require("../controllers/adminProducers.controller");
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");
const router = express.Router();


router.get(
  "/:id",
  requireAuth,
  requireRole("admin", "super-admin"),
  getProducer
)

router.get(
  "/",
  requireAuth,
  requireRole("admin", "super-admin"),
  listProducers
)

router.put(
  "/:id",
  requireAuth,
  requireRole("admin", "super-admin"),
  update
)


module.exports = router;