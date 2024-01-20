const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../../models/employeeSchema");
const Admin = require("../../models/adminSchema");
const OperationTeam = require("../../models/operationTeamSchema");
const { isAdmin } = require("../../middleware/authenication");

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.path);
    // Check if the user exists
    const existingUser = await Employee.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // If the password starts not with "TEMP_", prompt the user to reset it
    if (!existingUser.password.startsWith("TEMP_")) {
      // Check if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    // Check if the user is inactive
    if (existingUser.inActive) {
      return res.status(403).json({ message: "Employee is not active" });
    }

    // Retrieve user details based on the role
    let userDetails;
    switch (existingUser.role) {
      case "admin":
        userDetails = await Admin.findOne({ email: existingUser.email });
        break;
      case "operation":
        userDetails = await OperationTeam.findOne({
          email: existingUser.email,
        });
        break;
    }

    // Generate a token with user details
    const token = jwt.sign(
      {
        id: userDetails._id,
        role: userDetails.role,
      },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: userDetails, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new employee account (accessible to admins only)
router.post("/createEmployee", isAdmin, async (req, res) => {
  try {
    const { firstName, lastName, contactDetails, address, email, role } =
      req.body;
  console.log(req.body);
    // Check if the user with the given email already exists
    const existingUser = await Employee.findOne({ email: email });
    if (existingUser) {
      return res.status(204).json({ message: "Email already exists" });
    }

    // Generate a temporary password for the new employee
    const generatePassword = `TEMP_${Math.random().toString(36).slice(-8)}`;

    // Create a new employee instance
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      contact_Details: contactDetails,
      Address: address,
      email: email,
      password: generatePassword,
      role: role,
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Create user details based on the role
    let userDetails;
    switch (newEmployee.role) {
      case "admin":
        userDetails = new Admin({
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          contact_Details: newEmployee.contact_Details,
          Address: newEmployee.Address,
          email: newEmployee.email,
          password: newEmployee.password,
          role: newEmployee.role,
          _id: newEmployee._id,
        });
        break;
      case "operation":
        userDetails = new OperationTeam({
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          contact_Details: newEmployee.contact_Details,
          Address: newEmployee.Address,
          email: newEmployee.email,
          password: newEmployee.password,
          role: newEmployee.role,
          _id: newEmployee._id,
        });
        break;
    }

    // Save the user details to the database
    await userDetails.save();

    // Return the details of the created user in the response
    return res.status(200).json({ message: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/Admindashboard", isAdmin, async (req, res) => {
  try {
    res.redirect("/admindashboard");
  } catch (err) {
    res.redirect("/login"); 
  }
});

router.get("/employeData", isAdmin, async (req, res) => {
  try {
    const employeeData = await Employee.find();
    return res.status(200).json({ employeeData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
