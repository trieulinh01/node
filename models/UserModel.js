const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 256,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { versionKey: false, timestamps: true }
);
module.exports = mongoose.model("User", User);
