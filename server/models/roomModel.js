const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
    },
    temperature: {
      type: String,
    },
    smoke: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Room = new mongoose.model("Room", roomSchema);
module.exports = Room;
