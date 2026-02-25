const mongoose = require("mongoose")
const { ValidationError } = require("../../../../utils/ApiError");

function validateCreateProduct(payload) {
  const fieldErrors = {};

  // ----- name -----
  if (!payload.name || typeof payload.name !== "string") {
    fieldErrors.name = "Name is required and must be a string";
  }


  const ALLOWED_VAT_RATES = [5.5, 10, 20];

  // ----- vatRate -----
  if (
    payload.vatRate === undefined ||
    typeof payload.vatRate !== "number" ||
    !ALLOWED_VAT_RATES.includes(payload.vatRate)
  ) {
    fieldErrors.vatRate =
      "vatRate must be one of: 5.5, 10, 20";
  }


  // ----- weight -----
  if (!payload.weight || typeof payload.weight !== "object") {
    fieldErrors.weight = "Weight is required";
  } else {
    if (!["gr", "piece"].includes(payload.weight.unit)) {
      fieldErrors["weight.unit"] =
        "Weight unit must be 'gr' or 'piece'";
    }

    if (
      typeof payload.weight.measurement !== "number" ||
      payload.weight.measurement <= 0
    ) {
      fieldErrors["weight.measurement"] =
        "Weight measurement must be a positive number";
    }
  }

  // ----- family  -----
  if (!payload.family) {
    fieldErrors.family = "Family is required";
  } else if (!mongoose.Types.ObjectId.isValid(payload.family)) {
    fieldErrors.family = "Family must be a valid ObjectId";
  }

  // ----- description -----
  if (
    payload.description !== undefined &&
    typeof payload.description !== "string"
  ) {
    fieldErrors.description = "Description must be a string";
  }

  // ----- image -----
  if (
    payload.image !== null &&
    payload.image !== undefined &&
    typeof payload.image !== "string"
  ) {
    fieldErrors.image = "Image must be a string";
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError(fieldErrors);
  }
}


module.exports = validateCreateProduct;