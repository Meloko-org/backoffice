const parseCsv = require('../../../../services/csvParser.service');
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


module.exports = {
    importMarketsCsv
}