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
const getEmployeedetail = require("./Employee/getEmployee");
const deleteEmployeeData = require("./Employee/delete-employee");
const updateEmployeePassword = require("./Employee/update-password");
const adminUpdateEmployee= require("./Employee/AdminUpdateEmpoyeRole");
const updateEmpoyeeProfile = require("./Employee/updateEmpoyeeProfile");
const departments = require("./Employee/departments");

const countryService = require("./countryService");
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
  customerDetails,
  getEmployeedetail,
  adminUpdateEmployee,
  updateEmpoyeeProfile,
  departments,
  countryService
};
