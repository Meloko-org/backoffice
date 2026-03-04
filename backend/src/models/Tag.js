const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TagCategory",
    },
  },
  { timestamps: true },
);

const Tag = mongoose.model("Tag", tagSchema, "tags");
module.exports = Tag;
