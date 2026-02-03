const express = require("express");
const router = express.Router();

const {
  listCategories,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategory,
} = require("../controllers/categories.controller");

router.get("/:id", getCategory);
router.get("/", listCategories);
router.post("/", createCategoryHandler);
router.put("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

module.exports = router;
