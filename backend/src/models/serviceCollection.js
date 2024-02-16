const mongoose = require("mongoose");

const createServiceCollectionSchema = (serviceType) => {
    if (mongoose.models && mongoose.models.servicesCollection) {
        return mongoose.models.servicesCollection;
    }
    const serviceCollectionSchema = new mongoose.Schema({
      serviceTypeName: {
        type: String,
        required: true,
      }
    });
  
    return mongoose.model("servicesCollection", serviceCollectionSchema);
  };

  module.exports =  createServiceCollectionSchema ;
