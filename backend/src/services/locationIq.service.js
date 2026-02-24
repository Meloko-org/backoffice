const { GeolocationError } = require('../utils/ApiError');
const token = process.env.LOCATIONIQ_KEY

const locationIqCoordinates = async (query) => {
	const queryEncoded = encodeURIComponent(query);
	const url = `https://us1.locationiq.com/v1/search?key=${token}&q=${queryEncoded}&format=json&limit=1`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new GeolocationError(
			"Service de géolocalisation indisponible",
			{ status: response.status }
		);
	}

	const data = await response.json();

	if (data.error) {
		throw new GeolocationError(data.error, query)
	}

	if (!Array.isArray(data) || data.length === 0) {
    throw new GeolocationError("Aucune coordonnée trouvée", query);
  }

	return {
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
    confidence: data[0].importance ?? null,
    source: "locationiq",
  };

}

module.exports = {
	locationIqCoordinates,
}