const express = require("express");
const router = express.Router();

const {
  listCategories,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} = require("../controllers/categories.controller");

router.get("/", listCategories);
router.post("/", createCategoryHandler);
router.put("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

module.exports = router;
