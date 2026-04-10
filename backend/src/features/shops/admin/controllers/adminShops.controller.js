const { 
  getShops,
  getShopById,
  updateShop,
  getFormShop,
} = require("../services/adminShops.service");

const listShops = async (req, res, next) => {
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

    const result = await getShops({
      page: pageNumber,
      limit: limitNumber,
      search,
      sortKey,
      sortDirection,
      filters,
    });

    // console.log(JSON.stringify(result.items[0], null ,2))

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
}


const getShop = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getShopById(id);

    console.log(JSON.stringify(result, null, 2))

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
}

const formShop = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getFormShop(id);

    console.log(result)

    res.json({
      success: true,
      data: result,
    })

  } catch (error) {
    next(error);
  }
}


const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("body :", req.body)

    const user = await updateShop(id, req.body, req.user);

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  listShops,
  getShop,
  update,
  formShop,
}