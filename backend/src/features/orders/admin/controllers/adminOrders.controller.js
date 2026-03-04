const { getOrders, getOrderById } = require("../services/adminOrders.service");

const listOrders = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sortKey = "createdAt",
      sortDirection = "desc",
      ...filters
    } = req.query;

    console.log(filters)

    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 20));

    const result = await getOrders({
      page: pageNumber,
      limit: limitNumber,
      search,
      sortKey,
      sortDirection,
      filters,
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


const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await getOrderById(id);

    res.json({
      success: true,
      data: order,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  listOrders,
  getOrder,
};
