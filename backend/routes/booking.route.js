const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking.controller");

router.post("/request-booking", bookingController.requestBooking);

router.post("/handle-booking", bookingController.handleBookingRequest);

module.exports = router;
