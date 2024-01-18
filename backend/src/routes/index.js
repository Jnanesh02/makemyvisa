const customerRegistration = require("./customer/registration");
const customerLogin = require("./customer/login");
const customerLogout = require("./customer/logout");
const forgotpassword = require("./customer/forgotpassword");
const resetPassword = require("./customer/resetpassword");
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
  employees,
  enquiries,
  socialmedia,
  employeesLogout,
  deleteEmployeeData,
  updateEmployeePassword,
  updateEmployeeDetails
};
