const express = require("express");
const { roleNames } = require("../controllers/roles.controller");
const requireAuth = require("../../../middlewares/requireAuth");
const requireRole = require("../../../middlewares/requireRole");

const router = express.Router();


router.get(
  "/names", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  roleNames
);



module.exports = router;