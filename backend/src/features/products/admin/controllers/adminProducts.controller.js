const parseCsv = require("../services/csvParser.service");
const { importProducts, getProducts, createProduct, updateProduct, deleteProduct } = require("../services/productImport.service");
const { validateProductPayload } = require("../domain/validateProductPayload");  

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
  try {
    const {
      page = 1,
      limit = 20,
      family,
    } = req.query;

    const result = await getProducts({
      page: Number(page),
      limit: Number(limit),
      familyId: family,
    });

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
    const errors = validateProductPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }
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

    const errors = validateProductPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }

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
    await deleteProduct(req.params.id);

    res.json({
      success: true,
      message: "Produit supprimé",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { 
  importProductsCsv,
  listProducts,
  createProductHandler, 
  updateProductHandler,
  deleteProductHandler,
};
