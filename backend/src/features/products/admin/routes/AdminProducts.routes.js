const express = require("express");
const multer = require("multer");
const { importProductsCsv, listProducts, createProductHandler, updateProductHandler, deleteProductHandler } = require("../controllers/adminProducts.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
    "/import-csv", 
    upload.single("file"),
    importProductsCsv
)

router.get("/", listProducts);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

module.exports = router;
