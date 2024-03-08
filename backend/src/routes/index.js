const customerRegistration = require("./customer/registration");
const customerLogin = require("./customer/login");
const customerLogout = require("./customer/logout");
const customerDetails = require("./customer/getCustomer");
const forgotPassword = require("./customer/forgotPassword");
const resetPassword = require("./customer/resetPassword");
const updateCustomerDetails = require("./customer/updateCustomer");
const socialMedia = require("./customer/socialMedia");

const enquiries = require("./enquiry/enquiry");


const employees = require("./employee/employeeAuthentication");
const employeesLogout = require("./employee/logout");
const getEmployeedetail = require("./employee/getEmployee");
const deleteEmployeeData = require("./employee/deleteEmployee");
const updateEmployeePassword = require("./employee/updatePassword");
const adminUpdateEmployee= require("./employee/adminUpdate");
const updateEmpoyeeProfile = require("./employee/updateEmpoyeeProfile");
const departments = require("./employee/departments");

const countryService = require("./country/countryService");
const updatecountryService = require("./country/updateCountryService");
const deleteCountryService=require("./country/deleteCountryService")
const services = require("./makemyvisa-services/services");
const notifications = require("./notification/notification");
const uploadTravelInsurance = require("./makemyvisa-services/uploadTravelInsurance");


const visaDocName = require("./employee/VisaDocumentsName")



module.exports = {
  customerRegistration,
  customerLogin,
  customerLogout,
  forgotPassword,
  resetPassword,
  updateCustomerDetails,
  employees,
  enquiries,
  socialMedia,
  employeesLogout,
  deleteEmployeeData,
  updateEmployeePassword,
  customerDetails,
  getEmployeedetail,
  adminUpdateEmployee,
  updateEmpoyeeProfile,
  departments,
  countryService,
  updatecountryService,
  deleteCountryService,
  services,
  notifications,
  uploadTravelInsurance,
  visaDocName
};
