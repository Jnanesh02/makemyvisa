const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
    department: {
        type: String,
        unique: true,
      },
      status: {
        type: String,
        enum: ['active', 'inactive'], 
        default: 'active', 
      },
      description: {
        type: String,
        required: true,
      },
});
const department = mongoose.model("department", departmentSchema);
module.exports = department;