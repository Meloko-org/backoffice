const express = require("express");
const router = express.Router();

const {
  listFamilies,
  createFamilyHandler,
  updateFamilyHandler,
  deleteFamilyHandler,
  familyNames,
  getFamily
} = require("../controllers/families.controller");

router.get("/names", familyNames);
router.get("/:id", getFamily);
router.get("/", listFamilies);
router.post("/", createFamilyHandler);
router.put("/:id", updateFamilyHandler);
router.delete("/:id", deleteFamilyHandler);

module.exports = router;
