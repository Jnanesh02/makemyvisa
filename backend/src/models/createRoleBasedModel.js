const mongoose = require("mongoose");
const createRoleBasedModel = (role) => {
    if (mongoose.models[role]) {
        return mongoose.model(role);
      }
    const schema = new mongoose.Schema({
      firstName: { type: 'string', default: '' },
      lastName: { type: 'string', default: '' },
      contact_Details: { type: 'string', default: '' },
      email: { type: 'string', unique:true, default: '' },
      role: { type: 'string', default: role || '' },
    });
  
    return mongoose.model(role, schema);
  };

module.exports= {createRoleBasedModel};