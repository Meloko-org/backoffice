const express = require("express");
const router = express.Router();

const { typeNames } = require("../controllers/types.controller")

router.get("/names", typeNames);

module.exports = router;