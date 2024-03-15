const express = require("express");
const router = express.Router();
const Employee = require("../../../models/employeeSchema");
const { createRoleBasedModel } = require("../../../models/createRoleBasedModel");

router.put("/employee/update/:id", async (req, res) => {
  const object_id = req.params.id;
  const { firstName, lastName, email, phoneNumber,department, role, status } = req.body;

  try {
    const existingEmployee = await Employee.findById({ _id: object_id });

    if (!existingEmployee) {
      return res.status(400).json({ message: "User not Found" });
    }

    if (existingEmployee.department !== department) {
      // Remove the old document from the old collection
      const oldCollectionModel = createRoleBasedModel(existingEmployee.department);
      await oldCollectionModel.findByIdAndDelete(object_id);

      try {
        // Create a new document in the new collection
        const newModel = createRoleBasedModel(department);
        const newSchemaDocument = await newModel.create({
          firstName,
          lastName,
          email,
          phoneNumber,
          department,
          role,
          status,
        });
        existingEmployee.department = department;
        await existingEmployee.save();
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else {
      // Update the existing document
      existingEmployee._id =existingEmployee._id;
      existingEmployee.firstName = firstName;
      existingEmployee.lastName = lastName;
      existingEmployee.email = email;
      existingEmployee.phoneNumber = phoneNumber;
      existingEmployee.status = status;
      existingEmployee.department=department;
      existingEmployee.role = role;

      await existingEmployee.save();
    }

    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ message: "Error updating employee" });
  }
});

module.exports = router;
