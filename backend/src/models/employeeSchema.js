const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: { type: "string", default: "" },
  contact_Details: { type: "string", required: true },
  Address: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
  role: {
    type: "string",
    enum: ["admin", "operation", "bussiness"],
    default: "operation",
  },
  status: { type: "string", enum: ["active", "inActive"], default: "active" },
});
const employeeDetails = mongoose.model("employeeschemas", employeeSchema);
module.exports = employeeDetails;
