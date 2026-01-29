const mongoose = require("mongoose");

const typeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
		slug: {
			type: String,
			required: true,
			index: true,
		},
    label: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Type = mongoose.model("Type", typeSchema, "types");
module.exports = Type;

