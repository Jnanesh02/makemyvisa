const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const employee = require("../../models/employeeSchema");
const admin = require("../../models/adminSchema");
const operationTeam = require("../../models/operationTeamSchema");
const isAdmin = require("../../middleware/authenication");
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await employee.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }
    if (existingUser.inActive) {
      return res.status(403).json({ message: "Employee is not active" });
    }
    switch (existingUser.role) {
      case "admin":
        const existingAdmin = await admin.findOne({
          email: existingUser.email,
        });
         req.session.user ={
          id: existingAdmin._id,
          role: existingAdmin.role
         }
        return res.status(200).json({ message: existingAdmin});
      case "operation":
        const existingOperationTeam = await operationTeam.findOne({
          email: existingUser.email,
        });

        return res.status(200).json({ message: existingOperationTeam });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
// Route to create an employee account (accessible to admins only)
router.post("/createEmployee", isAdmin, async (req, res) => {
  try {
    // Add logic to create an employee account
    // Extract relevant information from the request body
    // Check if an employee with the provided email already exists
    // Hash the password before saving to the database
    // Create a new employee
    // Save the new employee to the database

    res.status(200).json({ message: 'Employee account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
