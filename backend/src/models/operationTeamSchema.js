const mongoose = require("mongoose");

const operationTeamSchema = new mongoose.Schema({
       firstName:{
        type: 'string',
        required: true,
       },
       lastName:{type: 'string', default: ''},
       contact_Details:{type: 'string',required: true},
       Address:{type: 'string',required: true},
       email:{type: 'string',required: true},
       password:{type: 'string',required: true},
       role:{type: 'string',default: 'operation'}
  });
const employeeDetails = mongoose.model("operationTeam",operationTeamSchema );
module.exports = employeeDetails;