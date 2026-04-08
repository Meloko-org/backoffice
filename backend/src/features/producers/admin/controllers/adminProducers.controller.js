const {
  getProducers,
  getProducerById,
  updateProducer,

} = require("../services/adminProducers.service")

const listProducers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sortKey = "createdAt",
      sortDirection = "desc",
      ...filters
    } = req.query;

    // sécurisation pagination
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 20));

    const result = await getProducers({
      page: pageNumber,
      limit: limitNumber,
      search,
      sortKey,
      sortDirection,
      filters,
    });

    // console.log(JSON.stringify(result.items, null ,2))

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
}


const getProducer = async (req,res, next) => {
  console.log("youpi")
  try {
    const { id } = req.params;

    const result = await getProducerById(id);

    console.log(JSON.stringify(result, null, 2))

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("body :", req.body)

    const user = await updateProducer(id, req.body);

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  listProducers,
  getProducer,
  update,
}