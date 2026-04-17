const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    note: {
      type: mongoose.Decimal128,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    comment: {
      type: String,
    },
    source: {
      type: String,
      enum: ["purchase", "touristVisit"],
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true },
);

const collectionName = process.env.USE_FAKE_DB === "true"
  ? "fakenotes"
  : "notes"

const Note = mongoose.model("Note", noteSchema, collectionName);
module.exports = Note;
