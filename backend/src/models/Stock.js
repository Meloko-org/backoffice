const mongoose = require("mongoose");

const stockSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    productCustomName: {
      type: String,
      required: false,
    },
    stockTotal: {
      type: Number,
      required: true,
    },
    stockReserved: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    pricePerKilo: {
      type: Number,
      required: false,
    },
    weightPerUnit: {
      type: String,
      required: false,
    },
    origin: {
      type: String,
      required: false,
    },
    format: {
      type: String,
      required: false,
    },
    portion: {
      type: String,
      required: false,
    },
    bestBeforeDate: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    isDeleted: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);


const collectionName = process.env.USE_FAKE_DB === "true"
  ? "fakestocks"
  : "stocks";


const Stock = mongoose.model("Stock", stockSchema, collectionName);
module.exports = Stock;
