const ApiError = require("../../../../utils/ApiError");
const { normalizeSlug } = require("../../../../utils/normalize");
const { ProductCategory } = require("../../../../models/ProductCategory");
const mongoose = require("mongoose");


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
    throw new ApiError("Une catégorie avec ce nom existe déjà", 409);
  }

  const newCategory = await ProductCategory.create({
    ...data,
    slug,
  });

  return newCategory;
}


async function updateCategory(categoryId, payload) {
  const category = await ProductCategory.findById(categoryId);

  if (!category) {
    throw new ApiError("Catégorie introuvable.", 404);
  }

  // 1️⃣ Si le nom change → vérifier dépendances
  if (payload.name && payload.name !== category.name) {
    const familiesCount = await ProductFamily.countDocuments({
      category: category._id,
    });

    if (familiesCount > 0) {
      throw new ApiError(
        "Impossible de renommer une catégorie contenant des familles", 409
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

  if (
    payload.type &&
    payload.type.toString() !== category.type.toString()
  ) {
    throw new ApiError("Le type d’une catégorie ne peut pas être modifié", 409);
  }

  await category.save();
  return category;
}


async function deleteCategory(categoryId) {
  const category = await ProductCategory.findById(categoryId);

  if (!category) {
    throw new ApiError("Catégorie introuvable", 404);
  }

  const familiesCount = await ProductFamily.countDocuments({
    category: category._id,
  });

  if (familiesCount > 0) {
    throw new ApiError(
      "Impossible de supprimer une catégorie contenant des familles", 409
    );
  }

  await category.deleteOne();
}


async function getCategoryById(categoryId) {

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new ApiError("Id de catégorie invalide", 400);
  }

  const category = await ProductCategory.findById(categoryId)
    .populate({
      path: "type",
      select: "name"
    });

  if (!category) {
    throw new ApiError("Catégorie introuvable.", 409);
  }

  return category;
}


module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
