const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const hausSchema = new mongoose.Schema(
  {
    hausNumber: {
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
          coordinates: [[[Number]]],
        },
      },
    ],
  },
  { timestamps: true }
);

const Haus = new mongoose.model("Haus", hausSchema);
module.exports = Haus;
