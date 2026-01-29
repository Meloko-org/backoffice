const { normalizeSlug } = require("../../../../utils/normalize");

function buildSlugs(data) {
	const nameSlug = normalizeSlug(data.name);
	const citySlug = normalizeSlug(data.city);

	return {
		...data,
		slug: `${citySlug}-${nameSlug}`
	}
}

module.exports = {
	buildSlugs,
}