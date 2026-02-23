const Market = require("../../../../models/Market");

async function getMarkets({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  filters = {}
}) {

  const skip = (page - 1) * limit;

  const filter = {};

  // 🔎 SEARCH
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i", // insensible à la casse
    };
  }

  if (filters.postalCode) {
    filter["address.postalCode"] = filters.postalCode;
  }


  // 🔀 SORT
  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  const [items, totalItems] = await Promise.all([
    Market.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Market.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}


async function getDistinctPostalCodes() {
  return Market.distinct("address.postalCode");
}

module.exports = {
  getMarkets,
  getDistinctPostalCodes,
}