const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
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
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Rejected"],
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["Paid", "Unpaid"],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
