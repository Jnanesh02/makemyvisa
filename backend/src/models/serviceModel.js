const mongoose = require("mongoose");

const createServiceBasedSchema = (serviceType) => {
  if (mongoose.models[serviceType]) {
    return mongoose.model(serviceType);
  }

  const schema = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed,
    ticketStatus: {
      type: String,
      default: "submit",
    },
    paymentDetails: {
      type: String,
      default: "",

    },
    price: {
      type: String,
      default: "",

    },
    customerId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
      },
  });

  return mongoose.model(serviceType, schema); // Use serviceType as the model name
};

module.exports = createServiceBasedSchema;
