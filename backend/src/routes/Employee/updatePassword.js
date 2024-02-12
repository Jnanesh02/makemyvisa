const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const { createRoleBasedModel } = require("../../models/createRoleBasedModel");
const bcrypt = require("bcrypt");

router.put("/employee/updatePassword/:id", async (req, res) => {
  const object_id = req.params.id;
  const { password } = req.body;

  try {
    const existingEmployee = await Employee.findById({ _id: object_id });

    if (!existingEmployee) {
      return res.status(201).json({ message: "Employee ID not found" });
    }

    const hashedPassword = await hashPassword(password);
    
    // Dynamically determine the model based on the role
    const employeeRoleModel = createRoleBasedModel(existingEmployee.role);

    // Update the password in the Employee schema
    existingEmployee.password = hashedPassword;
    await existingEmployee.save();

    // Save the new password in the new collection
    const updatePassword = await employeeRoleModel.findByIdAndUpdate(
      { _id: object_id },
      { password: hashedPassword },
      { new: true } 
    );

    if (!updatePassword) {
      return res.status(500).json({ message: "Error updating password" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

module.exports = router;
