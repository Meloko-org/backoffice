const mongoose = require("mongoose");

const shopFeaturesSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const collectionName = process.env.USE_FAKE_DB === "true"
  ? "fakeshopfeatures"
  : "shopfeatures"

const ShopFeatures = mongoose.model("ShopFeatures", shopFeaturesSchema, collectionName);
module.exports = ShopFeatures;
