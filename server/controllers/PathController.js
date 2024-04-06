const Path = require("../models/pathModel");

const getAllPaths = async (req, res) => {
  try {
    const paths = await Path.find();
    if (paths.length === 0) {
      return res.status(400).json({
        success: false,
        message: "NO PATHS FOUND",
      });
    }
    res.status(200).json({
      success: true,
      paths,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createNewPath = async (req, res) => {
  try {
    const path = await Path.create(req.body);
    if (!path) {
      return res.status(400).json({
        success: false,
        message: "PATH NOT CREATED",
      });
    }
    res.status(201).json({
      success: true,
      path,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllPaths, createNewPath };
