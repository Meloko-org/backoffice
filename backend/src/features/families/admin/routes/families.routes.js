const express = require("express");
const router = express.Router();

const {
  listFamilies,
  createFamilyHandler,
  updateFamilyHandler,
  deleteFamilyHandler,
  familyNames,
  getFamily,
  familyNamesforCategory,
} = require("../controllers/families.controller");

router.get("/category/:id", familyNamesforCategory);
router.get("/names", familyNames);
router.get("/:id", getFamily);
router.get("/", listFamilies);
router.post("/", createFamilyHandler);
router.put("/:id", updateFamilyHandler);
router.delete("/:id", deleteFamilyHandler);

module.exports = router;
