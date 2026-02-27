const Role = require("../../../models/Role");
const { get } = require("../routes/roles.route");


async function getRoleNames() {
  return Role.find({}, "name").sort({ name: 1}).lean()
}


module.exports = {
  getRoleNames,
}