const mongoose = require("mongoose");
const Ticket = require("../../../../models/Ticket")
const Message = require("../../../../models/Message")
const { getIO } = require("../../../../lib/socket")
const { ValidationError, NotFoundError } = require("../../../../utils/ApiError")

async function simulateUserTicket({ userId, content, category, context }) {
  const now = new Date()

  const ticket = await Ticket.create({
    createdBy: {
      type: "user",
      id: userId,
    },

    participants: [
      {
        type: "user",
        id: userId,
      },
    ],

    category: category || "other",

    status: "open",

    context: {
      entityType: context?.entityType || null,
      entityId: context?.entityId || null,
    },

    lastMessageAt: now,
    lastMessageBy: "user",

    unreadByAdmin: true,
    unreadByUser: false,
  })

  await Message.create({
    ticketId: ticket._id,

    sender: {
      type: "user",
      id: userId,
    },

    content,
  })

  // const io = getIO()

  // io.emit("ticket:created", ticket)

  return ticket
}



async function simulateUserReply({ ticketId, userId, content }) {
  if (!ticketId) {
    throw new ValidationError({ ticketId: "Required" })
  }

  if (!userId) {
    throw new ValidationError({ userId: "Required" })
  }

  if (!content) {
    throw new ValidationError({ content: "Required" })
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const ticket = await Ticket.findById(ticketId).session(session)

    if (!ticket) {
      throw new NotFoundError("Ticket not found")
    }

    const now = new Date()

    // 1. Ajouter user aux participants si pas déjà présent
    const isAlreadyParticipant = ticket.participants.some(
      (p) =>
        p.type === "user" &&
        p.id.toString() === userId.toString()
    )

    if (!isAlreadyParticipant) {
      ticket.participants.push({
        type: "user",
        id: userId,
      })
    }

    // 2. Créer le message
    const [ createdMessage ] = await Message.create(
      [
        {
          ticketId: ticket._id,
          sender: {
            type: "user",
            id: userId,
          },
          content,
          isInternal: false,
        },
      ],
      { session }
    )

    // 3. Update ticket
    ticket.lastMessageAt = now
    ticket.lastMessageBy = "user"

    ticket.unreadByAdmin = true
    ticket.unreadByUser = false

    // Optionnel : rouvrir si résolu
    if (["resolved", "closed"].includes(ticket.status)) {
      ticket.status = "open"
    }

    await ticket.save({ session })

    await session.commitTransaction()
    session.endSession()

    const io = getIO()

    io.emit("message:created", {
      ticketId: ticket._id.toString(),
      message: createdMessage,
    })

    io.emit("ticket:created", {
      ticketId: ticket._id.toString(),
    })

    return ticket
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}




module.exports = {
  simulateUserTicket,
  simulateUserReply,
}
