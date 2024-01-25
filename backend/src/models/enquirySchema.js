const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_Number: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    service_type: {
      type: String,
      enum: ["visa", "service"], // Assuming service_type can only be "visa" or "service"
      required: true,
    },
    service_type_details: {
      visa: {
        visa_type: {
          type: String,
          default: "", // Provide a default value if necessary
        },
      },
      service: {
        source: {
          type: String,
          default: "", // Provide a default value if necessary
        },
        destination: {
          type: String,
          default: "", // Provide a default value if necessary
        },
      },
    },
    description: {
      type: String,
      required: true,
    },
  });
const enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = enquiry;