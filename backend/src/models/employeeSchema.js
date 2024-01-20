const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: { type: "string", default: "" },
  contact_Details: { type: "string" },
  Address: { type: "string" },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  role: {
    type: "string",
    enum: ["admin", "operation", "bussiness"],
    default: "operation",
  },
  status: {
    type: "string",
    enum: ["active", "inactive"], 
    default: "active", 
  },
});
const employeeDetails = mongoose.model("employeeschemas", employeeSchema);
module.exports = employeeDetails;
