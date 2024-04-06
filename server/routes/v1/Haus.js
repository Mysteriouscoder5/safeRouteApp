const express = require("express");
const { authenticateUser } = require("../../middleware/auth");
const {
  getAllHaus,
  createNewHaus,
} = require("../../controllers/HausController");

const router = express.Router({ mergeParams: true });

router.get("/all/haus", getAllHaus);
router.post("/create/new/haus", createNewHaus);

module.exports = router;
