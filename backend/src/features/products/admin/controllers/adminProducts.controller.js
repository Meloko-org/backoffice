const parseCsv = require("../services/csvParser.service");
const { importProducts, createProduct, updateProduct, deleteProduct } = require("../services/productImport.service");
const { getProducts, getProductById } = require("../services/adminProducts.service");
const { ValidationError } = require("../../../../utils/ApiError");
const validateCreateProduct = require("../domain/validateCreateProduct");
const validateUpdateProduct = require("../domain/validateUpdateProduct");

const importProductsCsv = async (req, res) => {
  console.log("📥 Requête import reçue");
  console.log("👉 query:", req.query);
  console.log("👉 file:", req.file?.originalname);
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier fourni" });
  }

  const dryRun = req.query.dryRun !== "false";
  const mode = req.query.mode === "permissive" ? "permissive" : "strict";

  try {
    const rows = await parseCsv(req.file.path);
    const report = await importProducts(rows, { dryRun, mode });

    console.dir(report, { depth: null });

    res.json(report);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur import CSV" });
  }
};


const listProducts = async (req, res, next) => {
  console.log("INSIDE PRODUCTS CONTROLLER");
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sortKey = "createdAt",
      sortDirection = "desc",
      family,
    } = req.query;

    /* garantir que page et limit sont bien des number */
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 20));


    const result = await getProducts({
      page: Number(pageNumber),
      limit: Number(limitNumber),
      search,
      sortKey,
      sortDirection,
      family,
    });

    console.log(result)

    res.json({
      success: true,
      data: result,
    });
    
  } catch (error) {
    next(error);
  }
};

const createProductHandler = async (req, res, next) => {
  try {
    validateCreateProduct(req.body);

    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });

  } catch (error) {
    next(error);
  }
};

const updateProductHandler = async (req, res, next) => {
  try {

    validateUpdateProduct(req.body);

    const product = await updateProduct(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductHandler = async (req, res, next) => {
  try {

    if (!req.params.id) {
      throw new ValidationError("Id manquant.")
    }

    await deleteProduct(req.params.id);

    res.json({
      success: true,
      message: "Produit supprimé",
    });

  } catch (error) {
    next(error);
  }
};


const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await getProductById(productId);

    res.json({
      success: true,
      data: product,
    })

  } catch (error) {
    next(error)
  }
}



module.exports = { 
  importProductsCsv,
  listProducts,
  createProductHandler, 
  updateProductHandler,
  deleteProductHandler,
  getProduct,
};
