const express = require("express");
const multer = require("multer");
const { importMarketsCsv, listMarkets } = require("../controllers/adminMarkets.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
    "/import-csv", 
    upload.single("file"),
    importMarketsCsv
)

router.get("/", listMarkets)

module.exports = router;