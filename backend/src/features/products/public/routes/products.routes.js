const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  importProducts,
} = require("../controllers/products.controller.js");

router.get("/", getProducts);
router.post("/", createProduct);
router.post("/import", importProducts);

module.exports = router;
