const mongoose = require("mongoose");
const { ValidationError } = require("../../../../utils/ApiError");

function validateCreateMarket(payload) {
  const fieldErrors = {};

  if (!payload.name || typeof payload.name !== "string") {
    fieldErrors.name = "Name is required and must be a string";
  }

  // if (!payload.address.address1 || typeof payload.address.address1 !== "string") {
  //   fieldErrors.address1 = "Address1 is required and must be a string";
  // }

  if (!payload.address.postalCode || typeof payload.address.postalCode !== "string") {
    fieldErrors.postalCode = "PostalCode is required and must be a string";
  }

  if (!payload.address.city || typeof payload.address.city !== "string") {
    fieldErrors.city = "City is required and must be a string";
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError(fieldErrors);
  }
}

module.exports = validateCreateMarket;