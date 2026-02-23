const express = require("express");
const multer = require("multer");
const { importMarketsCsv, listMarkets, getPostalCodes, createMarketHandler, updateMarketHandler, deleteMarketHandler, getMarket } = require("../controllers/adminMarkets.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
    "/import-csv", 
    upload.single("file"),
    importMarketsCsv
)


router.get("/postal-codes", getPostalCodes)
router.get("/:id", getMarket)
router.get("/", listMarkets)
router.post("/", createMarketHandler)
router.put("/:id", updateMarketHandler)
router.delete("/:id", deleteMarketHandler)

module.exports = router;