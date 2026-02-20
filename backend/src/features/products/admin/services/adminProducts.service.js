const Product = require("../../../../models/Product");
const ProductFamily = require("../../../../models/ProductFamily");
const ProductCategory = require("../../../../models/ProductCategory");
const { normalizeSlug } = require("../../../../utils/normalize");
const { NotFoundError, ValidationError, ApiError } = require("../../../../utils/ApiError");
const mongoose = require("mongoose");

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

  const productFamily = await ProductFamily.findById(family);

  if (!productFamily) {
  throw new ValidationError({
    family: "Famille introuvable",
  });
}

  const slug = normalizeSlug( name, { prefix: productFamily.slug } );

  const existing = await Product.findOne({ slug });
  if (existing) {
    throw new ValidationError("Un produit avec ce nom existe déjà dans cette famille");
  }

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
    throw new NotFoundError("Produit introuvable");
  }


  /**
   * Si une famille est fournie, il faut être sur d'avoir le bon slug family
   */
  let familySlug = product.family.slug;

  if (payload.family) {
    const productFamily = await ProductFamily.findById(payload.family);

    if (!productFamily) {
      throw new ValidationError({
        family: "Famille introuvable",
      });
    }

    product.family = payload.family;
    familySlug = productFamily.slug;
  }


  /**
   * si le nom du produit change, il faut regénérer le slug en vérifiant
   * qu'il n'existe pas déjà
   */
  if (payload.name && payload.name !== product.name) {
    const newSlug = normalizeSlug(payload.name, { prefix: familySlug });

    const existing = await Product.findOne({
      slug: newSlug,
      _id: { $ne: product._id },
    });

    if (existing) {
      throw new ValidationError({
        name: "Un produit avec ce nom existe déjà dans cette famille",
      });
    }

    product.name = payload.name;
    product.slug = newSlug;
  }

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
    throw new NotFoundError("Produit introuvable");
  }

  await product.deleteOne();
}

async function getProductById(productId) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError("Id du produit invalide", 400)
  }

  const product = await Product.findById(productId)
    .populate({
      path: "family",
      model: "ProductFamily",
      select: "name category",
      populate: {
        path: "category",
        model: "ProductCategory",
        select: "name"
      }
    });

  if (!product) {
    throw new NotFoundError("Produit introuvable");
  }

  return product;
}


module.exports = {
	getProducts,
	createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
}
