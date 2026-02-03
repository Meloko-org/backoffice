const { normalizeSlug } = require("../../../../utils/normalize");
const { ProductCategory } = require("../../../../models/ProductCategory");

async function getCategories({
  page = 1,
  limit = 20,
  sort = "createdAt",
  order = "desc",
}) {
  const skip = (page - 1) * limit;
  const sortOrder = order === "asc" ? 1 : -1;

  const [items, totalItems] = await Promise.all([
    ProductCategory.find()
      .populate({
        path: "type",
        select: "name"
      })
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(),

    ProductCategory.countDocuments(),
  ]);


  return {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}

async function createCategory(data) {
  const slug = normalizeSlug(data.name);

  const existing = await ProductCategory.findOne({ slug });
  if (existing) {
    throw new Error("Une catégorie avec ce nom existe déjà");
  }

  return ProductCategory.create({
    ...data,
    slug,
  });
}

async function updateCategory(categoryId, payload) {
  const category = await ProductCategory.findById(categoryId);

  if (!category) {
    throw new Error("Catégorie introuvable");
  }

  // 1️⃣ Si le nom change → vérifier dépendances
  if (payload.name && payload.name !== category.name) {
    const familiesCount = await ProductFamily.countDocuments({
      category: category._id,
    });

    if (familiesCount > 0) {
      throw new Error(
        "Impossible de renommer une catégorie contenant des familles"
      );
    }

    category.name = payload.name;
    category.slug = normalizeSlug(payload.name);
  }

  // 2️⃣ Champs simples
  if (payload.description !== undefined) {
    category.description = payload.description;
  }

  if (payload.image !== undefined) {
    category.image = payload.image;
  }

  await category.save();
  return category;
}

async function deleteCategory(categoryId) {
  const category = await ProductCategory.findById(categoryId);

  if (!category) {
    throw new Error("Catégorie introuvable");
  }

  const familiesCount = await ProductFamily.countDocuments({
    category: category._id,
  });

  if (familiesCount > 0) {
    throw new Error(
      "Impossible de supprimer une catégorie contenant des familles"
    );
  }

  await category.deleteOne();
}



module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
