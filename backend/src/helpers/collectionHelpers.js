const mongoose = require("mongoose")
const getCollection = require("../utils/collectionName");

/* permet de récupérer la bonne instance de la collection en fonction
  du nom de la collection
*/

const getCollectionInstance = (name) => {
  return mongoose.connection.collection(getCollection(name));
};

module.exports = getCollectionInstance;