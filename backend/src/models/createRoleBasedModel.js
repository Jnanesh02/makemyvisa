const mongoose = require("mongoose");
const createRoleBasedModel = (department) => {
    if (mongoose.models[department]) {
        return mongoose.model(department);
      }
    const schema = new mongoose.Schema({
      firstName: { type: 'string', default: '' },
      lastName: { type: 'string', default: '' },
      contact_Details: { type: 'string', default: '' },
      email: { type: 'string', unique:true, default: '' },
      department:{type: 'string', default:department || '' },
      role: { type: 'string', default:  '' },
      status: {
        type: String,
        enum: ['Available', 'Occupied'],
        default: 'Available'
      },
      assignto:{
        ticketName: { type: 'string', default:''},
        ticketId: { type: 'string', default:''}
      }
   
    });
  
    return mongoose.model(department, schema);
  };

module.exports= {createRoleBasedModel};