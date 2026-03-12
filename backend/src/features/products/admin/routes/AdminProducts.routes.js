const express = require("express");
const multer = require("multer");
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");

const { 
	importProductsCsv, 
	listProducts, 
	createProductHandler, 
	updateProductHandler, 
	deleteProductHandler,
	getProduct } = require("../controllers/adminProducts.controller");


const upload = multer({ dest: "uploads/" });
const router = express.Router();


router.post(
	"/import-csv", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
	upload.single("file"),
	importProductsCsv
)

router.get(
	"/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
	getProduct
)

router.get(
	"/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
	listProducts
);

router.post(
	"/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
	createProductHandler
);

router.put(
	"/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
	updateProductHandler
);

router.delete(
	"/:id", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"), 
	deleteProductHandler
);

module.exports = router;
