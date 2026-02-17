const TagCategory = require("../../../../models/TagCategory");

async function getTagCategoryNames() {
  return TagCategory.find({}).sort({ name: 1}).lean();
}

module.exports = {
  getTagCategoryNames,
}