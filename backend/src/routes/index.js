const customerRegistration = require("./customer/registration");
const customerLogin = require("./customer/login");
const customerLogout = require("./customer/logout");
const customerDetails = require("./customer/getCustomer");
const forgotpassword = require("./customer/forgotpassword");
const resetPassword = require("./customer/resetpassword");
const updateCustomerDetails = require("./customer/updateCustomer");

const enquiries = require("./enquiry");
const socialmedia = require("./customer/socialmedia");
const employees = require("./Employee/employee-Login");
const employeesLogout = require("./Employee/logout");
const deleteEmployeeData = require("./Employee/delete-employee");
const updateEmployeePassword = require("./Employee/update-password");
const updateEmployeeDetails = require("./Employee/update-EmployeeDetails")

module.exports = {
  customerRegistration,
  customerLogin,
  customerLogout,
  forgotpassword,
  resetPassword,
  updateCustomerDetails,
  employees,
  enquiries,
  socialmedia,
  employeesLogout,
  deleteEmployeeData,
  updateEmployeePassword,
  updateEmployeeDetails,
  customerDetails
};
