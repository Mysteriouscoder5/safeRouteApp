const express = require("express");
const { authenticateUser } = require("../../middleware/auth");
const {
  getRoomDetails,
  updateRoomDetails,
  createNewRoom,
  getAllRooms,
  updateMultipleRoomDetails,
} = require("../../controllers/RoomController");

const router = express.Router({ mergeParams: true });

router.post("/new", createNewRoom);
router.get("/:number", getRoomDetails);
router.get("/all/rooms", getAllRooms);
router.put("/:number", updateRoomDetails);
router.put("/update/:number", updateMultipleRoomDetails);

module.exports = router;
