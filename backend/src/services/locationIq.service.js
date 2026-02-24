const { GeolocationServiceError, GeolocationNotFoundError } = require('../utils/ApiError');
const token = process.env.LOCATIONIQ_KEY

const locationIqCoordinates = async (query) => {
  const queryEncoded = encodeURIComponent(query);
  const url = `https://us1.locationiq.com/v1/search?key=${token}&q=${queryEncoded}&format=json&limit=1`;

  let response;

  try {
    response = await fetch(url);
  } catch (err) {
    // ❌ erreur réseau
    throw new GeolocationServiceError(
      "Service de géolocalisation injoignable",
      { originalError: err.message }
    );
  }

	switch (response.status) {
		case 404:
			throw new GeolocationNotFoundError(query);

		case 429:
			throw new GeolocationServiceError("Limite de requêtes atteinte", { status: 429 });

		case 401:
		case 403:
			throw new GeolocationServiceError("Clé API invalide ou accès restreint", { status: response.status });

		case 500:
			throw new GeolocationServiceError("Erreur serveur LocationIQ", { status: 500 });
	}


  if (!response.ok) {
    throw new GeolocationServiceError(
      "Service de géolocalisation indisponible",
      { status: response.status }
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new GeolocationServiceError(data.error, { query });
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new GeolocationNotFoundError(query);
  }

  return {
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
    confidence: data[0].importance ?? null,
    source: "locationiq",
  };
};


module.exports = {
	locationIqCoordinates,
}