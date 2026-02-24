const parseCsv = require('../../../../services/csvParser.service');
const { ValidationError } = require('../../../../utils/ApiError');
const validateCreateMarket = require('../domain/validateCreateMarket');
const validateUpdateMarket = require('../domain/validateUpdateMarket');
const { getMarkets, getDistinctPostalCodes, createMarket, updateMarket, deleteMarket, getMarketById } = require('../services/adminMarkets.service');
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

  console.log("query params: ", req.query)
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sortKey = "createdAt",
      sortDirection = "desc",
      ...filters
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
      filters
    });

    console.log(JSON.stringify(result.items[0], null, 2))

    res.json({
      success: true,
      data: result,
    });
    
  } catch (error) {
    next(error);
  }
};


const createMarketHandler = async (req, res, next) => {
  try {
    validateCreateMarket(req.body);

    const result = await createMarket(req.body);

    console.log("result :", result)

    res.status(201).json({
      success: true,
      data: result.market,
      warnings: result.warnings ?? []
    })

  } catch (error) {
    next(error)
  }
}

const updateMarketHandler = async (req, res, next) => {
  try {
    validateUpdateMarket(req.body);

    const market = await updateMarket(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: market,
    })

  } catch (error) {
    next(error)
  }
}

const deleteMarketHandler = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ValidationError("Id manquant.")
    }

    await deleteMarket(req.params.id);

    res.json({
      success: true,
      message: "Market supprimé."
    })
  } catch (error) {
    next(error)
  }
}

const getMarket = async (req, res, next) => {
  try {
    const marketId = req.params.id;

    const market = await getMarketById(marketId);

    console.log(market)

    res.json({
      success: true,
      data: market,
    })

  } catch (error) {
    next(error)
  }
}

const getPostalCodes = async (req, res, next) => {
  try {
    const postalCodes = await getDistinctPostalCodes();

    res.json({
      success: true,
      data: postalCodes.sort()
    })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  importMarketsCsv,
  listMarkets,
  createMarketHandler,
  updateMarketHandler,
  deleteMarketHandler,
  getMarket,
  getPostalCodes,
}