const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./config/database").connect();
const passportStrategy = require("./config/passport");
const app = express();
const customerRouter = require("./src/routes");
app.use(cookieParser());

const session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/', 
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'None' 
    },
    
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/makemyvisa/customer", customerRouter.customerRegistration);
app.use("/makemyvisa/customer", customerRouter.customerLogin);
app.use("/makemyvisa/customer", customerRouter.customerLogout);
app.use("/makemyvisa/customer", customerRouter.customerDetails);
app.use("/makemyvisa/customer", customerRouter.updateCustomerDetails);
app.use("/makemyvisa/customer", customerRouter.forgotpassword);
app.use("/makemyvisa/customer", customerRouter.resetPassword);
app.use("/makemyvisa/customer", customerRouter.enquiries);
app.use("/makemyvisa/customer", customerRouter.socialmedia);

app.use("/makemyvisa/employee", customerRouter.employees);
app.use("/makemyvisa/employee", customerRouter.updateEmployeePassword);
app.use("/makemyvisa/employee", customerRouter.deleteEmployeeData);
app.use("/makemyvisa/employee", customerRouter.employeesLogout);
app.use("/makemyvisa/employee", customerRouter.adminUpdateEmployee);
app.use("/makemyvisa/employee", customerRouter.getEmployeedetail);
app.use("/makemyvisa/employee", customerRouter.updateEmpoyeeProfile);
app.use("/makemyvisa/employee",customerRouter.departments);


app.get("/", function (req, res) {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.listen(process.env.Port, (req, res) => {
  console.log("Server is running on http://localhost:" + process.env.Port);
});
