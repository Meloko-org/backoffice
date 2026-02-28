const express = require("express");
const { 
  listUsers, 
  getUser, 
  reactivate, 
  suspend, 
  softDelete,
  updateRoles,
  restore,
  userDashboard,
} = require("../controllers/adminUsers.controller");
const router = express.Router();



router.patch("/:id/suspend", suspend);
router.patch("/:id/reactivate", reactivate);
router.get("/:id/dashboard", userDashboard);
router.get("/:id", getUser);
router.get("/", listUsers)

router.patch("/:id/roles", updateRoles);
router.patch("/:id/restore", restore);

router.delete("/:id", softDelete);


module.exports = router;