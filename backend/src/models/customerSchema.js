const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
  },
  phone_number: {
    type: String,
    unique: true,
    default: "",
  },
  address:{
    type:String,
    default:"",
  },
  passport:{
    passportNumber:{
      type: String,
      default:"",
    },
    passportExpiry:{
      type: Date,
      default:"",
    },
  },
  social_media: {
    linkedinId: {
      type: String,
      default: "",
    },
    facebook: {
      facebookId: {
        type: String,
        default: "",
      },
      token: {
        type: String,
        default: "",
      },
    },
    googleId: {
      type: String,
      default: "",
    },
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  service_type: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  opt_expiry: {
    type: String,
    default: "",
  },
  questionnaires: [
    {
      question: {
        type: String,
        default: "",
      },
      answer: {
        type: String,
        default: "",
      },
    },
  ],
});

const customer = mongoose.model("customer", customerSchema);
module.exports = customer;
