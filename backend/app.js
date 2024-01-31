require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const googleAuth=require("./passport");
const session = require("express-session");
const makeMyVisa = require("./src/routes");
const crypto = require("crypto");
const { connect } = require("./config/database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL , methods: "GET,POST,PUT,DELETE", credentials: true }));

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
app.use("/makemyvisa", makeMyVisa.forgotpassword);
app.use("/makemyvisa", makeMyVisa.resetPassword);
app.use("/makemyvisa", makeMyVisa.updateCustomerDetails);
app.use("/makemyvisa", makeMyVisa.enquiries);
app.use("/makemyvisa", makeMyVisa.socialmedia);
//Employee Routes
app.use("/makemyvisa", makeMyVisa.employees);
app.use("/makemyvisa", makeMyVisa.employeesLogout);
app.use("/makemyvisa", makeMyVisa.getEmployeedetail);
app.use("/makemyvisa", makeMyVisa.deleteEmployeeData);
app.use("/makemyvisa", makeMyVisa.updateEmployeePassword);
app.use("/makemyvisa", makeMyVisa.adminUpdateEmployee);
app.use("/makemyvisa", makeMyVisa.updateEmpoyeeProfile);
app.use("/makemyvisa", makeMyVisa.departments);
app.use("/makemyvisa", makeMyVisa.countryService);


// Health check endpoint
app.get("/", function (req, res) {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});
