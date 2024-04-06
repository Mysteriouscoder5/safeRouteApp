const User = require("../models/userModel");

const getLoggedInUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "USER NOT FOUND",
      });
    }
    res.status(200).json({
      success: true,
      user,
      token: req.token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const emailPasswordLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "PLEASE PROVIDE VALID DATA",
      });
    }
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "INVALID CREDENTIALS" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "INVALID CREDENTIALS" });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const newUser = new User({ email, password, username });
    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "USER NOT REGISTERED",
      });
    }
    await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).json({
      success: true,
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getLoggedInUserDetails,
  emailPasswordLogin,
  registerUser,
};
