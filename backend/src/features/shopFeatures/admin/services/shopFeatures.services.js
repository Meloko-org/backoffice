const ShopFeatures = require("../../../../models/ShopFeatures");

async function getShopFeaturesNames() {
  return ShopFeatures.find({}, "label").sort({ label: 1}).lean()
}

module.exports = {
  getShopFeaturesNames,
}