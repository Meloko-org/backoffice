const parseCsv = require('../../../../services/csvParser.service');
const { getMarkets } = require('../services/adminMarkets.service');
const importMarkets = require("../services/marketImport.service");

const importMarketsCsv = async (req, res) => {
  
	if (!req.file) {
		return res.status(400).json({ message: "Aucun fichier fourni" });
	}

	const dryRun = req.query.dryRun !== "false";
	const mode = req.query.mode === "permissive" ? "permissive" : "strict";


	try {
		const rows = await parseCsv(req.file.path);
		const report = await importMarkets(rows, { dryRun, mode });

		console.dir(report, { depth: null });

    res.json(report);

	} catch (error) {
		console.error(error);
    res.status(500).json({ message: "Erreur import CSV" });
	}
}


const listMarkets = async (req, res, next) => {
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


    const result = await getMarkets({
      page: Number(pageNumber),
      limit: Number(limitNumber),
      search,
      sortKey,
      sortDirection,
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


module.exports = {
    importMarketsCsv,
		listMarkets,
}