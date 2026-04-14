const { 
  getShops,
  getShopById,
  updateShop,
  getFormShop,
  getShopDashboard,
  getShopOrders,
  getShopNotes,
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

/* fonction du dashboard */
const shopDashboard = async (req, res , next) => {
  try {
    const { id } = req.params;

    const data = await getShopDashboard(id);

    console.log("SHOPDASHBOARD data :", JSON.stringify(data, null, 2))

    res.json({
      success: true,
      data,
    })

  } catch (error) {
    next(error);
  }
}

const shopOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      limit = 10,
      search,
      sortKey,
      sortDirection,
      ...filters
    } = req.query;

    const data = await getShopOrders(
      id,
      Number(page),
      Number(limit),
      search,
      sortKey,
      sortDirection,
      filters
    );

    console.log("SHOPORDER data :", JSON.stringify(data, null, 2))

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

const shopNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      limit = 10,
      search,
      sortKey,
      sortDirection,
      ...filters
    } = req.query;

    const data = await getShopNotes(
      id,
      Number(page),
      Number(limit),
      search,
      sortKey,
      sortDirection,
      filters
    );

    console.log("SHOPNOTE data :", JSON.stringify(data, null, 2))

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listShops,
  getShop,
  update,
  formShop,
  shopDashboard,
  shopNotes,
  shopOrders,
}