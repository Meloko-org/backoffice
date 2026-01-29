const express = require("express");
const multer = require("multer");
const { importMarketsCsv } = require("../controllers/adminMarkets.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
    "/import-csv", 
    upload.single("file"),
    importMarketsCsv
)

module.exports = router;