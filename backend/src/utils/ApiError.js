class ApiError extends Error {
  constructor(message, status = 500, fieldErrors = null) {
    super(message);        // appelle le constructeur de Error

    this.status = status;  // code HTTP
    this.fieldErrors = errors;
    this.isApiError = true;

    // Important pour que instanceof fonctionne correctement
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
