const mongoose = require("mongoose");
const { ValidationError } = require("../../../../utils/ApiError");

function validateUpdateMarket(payload) {
  const fieldErrors = {};

  if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim() === "") {
      fieldErrors.name = "Name must be a non-empty string";
    }
  }

  // if (payload.address.address1 !== undefined) {
  //   if (typeof payload.address.address1 !== "string" || payload.address.address1.trim() === "") {
  //     fieldErrors.address1 = "Address1 must be a non-empty string";
  //   }
  // }

  if (payload.address.postalCode !== undefined) {
    if (typeof payload.address.postalCode !== "string" || payload.address.postalCode.trim() === "") {
      fieldErrors.postalCode = "PostalCode must be a non-empty string";
    }
  }

  if (payload.address.city !== undefined) {
    if (typeof payload.address.city !== "string" || payload.address.city.trim() === "") {
      fieldErrors.city = "City must be a non-empty string";
    }
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
    payload.image !== undefined &&
    typeof payload.image !== "string"
  ) {
    fieldErrors.image = "Image must be a string";
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError(fieldErrors);
  }
}

module.exports = validateUpdateMarket;