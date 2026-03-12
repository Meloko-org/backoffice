const express = require("express");
const router = express.Router();
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");

const {
  listCategories,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategory,
  categoryNames,
} = require("../controllers/categories.controller");



router.get(
  "/names", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  categoryNames
);

router.get(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  getCategory
);

router.get(
  "/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  listCategories
);

router.post(
  "/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  createCategoryHandler
);

router.put(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  updateCategoryHandler
);

router.delete(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  deleteCategoryHandler
);

module.exports = router;
