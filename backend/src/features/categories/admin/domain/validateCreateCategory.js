const mongoose = require("mongoose");
const Type = require("../../../../models/Type"); 
const { ValidationError } = require("../../../../utils/ApiError");

async function validateCreateCategory(payload) {
  const fieldErrors = {};

  // ----- name -----
  if (!payload.name || typeof payload.name !== "string" || payload.name.trim().length < 2) {
    fieldErrors.name = "Name is required and must be at least 2 characters";
  }

  // ----- type -----
  if (!payload.type) {
    fieldErrors.type = "Type is required";
  } else if (!mongoose.Types.ObjectId.isValid(payload.type)) {
    fieldErrors.type = "Type must be a valid ObjectId";
  } else {
    const existingType = await Type.findById(payload.type);
    if (!existingType) {
      fieldErrors.type = "This type does not exist";
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

module.exports =  validateCreateCategory;
