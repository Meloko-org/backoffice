const{ normalizeSlug } = require("../../../../utils/normalize");

function buildSlugs(data) {
	const categorySlug = normalizeSlug(data.category.name);
	const familySlug = categorySlug + "-" + normalizeSlug(data.family.name);
	const produtSlug = familySlug + "-" + normalizeSlug(data.product.name);

  return {
    category: {
      ...data.category,
      slug: categorySlug,
    },
    family: {
      ...data.family,
      slug: familySlug,
    },
    product: {
      ...data.product,
      slug: produtSlug,
    },
  };
}

module.exports = {
  buildSlugs,
};
