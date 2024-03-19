require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const googleAuth = require("./passport");
const session = require("express-session");
const makeMyVisa = require("./src/routes");
const crypto = require("crypto");
const path = require("path");
const { connect } = require("./config/database");
const app = express();
app.use("/uploads/countryImages", express.static("uploads/countryImages/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours in milliseconds
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to the database
connect();
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//Customers Routes
app.use("/makemyvisa", makeMyVisa.customerRegistration);
app.use("/makemyvisa", makeMyVisa.customerLogin);
app.use("/makemyvisa", makeMyVisa.customerLogout);
app.use("/makemyvisa", makeMyVisa.customerDetails);
app.use("/makemyvisa", makeMyVisa.forgotPassword);
app.use("/makemyvisa", makeMyVisa.resetPassword);
app.use("/makemyvisa", makeMyVisa.updateCustomerDetails);
app.use("/makemyvisa", makeMyVisa.enquiries);
app.use("/makemyvisa", makeMyVisa.socialMedia);
app.use("/makemyvisa", makeMyVisa.services);

//Employee Routes
app.use("/makemyvisa", makeMyVisa.employe_Routers.employeeAuthentication);
app.use("/makemyvisa", makeMyVisa.employe_Routers.employeeLogout);
app.use("/makemyvisa", makeMyVisa.employe_Routers.employeeDetail);
app.use("/makemyvisa", makeMyVisa.employe_Routers.employeeDelete);
app.use("/makemyvisa", makeMyVisa.employe_Routers.employeePasswordUpdate);
app.use("/makemyvisa", makeMyVisa.employe_Routers.adminUpdateEmployeeRoles);
app.use("/makemyvisa", makeMyVisa.employe_Routers.employeeProfileUpdate);
app.use("/makemyvisa", makeMyVisa.employe_Routers.departmentOperation);
app.use("/makemyvisa", makeMyVisa.employe_Routers.visaDocumentName);
app.use("/makemyvisa", makeMyVisa.employe_Routers.departmentDetails);
app.use("/makemyvisa", makeMyVisa.employe_Routers.employeTicket);

//AssignTicket
app.use("/makemyvisa", makeMyVisa.assignTo);
//Country Routes
app.use("/makemyvisa", makeMyVisa.countryService);
app.use("/makemyvisa", makeMyVisa.updatecountryService);
app.use("/makemyvisa", makeMyVisa.deleteCountryService);
//notofication
app.use("/makemyvisa", makeMyVisa.notifications);
app.use("/makemyvisa", makeMyVisa.uploadTravelInsurance);
//preSingalUrl
app.use("/makemyvisa", makeMyVisa.preSignalUrl);
//updatevisaStatusTicket
app.use("/makemyvisa", makeMyVisa.visaStatusUpdate);

// Health check endpoint
app.get("/", function (req, res) {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
