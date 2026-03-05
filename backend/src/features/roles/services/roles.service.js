const Role = require("../../../models/Role");


async function getRoleNames() {
  return Role.find({}, "name").sort({ name: 1}).lean()
}


module.exports = {
  getRoleNames,
}