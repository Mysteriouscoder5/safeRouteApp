const Haus = require("../models/hausModel");
const Path = require("../models/pathModel");

const getAllHaus = async (req, res) => {
  try {
    const haus = await Haus.find();
    if (haus.length === 0) {
      return res.status(400).json({
        success: false,
        message: "NO HAUS FOUND",
      });
    }
    res.status(200).json({
      success: true,
      haus,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createNewHaus = async (req, res) => {
  try {
    const haus = await Haus.create(req.body);
    if (!haus) {
      return res.status(400).json({
        success: false,
        message: "HAUS NOT CREATED",
      });
    }
    res.status(201).json({
      success: true,
      haus,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllHaus, createNewHaus };
