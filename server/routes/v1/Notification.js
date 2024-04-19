const express = require("express");
const {
  sendFireAlertNotifications,
} = require("../../controllers/NotificationController");
const router = express.Router({ mergeParams: true });

router.post("/alert/send/all", sendFireAlertNotifications);

module.exports = router;
