const parseCsv = require("../services/csvParser.service");
const importProducts = require("../services/productImport.service");

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


module.exports = { importProductsCsv };
