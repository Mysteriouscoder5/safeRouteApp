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
    pathNumber: {
      type: Number,
    },
    exitNumber: {
      type: Number,
    },
    wayOutNumber: {
      type: Number,
    },
    temperature: {
      type: String,
    },
    humidity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Room = new mongoose.model("Room", roomSchema);
module.exports = Room;
