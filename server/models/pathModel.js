const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const pathSchema = new mongoose.Schema(
  {
    pathNumber: {
      type: Number,
    },
    type: {
      type: String,
    },
    features: [
      {
        type: {
          type: String,
        },
        properties: {},
        geometry: {
          type: {
            type: String,
          },
          coordinates: [[Number]],
        },
      },
    ],
  },
  { timestamps: true }
);

const Path = new mongoose.model("Path", pathSchema);
module.exports = Path;
