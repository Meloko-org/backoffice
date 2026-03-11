const mongoose = require("mongoose");

const addressSchema = require("./Address");

const favsearchSchema = mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        default: null,
      },
    ],
    productsCats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        default: null,
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags",
        default: null,
      },
    ],
    isMyPosition: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true },
);

const userAddressSchema = mongoose.Schema(
  {
    address: addressSchema,
    name: {
      type: String,
      default: null,
    },
    isDefault: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    clerkUUID: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },
    clerkPasswordEnabled: {
      type: String,
      required: true,
    },
    stripeUUID: {
      type: String,
      unique: true,
    },
    roles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],
    addresses: [userAddressSchema],
    favSearch: [favsearchSchema],
    settings: {
      helpHints: {
        type: Boolean,
        default: true,
      },
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
    },
    suspendedAt: {
      type: Date,
    },
    suspensionReason: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
    deletedByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }
  },
  { timestamps: true },
);


const collectionName = process.env.USE_FAKE_DB === "true"
  ? "fakeusers"
  : "users";

const User = mongoose.model("User", userSchema, collectionName);

module.exports = User;
