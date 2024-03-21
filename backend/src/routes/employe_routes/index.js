const adminUpdateEmployeeRoles= require("../employe_routes/routers/admin-manage_employee_roles");
const employeeAuthentication = require("../employe_routes/routers/authentication");
const employeeLogout = require("./routers/employee-logout");
const employeeDetail = require("../employe_routes/routers/employee-detail");
const employeeDelete = require("../employe_routes/routers/employee-delete");
const employeePasswordUpdate = require("../employe_routes/routers/employee-password-update");
const employeeProfileUpdate = require("../employe_routes/routers/employee-profile-update");
const departmentOperation = require("../employe_routes/routers/department-operations");
const departmentDetails = require("../employe_routes/routers/department-details");
const visaDocumentName = require("../employe_routes/routers/visa-document-name");
const employeTicket = require("../employe_routes/routers/employe-ticket");
const employePriceTicket = require("../employe_routes/routers/employee-ticketprice");

module.exports={
    adminUpdateEmployeeRoles,
    employeeAuthentication,
    employeeLogout,
    employeeDelete,
    employeePasswordUpdate,
    employeeProfileUpdate,
    departmentOperation,
    departmentDetails,
    employeeDetail,
    visaDocumentName,
    employeTicket,
    employePriceTicket
}