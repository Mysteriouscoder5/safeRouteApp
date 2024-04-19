const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });
const User = require("../models/userModel");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();

const sendFireAlertNotifications = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "PROVIDE VALID INFORMATION",
      });
    }

    const user = await User.findById(userId);
    if (user?.expoPushTokens?.length > 0) {
      let userMessages = [];
      for (let pushToken of user?.expoPushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
          continue;
        }
        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        userMessages.push({
          to: pushToken,
          sound: "default",
          title: "FIRE ALERT !!!",
          body: "Tap to open saferoute app",
          priority: "normal",
          data: {
            url: `${process.env.USER_APP_SCHEME}://`,
          },
        });
      }
      let chunks = expo.chunkPushNotifications(userMessages);
      let tickets = [];
      for (let chunk of chunks) {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }
    }

    res
      .status(200)
      .json({ success: true, message: "NOTIFICATIONS SENT SUCCESSFULLY" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { sendFireAlertNotifications };
