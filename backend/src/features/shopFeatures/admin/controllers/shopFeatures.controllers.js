const { getShopFeaturesNames } = require("../services/shopFeatures.services")

const shopFeaturesNames = async (req, res, next) => {
  try {
    const shopFeatures = await getShopFeaturesNames();

    console.log("features :", shopFeatures)

    res.json({
      success: true,
      data: shopFeatures,
    })
  } catch (error) {
    next(error);
  }
}


module.exports = {
  shopFeaturesNames,
}