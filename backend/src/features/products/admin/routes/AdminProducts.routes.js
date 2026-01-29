const express = require("express");
const multer = require("multer");
const { importProductsCsv } = require("../controllers/adminProducts.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
    "/import-csv", 
    upload.single("file"),
    importProductsCsv
)

module.exports = router;
