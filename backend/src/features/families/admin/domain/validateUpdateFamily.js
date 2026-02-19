const mongoose = require("mongoose");
const { ValidationError } = require("../../../../utils/ApiError");


function validateUpdateFamily(payload) {
  const fieldErrors = {};
  const allowed = ["classic", "bulk", "both"];

  // ----- name -----
  if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      fieldErrors.name = "Name must be at least 2 characters";
    }
  }

  // ----- category -----
  if (payload.category !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(payload.category)) {
      fieldErrors.category = "Category must be a valid ObjectId";
    }
  }

  // ----- productsTypes -----
  if (payload.productsTypes !== undefined) {
    if (
      !Array.isArray(payload.productsTypes) ||
      payload.productsTypes.length === 0 ||
      payload.productsTypes.some((type) => !allowed.includes(type))
    ) {
      fieldErrors.productsTypes = "productsTypes must be an array of: classic, bulk, both";
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

  // ----- tagCategories -----
  if (payload.tagCategories !== undefined) {
    if (!Array.isArray(payload.tagCategories)) {
      fieldErrors.tagCategories = "tagCategories must be an array";
    } else if (
      payload.tagCategories.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      fieldErrors.tagCategories = "Each tagCategory must be a valid ObjectId";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError(fieldErrors);
  }
}

module.exports = validateUpdateFamily;
