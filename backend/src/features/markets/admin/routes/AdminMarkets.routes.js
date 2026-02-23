const express = require("express");
const multer = require("multer");
const { importMarketsCsv, listMarkets, getPostalCodes } = require("../controllers/adminMarkets.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
    "/import-csv", 
    upload.single("file"),
    importMarketsCsv
)

router.get("/postal-codes", getPostalCodes)
router.get("/", listMarkets)

module.exports = router;