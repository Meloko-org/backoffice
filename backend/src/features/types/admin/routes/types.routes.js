const express = require("express");
const router = express.Router();
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");


const { typeNames } = require("../controllers/types.controller")


router.get(
  "/names", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  typeNames
);

module.exports = router;