const { validateFamilyPayload } = require("../domain/validateFamilyPayload");
const {
  getFamilies,
  createFamily,
  updateFamily,
  deleteFamily,
} = require("../services/families.service");

const listFamilies = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
    } = req.query;

    const result = await getFamilies({
      page: Number(page),
      limit: Number(limit),
      categoryId: category,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createFamilyHandler = async (req, res, next) => {
  try {
    const errors = validateFamilyPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }

    const family = await createFamily(req.body);

    res.status(201).json({
      success: true,
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

const updateFamilyHandler = async (req, res, next) => {
  try {
    const errors = validateFamilyPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }

    const family = await updateFamily(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFamilyHandler = async (req, res, next) => {
  try {
    await deleteFamily(req.params.id);

    res.json({
      success: true,
      message: "Famille supprimée",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listFamilies,
  createFamilyHandler,
  updateFamilyHandler,
  deleteFamilyHandler,
};
