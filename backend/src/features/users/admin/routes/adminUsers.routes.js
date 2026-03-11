const express = require("express");
const { 
  listUsers, 
  getUser, 
  reactivate, 
  suspend, 
  softDelete,
  updateRoles,
  update,
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
router.put("/:id", update);

router.delete("/:id", softDelete);


module.exports = router;