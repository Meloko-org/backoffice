const { validateCategoryPayload } = require("../domain/validateCategoryPayload");
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
      sort,
      order,
    } = req.query;

    console.log("backend categories")

    const result = await getCategories({
      page: Number(page),
      limit: Number(limit),
      sort,
      order,
    });

    console.log(result)

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
    const errors = validateCategoryPayload(req.body);

    if (errors.lagnth > 0) {
      return res.status(400).json({
        success: false, 
        errors,
      })
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
    const errors = validateCategoryPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false, 
        errors,
      })
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
      message: "Catégorie supprimée",
    });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    console.log("category :", category)

    res.json({
      success: true,
      data: category,
    })
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
