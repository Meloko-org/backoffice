const express = require("express");
const requireAuth = require("../../../../middlewares/requireAuth");
const requireRole = require("../../../../middlewares/requireRole");
const { listTickets, ticketDetails, simulateTicketController, simulateUserReplyController, sendMessage, updateTicket, admins } = require("../controllers/adminSupport.controller");
const router = express.Router();


router.patch(
  "/:id",
  requireAuth,
  requireRole("admin", "super-admin", "support"),
  updateTicket
)


router.post(
  "/:id/messages",
  requireAuth,
  requireRole("admin", "super-admin", "support"),
  sendMessage
)

router.get(
  "/admins",
  requireAuth,
  requireRole("admin", "super-admin","support"),
  admins
)

router.get(
  "/:id",
  requireAuth,
  requireRole("admin", "super-admin", "support"),
  ticketDetails
)

router.get(
  "/",
  requireAuth,
  requireRole("admin", "super-admin", "support"),
  listTickets
)



// routes simulation : à effacer
router.post(
  "/simulate",
  requireAuth,
  requireRole("admin", "super-admin", "support"),
  simulateTicketController
)

router.post(
  "/:id/simulate-reply",
  // requireAuth,
  // requireRole("admin", "super-admin", "support"),
  simulateUserReplyController
)

module.exports = router;