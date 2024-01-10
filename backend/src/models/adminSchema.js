const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
       firstName:{
        type: 'string',
        required: true,
       },
       lastName:{type: 'string', default: ''},
       contact_Details:{type: 'string',required: true},
       Address:{type: 'string',required: true},
       email:{type: 'string',required: true},
       password:{type: 'string',required: true},
       role:{type: 'string',default: 'Admin'}
  });
const employeeDetails = mongoose.model("Admin", employeeSchema);
module.exports = employeeDetails;