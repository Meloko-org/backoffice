const { getTypesNames } = require("../services/types.services")

const typeNames = async (req, res, next) => {
	try {
		const types = await getTypesNames();

		console.log(types)

		res.json({
			success: true,
			data: types,
		})

	} catch (error) {
		next(error);
	}
}

module.exports = {
	typeNames,
}