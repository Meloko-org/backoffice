const mongoose = require("mongoose");
const Order = require("../../../../models/Order");
const { ValidationError, NotFoundError } = require("../../../../utils/ApiError");
const { buildDateRangeFilter } = require("../../../../helpers/dateHelpers");


async function getOrders({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  filters = {},
}) {

  const skip = (page - 1) * limit;

  const filter = {};

  // 🔎 SEARCH (orderNumber)
  if (search) {
    filter.$or = [
      { orderNumber: { $regex: search, $options: "i", }},
      { firstname: { $regex: search, $options: "i", }},
      { lastname: { $regex: search, $options: "i", }}
    ];
  }

  // 🎛 FILTERS
  if (filters.userId && mongoose.Types.ObjectId.isValid(filters.userId)) {
    filter.user = new mongoose.Types.ObjectId(filters.userId);
  }

  if (filters.isPaid !== undefined) {
    filter.isPaid = filters.isPaid === "true";
  }

  if (filters.isWithdrawn !== undefined) {
    filter.isWithdrawn = filters.isWithdrawn === "true";
  }

  if (filters.paidAtFrom || filters.paidAtTo) {
    const paidAtFilter =  buildDateRangeFilter(filters, "paidAt")

    filter.paidAt = paidAtFilter
  }




  // 🔀 SORT
  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  const [items, totalItems] = await Promise.all([
    Order.find(filter)
      .populate("user", "email firstname lastname")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Order.countDocuments(filter),
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


async function getOrderById(orderId) {

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ValidationError("Invalid order id");
  }

  const order = await Order.findById(orderId)
    .populate("user", "email firstname lastname")
    .populate("details.shop")
    .populate("details.market")
    .populate("details.invoice")
    .populate("details.creditNotes")
    .lean();

  if (!order) {
    throw new NotFoundError("Order introuvable.");
  }

  return order;
}


module.exports = {
  getOrders,
  getOrderById,
};
