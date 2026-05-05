const mongoose = require("mongoose")

const messageSchema = mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
      index: true,
    },

    sender: {
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

    content: {
      type: String,
      required: true,
      trim: true,
    },

    // prévu pour plus tard
    attachments: {
      type: [
        {
          url: String,
          type: String, // "image" | "file"
        },
      ],
      default: [],
    },

    // message interne (admin only)
    isInternal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
)

const collectionName= process.env.USE_FAKE_DB === "true"
  ? "fakemessages"
  : "messages"

const Message = mongoose.model("Message", messageSchema, collectionName);
module.exports = Message;

