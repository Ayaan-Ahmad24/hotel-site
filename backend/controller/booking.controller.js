const Booking = require("../models/booking.model");
const Room = require("../models/room.model");
const mongoose = require("mongoose");

module.exports.requestBooking = async (req, res) => {
  try {
    const { guestId, roomId, arrivalDate, departureDate } = req.body;

    // Log the roomId to ensure it's being passed correctly
    console.log("Room ID:", roomId);

    const room = await Room.findById(roomId);

    // Log the room object to ensure it's being fetched correctly
    console.log("Room:", room);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    if (!room.availabilityStatus) {
      return res.status(400).json({
        success: false,
        message: "Room is not available for booking.",
      });
    }

    const totalAmount =
      room.pricePerDay *
      ((new Date(departureDate) - new Date(arrivalDate)) /
        (1000 * 60 * 60 * 24));

    // Use `new mongoose.Types.ObjectId()` to correctly instantiate the ObjectId
    const newBooking = new Booking({
      guestId: new mongoose.Types.ObjectId(guestId),
      roomId: new mongoose.Types.ObjectId(roomId),
      arrivalDate,
      departureDate,
      status: "Pending",
      paymentStatus: "Unpaid",
      bookingDate: new Date(),
      totalAmount,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking request sent successfully.",
      booking: newBooking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in sending booking request",
      error: error.message,
    });
  }
};

module.exports.handleBookingRequest = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId).populate("roomId");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Booking has already been processed.",
      });
    }

    // Log action to ensure correct action is being performed
    console.log("Action:", status);

    if (status === "approve") {
      booking.status = "Approved";
      booking.roomId.availabilityStatus = false;
      await booking.save();
      await booking.roomId.save();

      res.status(200).json({
        success: true,
        message: "Booking approved and room is now booked.",
        booking,
      });
    } else if (status === "reject") {
      booking.status = "Rejected";
      await booking.save();

      res.status(200).json({
        success: true,
        message: "Booking rejected.",
        booking,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid action." });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in handling booking request",
      error: error.message,
    });
  }
};
