const { 
  getUsers, 
  getUserById, 
  suspendUser, 
  reactivateUser,
  softDeleteUser,
  updateUserRoles,
  restoreUser,
} = require("../services/adminUsers.service");

const listUsers = async (req, res, next) => {
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

    const result = await getUsers({
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
};


const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getUserById(id);

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};


const suspend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const user = await suspendUser(id, reason);

    res.json({
      success: true,
      message: "User suspended",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


const reactivate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await reactivateUser(id);

    res.json({
      success: true,
      message: "User reactivated",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


const softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await softDeleteUser(id);

    res.json({
      success: true,
      message: "User soft deleted",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


const updateRoles = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { roles } = req.body;

    const user = await updateUserRoles(id, roles);

    res.json({
      success: true,
      message: "Roles updated",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


const restore = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await restoreUser(id);

    res.json({
      success: true,
      message: "User restored",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsers,
  getUser,
  suspend,
  reactivate,
  softDelete,
  updateRoles,
  restore,
};
