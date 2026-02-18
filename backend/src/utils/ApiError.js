class ApiError extends Error {
  constructor(message, status = 500, fieldErrors = null) {
    super(message);        // appelle le constructeur de Error

    this.status = status;  // code HTTP
    this.fieldErrors = fieldErrors;
    this.isApiError = true;

    // Important pour que instanceof fonctionne correctement
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Ressource introuvable") {
    super(message, 404);
  }
}

class ValidationError extends ApiError {
  constructor(fieldErrors) {
    super("Validation failed", 400, fieldErrors);
  }
}



module.exports = {
  ApiError,
  NotFoundError,
  ValidationError,
};
