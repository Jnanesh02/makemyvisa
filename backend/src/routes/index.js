const customerRegistration = require("./customer/registration");
const customerLogin = require("./customer/login");
const customerLogout = require("./customer/logout");
const customerDetails = require("./customer/getCustomer");
const forgotPassword = require("./customer/forgotPassword");
const resetPassword = require("./customer/resetPassword");
const updateCustomerDetails = require("./customer/updateCustomer");
const socialMedia = require("./customer/socialMedia");

const enquiries = require("./enquiry/enquiry");
// employee Routes
const employe_Routers = require("./employe_routes");


const assignTo = require("./ticketAssign/ticketAssignTo");
const countryService = require("./country/countryService");
const updatecountryService = require("./country/updateCountryService");
const deleteCountryService=require("./country/deleteCountryService")
const services = require("./makemyvisa-services/services");
const notifications = require("./notification/notification");
const uploadTravelInsurance = require("./makemyvisa-services/uploadTravelInsurance");


const visaStatusUpdate = require("./makemyvisa-services/updatevisastatus");
const preSignalUrl = require("../routes/makemyvisa-services/customerdocumentupload")

module.exports = {
  customerRegistration,
  customerLogin,
  customerLogout,
  forgotPassword,
  resetPassword,
  updateCustomerDetails,
  enquiries,
  socialMedia,
  customerDetails,
  countryService,
  updatecountryService,
  deleteCountryService,
  services,
  notifications,
  uploadTravelInsurance,
  assignTo,
  preSignalUrl,
  visaStatusUpdate,
  employe_Routers

};
