const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
    role: {
        type: String,
        unique: true,
      },
      status: {
        type: "string",
        enum: ["active", "inactive"], 
        default: "active", 
      },
      description: {
        type: String,
        required: true,
      },
});
const department = mongoose.model("department", departmentSchema);
module.exports = department;