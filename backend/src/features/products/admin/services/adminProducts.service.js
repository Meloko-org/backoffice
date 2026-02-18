const Product = require("../../../../models/Product");
const ProductFamily = require("../../../../models/ProductFamily");
const ProductCategory = require("../../../../models/ProductCategory");
const { normalizeSlug } = require("../../../../utils/normalize");

async function getProducts({
  page = 1,
  limit = 20,
  search,
  sortKey = "createdAt",
  sortDirection = "desc",
  family,
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

  if (family) {
    filter.family = family;
  }

  // 🔀 SORT
  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  };

  const [items, totalItems] = await Promise.all([
    Product.find(filter)
      .populate({
        path: "family",
        model: "ProductFamily",
        populate: {
          path: "category",
          model: "ProductCategory",
          select: "name slug",
        },
        select: "name slug",
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Product.countDocuments(filter),
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

async function createProduct(data) {
  const {
    name,
    description,
    image,
    family,
    weight,
    vatRate,
  } = data;

  if (!name || !family || !weight || vatRate === undefined) {
    throw new Error("Champs obligatoires manquants");
  }

  // 1️⃣ Charger la famille
  const productFamily = await ProductFamily.findById(family)
    .populate("category", "slug");

  if (!productFamily) {
    throw new Error("Famille introuvable");
  }

  if (!productFamily.category) {
    throw new Error("Catégorie parente introuvable");
  }

  // 2️⃣ Vérifier compatibilité type produit
  // if (
  //   productFamily.productsTypes.length &&
  //   !productFamily.productsTypes.includes("classic")
  // ) {
  //   throw new Error("Cette famille n'autorise pas les produits classic");
  // }

  // 3️⃣ Générer slug
  const slug = normalizeSlug( name, { prefix: productFamily.slug } );

  // 4️⃣ Unicité
  const existing = await Product.findOne({ slug });
  if (existing) {
    throw new Error("Un produit avec ce nom existe déjà dans cette famille");
  }

  // 5️⃣ Création
  return Product.create({
    name,
    slug,
    description,
    image,
    family,
    weight,
    vatRate,
  });
}

async function updateProduct(productId, payload) {
  const product = await Product.findById(productId).populate({
    path: "family",
    populate: { path: "category" },
  });

  if (!product) {
    throw new Error("Produit introuvable");
  }

  // 1️⃣ Rename → recalcul slug
  if (payload.name && payload.name !== product.name) {
    product.name = payload.name;

    const familySlug = product.family.slug;

    product.slug = normalizeSlug(payload.name, { prefix: familySlug });
  }

  // 2️⃣ Champs simples
  if (payload.description !== undefined) {
    product.description = payload.description;
  }

  if (payload.image !== undefined) {
    product.image = payload.image;
  }

  if (payload.weight !== undefined) {
    product.weight = payload.weight;
  }

  if (payload.vatRate !== undefined) {
    product.vatRate = payload.vatRate;
  }

  await product.save();
  return product;
}

async function deleteProduct(productId) {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Produit introuvable");
  }

  await product.deleteOne();
}


module.exports = {
	getProducts,
	createProduct,
  updateProduct,
  deleteProduct,
}
