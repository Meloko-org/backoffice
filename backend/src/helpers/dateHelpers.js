function buildDateRangeFilter(filters, field) {
  const from = filters[`${field}From`];
  const to = filters[`${field}To`];

  if (!from && !to) return null;

  const dateFilter = {};

  if (from) {
    dateFilter.$gte = new Date(from);
  }

  if (to) {
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    dateFilter.$lte = toDate;
  }

  return dateFilter ;
}


module.exports = {
  buildDateRangeFilter,
}