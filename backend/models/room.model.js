const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
    unique: true,
  },
  roomType: {
    type: String,
    required: true,
    enum: ["Single", "Double"],
  },
  roomServantName: {
    type: String,
    required: true,
  },
  servantContact: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  roomImage: {
    type: [String],
  },
  roomDescription: {
    type: String,
  },
  availabilityStatus: {
    type: Boolean,
    default: true,
  },
  bookingHistory: [
    {
      guestId: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
      arrivalDate: Date,
      departureDate: Date,
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
