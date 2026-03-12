const express = require("express");
const router = express.Router();
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");


const {
  listFamilies,
  createFamilyHandler,
  updateFamilyHandler,
  deleteFamilyHandler,
  familyNames,
  getFamily,
  familyNamesforCategory,
} = require("../controllers/families.controller");



router.get("/category/:id",
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  familyNamesforCategory
);

router.get(
  "/names", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  familyNames
);

router.get(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  getFamily
);

router.get(
  "/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  listFamilies
);

router.post(
  "/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  createFamilyHandler
);

router.put(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  updateFamilyHandler
);

router.delete(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
  deleteFamilyHandler
);

module.exports = router;
