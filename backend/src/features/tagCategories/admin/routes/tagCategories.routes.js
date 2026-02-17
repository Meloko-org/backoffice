const express = require("express");
const router = express.Router();

const { tagCategoryNames } = require("../controllers/tagCategories.controller");

router.get("/names", tagCategoryNames);

module.exports = router;