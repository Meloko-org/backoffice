const ProductFamily = require("../../../../models/ProductFamily");
const ProductCategory = require("../../../../models/ProductCategory");
const { normalizeSlug } = require("../../../../utils/normalize");
const { default: mongoose } = require("mongoose");
const ApiError = require("../../../../utils/ApiError");



/**
 * LIST families (pagination + filtre catégorie)
 */
async function getFamilies({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  category,
}) {

  
  const skip = (page - 1) * limit;

  const filter = {};

  // 🔎 SEARCH
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i", // insensible à la casse
    };
  }

  if (category) {
    filter.category = category;
  }

  

  // 🔀 SORT
  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  const [items, totalItems] = await Promise.all([
    ProductFamily.find(filter)
      .populate([
        {
          path: "category",
          select: "name slug"
        }, 
        {
          path: "tagCategories",
          model: "TagCategory",
          select: "name color",
        },
      ])
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    ProductFamily.countDocuments(filter),
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

/**
 * CREATE family
 */
async function createFamily(data) {
  const {
    name,
    category,
    productsTypes = ["classic"],
    description,
    image,
    tagCategories,
  } = data;

  if (!name || !category) {
    throw new Error("Nom et catégorie sont obligatoires");
  }

  const parentCategory = await ProductCategory.findById(category);
  if (!parentCategory) {
    throw new Error("Catégorie parente introuvable");
  }

  const slug = normalizeSlug(name, { prefix: parentCategory.slug});

  const existing = await ProductFamily.findOne({ slug });
  if (existing) {
    throw new Error("Une famille avec ce nom existe déjà dans cette catégorie");
  }

  return ProductFamily.create({
    name,
    slug,
    description,
    image,
    productsTypes,
    category,
    tagCategories,
  });
}

async function updateFamily(familyId, payload) {
  const family = await ProductFamily.findById(familyId).populate("category");

  if (!family) {
    throw new Error("Famille introuvable");
  }

  // 1️⃣ Rename → vérifier produits
  if (payload.name && payload.name !== family.name) {
    const productsCount = await Product.countDocuments({
      family: family._id,
    });

    if (productsCount > 0) {
      throw new Error(
        "Impossible de renommer une famille contenant des produits"
      );
    }

    family.name = payload.name;
    family.slug = normalizeSlug(payload.name, { prefix: family.category.slug });
  }

  // 2️⃣ Champs simples
  if (payload.description !== undefined) {
    family.description = payload.description;
  }

  if (payload.image !== undefined) {
    family.image = payload.image;
  }

  if (payload.productsTypes !== undefined) {
    family.productsTypes = payload.productsTypes;
  }

  if (payload.tagCategories !== undefined) {
    family.tagCategories = payload.tagCategories;
  }

  await family.save();
  return family;
}

async function deleteFamily(familyId) {
  const family = await ProductFamily.findById(familyId);

  if (!family) {
    throw new Error("Famille introuvable");
  }

  const productsCount = await Product.countDocuments({
    family: family._id,
  });

  if (productsCount > 0) {
    throw new Error(
      "Impossible de supprimer une famille contenant des produits"
    );
  }

  await family.deleteOne();
}

async function getFamilyById(familyId) {
  if (!mongoose.Types.ObjectId.isValid(familyId)) {
    throw new ApiError("Id de la famille invalide", 400)
  }

  const family = await ProductFamily.findById(familyId)
    .populate([
      {
        path: "category",
        select: "name",
      },
      {
        path: "tagCategories",
        model: "TagCategory",
        select: "name color",
      },
    ])

    if (!family) {
      throw new ApiError("Famille introuvable.", 409)
    }

    return family;
}

async function getFamilyNames() {
  return ProductFamily.find({}, "name").sort({ name: 1}).lean();
}



module.exports = {
  getFamilies,
  createFamily,
  updateFamily,
  deleteFamily,
  getFamilyById,
  getFamilyNames,
};
