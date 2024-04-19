const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const { ObjectId } = require("bson");

const getLoggedInUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "USER NOT FOUND",
      });
    }
    res.status(200).json({
      success: true,
      user,
      token: req.token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const emailPasswordLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "PLEASE PROVIDE VALID DATA",
      });
    }
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "INVALID CREDENTIALS" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "INVALID CREDENTIALS" });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const newUser = new User({ email, password, username });
    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "USER NOT REGISTERED",
      });
    }
    await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).json({
      success: true,
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      username,
      age,
      gender,
      physicalDisability,
      medicalCondition,
      homeAddress,
      phone,
      email,
      primaryEmergencyContact,
      expoPushToken,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username,
          phone,
          email,
          gender,
          age,
          physicalDisability,
          medicalCondition,
          homeAddress,
          primaryEmergencyContact,
        },
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "USER NOT UPDATED",
      });
    }

    if (expoPushToken !== undefined) {
      await user.saveExpoPushToken(expoPushToken);
    }

    res.status(201).json({
      success: true,
      message: "USER UPDATED",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const saveEmergencyContact = async (req, res) => {
  try {
    const { contactName, contactPhone } = req.body;
    const newContact = {
      contactName,
      contactPhone,
    };
    const user = await User.findById(req.user?._id);
    // const user = await User.findByIdAndUpdate(
    //   req.user?._id,
    //   {
    //     $push: {
    //       emergencyContactList: newContact,
    //     },
    //   },
    //   {
    //     new: true,
    //     upsert: true,
    //   }
    // );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "USER NOT UPDATED",
      });
    }
    user?.emergencyContactList?.push(newContact);

    if (user?.primaryEmergencyContact === null) {
      user.primaryEmergencyContact = contactPhone;
    }
    if (
      user?.emergencyContactList.some((elem) => {
        return elem.contactPhone !== user.primaryEmergencyContact;
      })
    ) {
      user.primaryEmergencyContact = contactPhone;
    }
    await user.save();

    res.status(201).json({
      success: true,
      message: "USER UPDATED",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateEmergencyContact = async (req, res) => {
  try {
    const { contactPhone, contactName } = req.body;
    const contactId = new mongoose.Types.ObjectId(req.params.id);
    const newContact = {
      contactName,
      contactPhone,
    };
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          "emergencyContactList.$[e1]": newContact,
        },
      },
      {
        arrayFilters: [{ "e1._id": contactId }],
        new: true,
      }
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "CONTACT NOT UPDATED",
      });
    }
    res.status(201).json({
      success: true,
      message: "CONTACT UPDATED SUCCESSFULLY",
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const deleteEmergencyContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "ADDRESS NOT DELETED",
      });
    }
    const contact = user?.emergencyContactList?.find((elem) =>
      elem._id.equals(new ObjectId(contactId))
    );
    user.emergencyContactList = user.emergencyContactList.filter(
      (a) => !a._id.equals(new ObjectId(contactId))
    );
    if (user?.primaryEmergencyContact === contact?.contactPhone) {
      user.primaryEmergencyContact = null;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "ADDRESS DELETED SUCCESSFULLY",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getLoggedInUserDetails,
  emailPasswordLogin,
  registerUser,
  updateUser,
  updateEmergencyContact,
  saveEmergencyContact,
  deleteEmergencyContact,
};
