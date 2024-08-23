const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("EmployeeDetail", employeeSchema);
