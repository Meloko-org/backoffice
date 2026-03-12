const express = require("express");
const multer = require("multer");
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");
const { importMarketsCsv, listMarkets, getPostalCodes, createMarketHandler, updateMarketHandler, deleteMarketHandler, getMarket } = require("../controllers/adminMarkets.controller");


const upload = multer({ dest: "uploads/" });
const router = express.Router();



router.post(
	"/import-csv",
  requireAuth,
  requireRole("admin", "super-admin"),
	upload.single("file"),
	importMarketsCsv
);


router.get(
	"/postal-codes", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
	getPostalCodes
);

router.get(
	"/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
	getMarket
);

router.get(
	"/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
	listMarkets
);

router.post(
	"/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
	createMarketHandler
);

router.put(
	"/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
	updateMarketHandler
);

router.delete(
	"/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
	deleteMarketHandler
);

module.exports = router;