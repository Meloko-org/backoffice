const getCoordinates = async (address) => {
  const query = (
    address.address1 +
    "%20" +
    address.postalCode +
    "%20" +
    address.city
  ).replaceAll(" ", "%20");
	
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${query}`,
  );

  const data = await response.json();

  const coordinates = {
    latitude: data.features[0].geometry.coordinates[1],
    longitude: data.features[0].geometry.coordinates[0],
  };

  return coordinates;
};


module.exports = {
	getCoordinates,
}