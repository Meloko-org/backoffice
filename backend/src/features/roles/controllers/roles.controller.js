const { getRoleNames } = require("../services/roles.service")

const roleNames = async (req, res, next) => {
  try {
    const roles = await getRoleNames();

    res.json({
      success: true,
      data: roles,
    })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  roleNames,
}