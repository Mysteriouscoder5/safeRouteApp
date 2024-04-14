const express = require("express");
const { authenticateUser } = require("../../middleware/auth");
const {
  getRoomDetails,
  updateRoomDetails,
  createNewRoom,
} = require("../../controllers/RoomController");

const router = express.Router({ mergeParams: true });

router.post("/new", createNewRoom);
router.get("/:number", getRoomDetails);
router.put("/:number", updateRoomDetails);

module.exports = router;
