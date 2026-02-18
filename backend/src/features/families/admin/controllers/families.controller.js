const { validateFamilyPayload } = require("../domain/validateFamilyPayload");
const {
  getFamilies,
  createFamily,
  updateFamily,
  deleteFamily,
  getFamilyById,
} = require("../services/families.service");

const listFamilies = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sortKey = "createdAt",
      sortDirection = "desc",
      category,
    } = req.query;

    /* garantir que page et limit sont bien des number */
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 20));

    const result = await getFamilies({
      page: Number(pageNumber),
      limit: Number(limitNumber),
      search,
      sortKey,
      sortDirection,
      category,
    });

    
    // console.log(JSON.stringify(result, null, 2))

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
    
    console.log("body :", req.body)
    validateFamilyPayload(req.body);

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
    console.log("id :", req.params.id)
    console.log("body :", req.body)

    validateFamilyPayload(req.body);

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


const getFamily = async (req, res, next) => {
  try {
    const familyId = req.params.id;

    const family = await getFamilyById(familyId);

    // console.log("FAMILLE :", family)

    res.json({
      success: true,
      data: family,
    })

  } catch (error) {
    next(error)
  }
}

const familyNames = async (req, res, next) => {
  try {
    const families = await getFamilyNames();

    res.json({
      success: true,
      data: families,
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  listFamilies,
  createFamilyHandler,
  updateFamilyHandler,
  deleteFamilyHandler,
  getFamily,
  familyNames,
};
