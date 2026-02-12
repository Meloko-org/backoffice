const Type = require('../../../../models/Type'); 

async function getTypeNames() {
	return Type.find({}, "name").sort({ name: 1 }).lean();
}

module.exports = {
	getTypeNames,
}