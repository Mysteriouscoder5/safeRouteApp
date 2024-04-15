const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "PLEASE ENTER YOUR NAME"],
      default: "user",
      minlength: [2, "NAME SHOULD HAVE MORE THAN 2 CHARACTERS "],
    },

    email: {
      type: String,
      trim: true,
      validate: [validator.isEmail, "PLEASE ENTER A VALID EMAIL"],
      // index: { unique: true, sparse: true },
    },

    phone: {
      type: Number,
      trim: true,
      minlength: [10, "CONTACT NUMBER SHOULD BE MINIMUM 10 DIGITS"],
      // index: { unique: true, sparse: true },
    },

    password: {
      type: String,
      select: false,
    },
    primaryEmergencyContact: {
      type: Number,
      trim: true,
      minlength: [10, "CONTACT NUMBER SHOULD BE MINIMUM 10 DIGITS"],
    },
    emergencyContactList: [
      {
        contactName: {
          type: String,
          trim: true,
          required: true,
          lowercase: true,
        },
        contactPhone: {
          type: Number,
          required: true,
          minlength: [10, "CONTACT NUMBER SHOULD BE MINIMUM 10 DIGITS"],
        },
      },
    ],

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["male", "female", "others"],
      lowercase: true,
      trim: true,
    },
    physicalDisability: {
      type: String,
    },
    medicalCondition: {
      type: String,
    },
    homeAddress: {
      type: String,
    },
    expoPushTokens: [String],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    return token;
  } catch (e) {
    console.log(e);
  }
};

userSchema.methods.comparePassword = async function (password) {
  const checkPass = await bcrypt.compare(password, this.password);
  return checkPass;
};

userSchema.methods.generateResetPasswordToken = async function () {
  const resetToken = await crypto.randomBytes(20).toString("hex");
  const tokenCrypto = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordToken = tokenCrypto;
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await this.save({ validateBeforeSave: false });
  return resetToken;
};

userSchema.methods.saveExpoPushToken = async function (expoPushToken) {
  if (this.expoPushTokens.includes(expoPushToken)) {
    return;
  } else {
    this.expoPushTokens.push(expoPushToken);
  }
  await this.save();
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
