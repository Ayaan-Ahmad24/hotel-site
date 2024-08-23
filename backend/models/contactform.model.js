const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ContactForm", contactFormSchema);
