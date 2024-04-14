const Path = require("../models/pathModel");
const Room = require("../models/roomModel");

const createNewRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: "ROOM NOT CREATED",
      });
    }
    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getRoomDetails = async (req, res) => {
  try {
    const room = await Room.findOne({ roomNumber: req.params.number });
    if (!room) {
      return res.status(400).json({
        success: false,
        message: "NO ROOM FOUND",
      });
    }
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateRoomDetails = async (req, res) => {
  try {
    const { temperature } = req.body;
    const room = await Room.findOneAndUpdate(
      { roomNumber: req.params.number },
      { temperature },
      { new: true }
    );

    if (!room) {
      return res.status(400).json({
        success: false,
        message: "ROOM NOT UPDATED",
      });
    }
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getRoomDetails, updateRoomDetails, createNewRoom };
