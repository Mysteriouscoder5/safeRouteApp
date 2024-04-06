const express = require("express");
const { authenticateUser } = require("../../middleware/auth");
const {
  registerUser,
  emailPasswordLogin,
  getLoggedInUserDetails,
} = require("../../controllers/userController");
const router = express.Router({ mergeParams: true });

router.post("/register", registerUser);
router.post("/login", emailPasswordLogin);
router.get("/details", authenticateUser, getLoggedInUserDetails);

module.exports = router;
