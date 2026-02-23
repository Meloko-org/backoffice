const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      default: null,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    latitude: {
      type: mongoose.Decimal128,
      required: false,
    },
    longitude: {
      type: mongoose.Decimal128,
      require: false,
    },
  },
  { timestamps: true },
);

// addressSchema.set("toJSON", {
//   transform: (_, ret) => {
//     if (ret.latitude) {
//       ret.latitude = parseFloat(ret.latitude.toString());
//     }
//     if (ret.longitude) {
//       ret.longitude = parseFloat(ret.longitude.toString());
//     }
//     return ret;
//   },
// });

module.exports = addressSchema;
