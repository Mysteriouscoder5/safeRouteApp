const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const authorization = req.headers.authorization?.split(" ")[1];

    if (!token && !authorization) {
      return res
        .status(401)
        .json({ success: false, message: "PLEASE LOGIN TO ACCESS THIS DATA" });
    } else if (authorization) {
      const verifyUser = jwt.verify(authorization, process.env.SECRET_KEY);
      const user = await User.findById({ _id: verifyUser._id });
      req.user = user;
      req.token = authorization;
      next();
    } else if (token) {
      const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById({ _id: verifyUser._id });
      req.user = user;
      req.token = token;
      next();
    }
  } catch (error) {
    console.log(error, "auth");
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = { authenticateUser };
