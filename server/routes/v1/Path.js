const express = require("express");
const { authenticateUser } = require("../../middleware/auth");
const {
  createNewPath,
  getAllPaths,
} = require("../../controllers/PathController");
const router = express.Router({ mergeParams: true });

router.get("/all/paths", getAllPaths);
router.post("/create/new/path", createNewPath);

module.exports = router;
