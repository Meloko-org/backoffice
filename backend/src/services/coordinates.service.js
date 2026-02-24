const { GeolocationServiceError } = require("../utils/ApiError");
const { normalizeStreet } = require("../utils/normalize");
const { locationIqCoordinates } = require("./locationIq.service");


const getCoordinates = async ({ name, address, type }) => {

  if (!type) {
    throw new GeolocationServiceError(
      "Type de géolocalisation non défini.", `type:${type}`
    )
  }

  let query;

  if (type === "poi") {
    if (!name || !address) {
      throw new GeolocationServiceError(
        "Informations insuffisantes pour géolocaliser un POI",
        `name:${name}, city:${address?.city}`
      );
    }

    query = [name, address.postalCode, address.city]
      .filter(Boolean)
      .join(" ");
  }

  if (type === "address") {
    const { address1, postalCode, city } = address || {};
    if (!address1 ||!city) {
      throw new GeolocationServiceError(
        "Adresse incomplète pour géolocalisation",
        `address1:${address1}, city:${city}`
      )
    }

    query = [ address1, postalCode, city]
      .filter(Boolean)
      .join(" ");
  }


  return locationIqCoordinates(query);

};



module.exports = {
	getCoordinates,
}