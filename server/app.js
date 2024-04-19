const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const userRoute = require("./routes/v1/User");
const pathRoute = require("./routes/v1/Path");
const hausRoute = require("./routes/v1/Haus");
const roomRoute = require("./routes/v1/Room");
const notificationRoute = require("./routes/v1/Notification");

const port = process.env.PORT;
require("./db/connection");

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function serveStatic() {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist"));
  });
}

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/path", pathRoute);
app.use("/api/v1/haus", hausRoute);
app.use("/api/v1/notification", notificationRoute);

const server = app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  serveStatic();
});

// unhandled rejection problem
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
