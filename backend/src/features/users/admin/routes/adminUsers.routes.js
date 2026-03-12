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
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");
const router = express.Router();



router.patch("/:id/suspend", suspend);
router.patch("/:id/reactivate", reactivate);
router.get("/:id/dashboard", userDashboard);
router.get("/:id", getUser);
router.get("/", listUsers)

router.patch("/:id/roles", updateRoles);
router.patch("/:id/restore", restore);
router.put(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin"),
  update
);

router.delete("/:id", softDelete);


module.exports = router;