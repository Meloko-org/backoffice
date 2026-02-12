const { validateCategoryPayload } = require("../domain/validateCategoryPayload");
const ApiError = require("../../../../utils/ApiError");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../services/categories.services");


const listCategories = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sortKey = "createdAt",
      sortDirection = "desc",
      type,
    } = req.query;

    /* garantir que page et limit sont bien des number */
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 20));

    const result = await getCategories({
      page: Number(pageNumber),
      limit: Number(limitNumber),
      search,
      type,
      sortKey,
      sortDirection,
    });

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};


const createCategoryHandler = async (req, res, next) => {
  try {
    const errors = await validateCategoryPayload(req.body);

    if (errors.length > 0) {
      throw new ApiError("Validation échouée.", 400, errors);
    }

    const category = await createCategory(req.body);


    res.status(201).json({
      success: true,
      data: category,
    });

  } catch (error) {
    next(error);

  }
};


const updateCategoryHandler = async (req, res, next) => {
  try {
    const errors = await validateCategoryPayload(req.body);

    if (errors.length > 0) {
      throw new ApiError("Validation échouée.", 400, errors);
    }

    const category = await updateCategory(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: category,
    });

  } catch (error) {
    next(error);
  }
};


const deleteCategoryHandler = async (req, res, next) => {
  try {
    await deleteCategory(req.params.id);

    res.json({
      success: true,
    });

  } catch (error) {
    next(error);
  }
};


const getCategory = async (req, res, next) => {
  try {
    
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    res.json({
      success: true,
      data: category,
    });

  } catch (error) {
    next(error);
  }
}


module.exports = {
  listCategories,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategory,
};
