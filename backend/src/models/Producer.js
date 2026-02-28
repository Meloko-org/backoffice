const mongoose = require("mongoose");
const addressSchema = require("./Address");

const producerSchema = mongoose.Schema(
  {
    socialReason: {
      type: String,
      required: false,
    },
    siren: {
      type: String,
      required: false,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    iban: {
      type: String,
      required: false,
      length: 34,
    },
    bic: {
      type: String,
      required: false,
      length: 11,
    },
    address: {
      type: addressSchema,
      required: false,
    },
    onboardingStep: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);


const collectionName= process.env.USE_FAKE_DB === "true"
  ? "fakeproducers"
  : "producer";


const Producer = mongoose.model("Producer", producerSchema, collectionName);
module.exports = Producer;
