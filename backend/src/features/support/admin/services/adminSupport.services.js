const mongoose = require("mongoose")
const Ticket = require("../../../../models/Ticket")
const Message = require("../../../../models/Message")
const User = require("../../../../models/User")
const { ValidationError, ForbiddenError, NotFoundError } = require("../../../../utils/ApiError")
const getCollectionInstance = require("../../../../helpers/collectionHelpers")
const getCollection = require("../../../../utils/collectionName")

async function postMessage({ ticketId, sender, content, isInternal = false }) {
  if (!ticketId) throw new ValidationError({ ticketId: "Required" })

  if (!sender?.id || sender?.type !== "admin") {
    throw new ForbiddenError("Only admin can send messages")
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

    // 1. Auto-assign si pas encore assigné
    if (!ticket.assignedTo) {
      ticket.assignedTo = sender.id
    }

    // 2. Ajouter admin aux participants si pas déjà présent
    const isAlreadyParticipant = ticket.participants.some(
      (p) =>
        p.type === "admin" &&
        p.id.toString() === sender.id.toString()
    )

    if (!isAlreadyParticipant) {
      ticket.participants.push({
        type: "admin",
        id: sender.id,
      })
    }

    // 3. Créer le message
    await Message.create(
      [
        {
          ticketId: ticket._id,
          sender,
          content,
          isInternal,
        },
      ],
      { session }
    )

    // 4. firstResponseAt (si premier message admin non interne)
    if (!ticket.firstResponseAt && !isInternal) {
      ticket.firstResponseAt = now
    }

    // 5. Update ticket
    ticket.lastMessageAt = now
    ticket.lastMessageBy = "admin"

    if (!isInternal) {
      ticket.unreadByUser = true
    }

    ticket.unreadByAdmin = false

    // Optionnel : changer status
    if (ticket.status === "open") {
      ticket.status = "pending"
    }

    await ticket.save({ session })

    await session.commitTransaction()
    session.endSession()

    return ticket
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}


async function getTickets({
  page = 1,
  limit = 10,
  search,
  sortKey = "lastMessageAt",
  sortDirection = "desc",
  filters = {},
}) {
  const skip = (page - 1) * limit

  const match = {}

  // 🔎 search (simple)
  if (search) {
    match.$or = [
      { category: { $regex: search, $options: "i" } },
    ]
  }

  // 🎛️ filters
  if (filters.status) {
    match.status = filters.status
  }

  if (filters.category) {
    match.category = filters.category
  }

  if (filters.unreadByAdmin !== undefined) {
    match.unreadByAdmin = filters.unreadByAdmin === "true"
  }

  const sort = {
    [sortKey]: sortDirection === "asc" ? 1 : -1,
  }

  // 🔥 aggregation
  const items = await Ticket.aggregate([
    { $match: match },

    //user
    {
      $lookup: {
        from: getCollection("users"),
        localField: "createdBy.id",
        foreignField: "_id",
        as: "user",
      },
    },

    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      }
    },

    //assignedTo
    {
      $lookup: {
        from: getCollection("users"),
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedUser",
      }
    }, 

    {
      $unwind: {
        path: "$assignedUser",
        preserveNullAndEmptyArrays: true,
      }
    },  

    // dernier message
    {
      $lookup: {
        from: getCollection("messages"),
        let: { ticketId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$ticketId", "$$ticketId"] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: "lastMessage",
      },
    },

    {
      $addFields: {
        lastMessagePreview: {
          $ifNull: [{ $arrayElemAt: ["$lastMessage.content", 0] }, ""],
        },
      },
    },

    {
      $project: {
        _id: 1,
        category: 1,
        status: 1,
        assignedTo: {  // peut être null
          $cond: {
            if: { $ifNull: ["$assignedUser._id", false] },
            then: {
              id: "$assignedUser._id",
              firstname: "$assignedUser.firstname",
              lastname: "$assignedUser.lastname",
            },
            else: null,
          }
          
        },
        lastMessageAt: 1,
        unreadByAdmin: 1,

        createdBy: {
          type: "$createdBy.type",
          id: "$createdBy.id",
          firstname: "$user.firstname",
          lastname: "$user.lastname",
        },

        lastMessagePreview: 1,
      },
    },

    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
  ])

  const totalItems = await Ticket.countDocuments(match)

  return {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  }
}




async function getTicketDetails(ticketId) {
  if (!ticketId) {
    throw new Error("ticketId is required")
  }

  const ticket = await Ticket.findById(ticketId).lean()

  if (!ticket) {
    throw new NotFoundError("Ticket not found")
  }

  // enrichissement user
  if (ticket.createdBy?.id) {
    const user = await User.findById(ticket.createdBy.id)
      .select("firstname lastname")
      .lean()
    
    if (user) {
      ticket.createdBy.lastname = user.lastname;
      ticket.createdBy.firstname = user.firstname;
    }
  }

  // enrichissement assignedTo
  if (ticket.assignedTo) {
    const admin = await User.findById(ticket.assignedTo)
      .select("firstname lastname")
      .lean()

    if (admin) {
      ticket.assignedTo = {
        id: admin._id,
        firstname: admin.firstname,
        lastname: admin.lastname
      }
    } else {
      ticket.assignedTo = null;
    }
  }

  const messages = await Message.find({ ticketId })
    .sort({ createdAt: 1 }) // ⬅️ IMPORTANT (timeline)
    .lean()

  return {
    ticket,
    messages,
  }
}



const ALLOWED_STATUS = ["open", "pending", "resolved", "closed"]

async function patchTicket({ ticketId, updates, adminId }) {
  if (!ticketId) {
    throw new ValidationError({ ticketId: "required" })
  }

  const ticket = await Ticket.findById(ticketId)

  if (!ticket) {
    throw new NotFoundError("Ticket not found")
  }

  // 🔒 status
  if (updates.status !== undefined) {
    if (!ALLOWED_STATUS.includes(updates.status)) {
      throw new ValidationError({ status: "invalid value" })
    }

    ticket.status = updates.status
  }

  // 👤 assignation
  if (updates.assignedTo !== undefined) {
    // null autorisé (désassignation)
    ticket.assignedTo = updates.assignedTo || null
  }

  // (optionnel mais très utile)
  ticket.updatedAt = new Date()

  await ticket.save()

  return ticket
}



async function getAdmins() {
  
  const admins = await User.aggregate([
    // 🔗 join avec roles
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
      },
    },

    { $unwind: "$role" },

    // 🎯 filtre sur role.name
    {
      $match: {
        "role.name": { $in: ["admin", "super-admin", "support"] },
      },
    },

    // ✂️ projection minimale
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        clerkUUID: 1,
      },
    },

    // (optionnel) tri
    {
      $sort: {
        lastName: 1,
      },
    },
  ]);

  return admins
}









module.exports = {
  postMessage,
  getTickets,
  getTicketDetails,
  patchTicket,
  getAdmins,
}
