const mongoose = require("mongoose");

const createServiceCollectionSchema = (serviceType) => {
    if (mongoose.models && mongoose.models.servicesCollection) {
        return mongoose.models.servicesCollection;
    }
    const serviceCollectionSchema = new mongoose.Schema({
      serviceTypeName: {
        type: String,
        required: true,
      },
      serviceNameCollection: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: serviceType, 
        },
      ],
    });
  
    return mongoose.model("servicesCollection", serviceCollectionSchema);
  };

  module.exports =  createServiceCollectionSchema ;
