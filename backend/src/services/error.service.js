function geoError(message, reason) {
  const error = new Error(message);
  error.details = [reason];
  return error;
}


module.exports = {
  geoError,
}