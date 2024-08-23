const Room = require("../models/room.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.RegisterNewRoom = async (req, res) => {
  try {
    console.log("start");
    const totalRooms = await Room.find({});
    const roomNumber = totalRooms.length + 1;
    console.log("Files received Backend : ", req.files);

    const roomImages = req.files ? req.files.map((file) => file.path) : [];
    console.log("All Files Backend : ", roomImages);

    const data = new Room({
      roomNo: roomNumber,
      roomType: req.body.roomtype,
      roomServantName: req.body.servantName,
      servantContact: req.body.servantContact,
      pricePerDay: req.body.price,
      roomImage: roomImages,
      roomDescription: req.body.descrip,
    });
    console.log("Data at Backend : ", data);
    await data.save();
    return res
      .status(201)
      .json({ success: true, message: "Room data saved successfully!" });
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Error in Saving Data",
        error: error.message,
      });
  }
};
