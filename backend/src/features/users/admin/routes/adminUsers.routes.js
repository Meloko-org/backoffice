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



router.patch(
  "/:id/suspend", 
  requireAuth,
  requireRole("admin", "super-admin"), 
  suspend
);

router.patch(
  "/:id/reactivate",  
  requireAuth,
  requireRole("admin", "super-admin"),
  reactivate
);

router.get(
  "/:id/dashboard",  
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  userDashboard
);

router.get(
  "/:id",  
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  getUser
);

router.get(
  "/", 
  requireAuth,
  requireRole("admin", "super-admin", "dev"),
  listUsers
)

// pas utilisée
router.patch("/:id/roles", updateRoles);

router.patch(
  "/:id/restore", 
  requireAuth,
  requireRole("admin", "super-admin"),
  restore
);

router.put(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin"),
  update
);

router.delete(
  "/:id", 
  requireAuth,
  requireRole("admin", "super-admin"),
  softDelete
);


module.exports = router;