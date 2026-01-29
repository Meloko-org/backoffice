const mongoose = require("mongoose");

const weightSchema = mongoose.Schema({
  unit: {
    type: String,
    enum: ["gr", "piece"],
    required: true,
  },
  measurement: {
    type: Number,
    required: true,
  },
});

const Weight = mongoose.model("Weight", weightSchema, "weights");

module.export = Weight;
