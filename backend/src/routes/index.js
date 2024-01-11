const customerRegistration = require("./customer/registration");
const customerLogin = require("./customer/login");
const customerLogout = require("./customer/logout");
const forgotpassword = require("./customer/forgotpassword");
const resetPassword = require("./customer/resetpassword");
const enquiries = require("./enquiry");
const socialmedia = require("./customer/socialmedia");
const employees = require("./Employee/employee-Login");
module.exports = {
  customerRegistration,
  customerLogin,
  customerLogout,
  forgotpassword,
  resetPassword,
  employees,
  enquiries,
  socialmedia,
};
