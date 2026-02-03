const Type = require('../../../../models/Type'); 

async function getTypesNames() {
	return Type.find({}, "name").sort({ name: 1 }).lean();
}

module.exports = {
	getTypesNames,
}