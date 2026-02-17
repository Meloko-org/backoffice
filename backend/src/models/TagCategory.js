const mongoose = require("mongoose");

const tagCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true },
);

const TagCategory = mongoose.model("TagCategory", tagCategorySchema, "tagcategories");

module.exports = TagCategory;
