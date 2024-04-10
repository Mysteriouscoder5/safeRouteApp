const express = require("express");
const { authenticateUser } = require("../../middleware/auth");
const {
  registerUser,
  emailPasswordLogin,
  getLoggedInUserDetails,
  updateUser,
  saveEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
} = require("../../controllers/UserController");
const router = express.Router({ mergeParams: true });

router.post("/register", registerUser);
router.post("/login", emailPasswordLogin);
router.get("/details", authenticateUser, getLoggedInUserDetails);
router.put("/update/profile", authenticateUser, updateUser);
router.post("/save/contact", authenticateUser, saveEmergencyContact);
router.put("/update/contact/:id", authenticateUser, updateEmergencyContact);
router.put("/delete/contact", authenticateUser, deleteEmergencyContact);

module.exports = router;
