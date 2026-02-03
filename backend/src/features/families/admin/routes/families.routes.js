const express = require("express");
const router = express.Router();

const {
  listFamilies,
  createFamilyHandler,
  updateFamilyHandler,
  deleteFamilyHandler,
} = require("../controllers/families.controller");

router.get("/", listFamilies);
router.post("/", createFamilyHandler);
router.put("/:id", updateFamilyHandler);
router.delete("/:id", deleteFamilyHandler);

module.exports = router;
