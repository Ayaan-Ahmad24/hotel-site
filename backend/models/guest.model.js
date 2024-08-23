const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  numberOfChildren: {
    type: Number,
    default: 0,
  },
  numberOfAdults: {
    type: Number,
    required: true,
  },
  bookedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Guest", guestSchema);
