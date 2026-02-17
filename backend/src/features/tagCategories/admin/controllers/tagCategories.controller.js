const { getTagCategoryNames } = require("../services/tagCategories.service");

const tagCategoryNames = async (req, res, next) => {
  try {
    const tagCategories = await getTagCategoryNames();

    console.log("TAG CATEGORIES NAMES :", tagCategories)

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