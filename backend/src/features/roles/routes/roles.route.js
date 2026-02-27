const express = require("express");
const { roleNames } = require("../controllers/roles.controller");
const router = express.Router();


router.get("/names", roleNames);



module.exports = router;