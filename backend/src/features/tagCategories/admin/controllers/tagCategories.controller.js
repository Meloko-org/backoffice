const { getTagCategoryNames } = require("../services/tagCategories.service");

const tagCategoryNames = async (req, res, next) => {
  try {
    const tagCategories = await getTagCategoryNames();

    res.json({
      success: true,
      data: tagCategories,
    })

  } catch (error) {
    next(error);
  }
}

module.exports = {
  tagCategoryNames,
}