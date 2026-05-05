const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    createdBy: {
      type: {
        type: String,
        enum: ["user", "producer"],
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },

    participants: [
      {
        type: {
          type: String,
          enum: ["user", "producer", "admin"],
          required: true,
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      default: "other",
      index: true,
    },

    status: {
      type: String,
      enum: ["open", "pending", "resolved", "closed"],
      default: "open",
      index: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    context: {
      entityType: {
        type: String, // "order" | "product" | "shop"
        default: null,
      },
      entityId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },

    // optimisations UX & perf
    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    lastMessageBy: {
      type: String,
      enum: ["user", "producer", "admin"],
    },

    unreadByAdmin: {
      type: Boolean,
      default: true,
      index: true,
    },

    unreadByUser: {
      type: Boolean,
      default: false,
    },

    firstResponseAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

ticketSchema.index({ status: 1, lastMessageAt: -1 })
ticketSchema.index({ assignedTo: 1, status: 1 })
ticketSchema.index({ "createdBy.id": 1 })


const collectionName = process.env.USE_FAKE_DB === "true"
  ? "faketickets"
  : "tickets"

const Ticket = mongoose.model("Ticket", ticketSchema, collectionName)
module.exports = Ticket

