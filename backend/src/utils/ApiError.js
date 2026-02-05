class ApiError extends Error {
  constructor(message, status = 500, errors = null) {
    super(message);        // appelle le constructeur de Error

    this.status = status;  // code HTTP
    this.isApiError = true;

    // Important pour que instanceof fonctionne correctement
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
