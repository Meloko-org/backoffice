const mongoose = require("mongoose")

async function getStockIdsFromProduct(productId) {
  const stocks = await mongoose.model("Stock")
    .find({ product: productId })
    .select("_id")
    .lean();

  return stocks.map(s => s._id);
}


module.exports = getStockIdsFromProduct;