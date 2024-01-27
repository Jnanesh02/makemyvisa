const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../../models/employeeSchema");
const { isAdmin } = require("../../middleware/authenication");
const {createRoleBasedModel}=require("../../models/createRoleBasedModel");
// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const existingUser = await Employee.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }
   console.log(existingUser);
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

    // Generate a token with user details
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
      },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new employee account (accessible to admins only)
router.post("/createEmployee", async (req, res) => {
  try {
    const { firstName, lastName, contactDetails, address, email, role } =  req.body;
    // Check if the user with the given email already exists
    const existingUser = await Employee.findOne({ email: email });
    if (existingUser) {
      return res.status(201).json({ message: "Email already exists" });
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
    const EmployeeModel = createRoleBasedModel(role); // Use the dynamic model
    const newEmployeeRoleData = new EmployeeModel({
      _id:newEmployee._id,
      firstName: firstName,
      lastName: lastName,
      contact_Details: contactDetails,
      Address: address,
      email: email,
      password: generatePassword,
      role: role,
    });

    // Save the new employee to the database
    await newEmployeeRoleData.save();
    return res.status(200).json({ message: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/Admindashboard", async (req, res) => {
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
