const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const {createRoleBasedModel}=require("../../models/createRoleBasedModel");

router.put("/employee/updateprofile/:id", async (req, res) => {
    const object_id = req.params.id;
    try {
        const { firstName, lastName, phoneNumber, email, address } = req.body;
        const existingEmployee = await Employee.findById({ _id: object_id });
        if (!existingEmployee) {
            return res.status(201).json({ message: "UserId not Found" });
        }

        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.email = email;
        existingEmployee.contact_Details = phoneNumber;
        existingEmployee.Address = address;
        await existingEmployee.save();
        const employeeDetailsModel = createRoleBasedModel(existingEmployee.role);
        const employeeDetails = await employeeDetailsModel.findById({ _id: object_id });

        if (!employeeDetails) {
            return res.status(201).json({ message: "Employee details not found" });
        }
        
        employeeDetails.firstName = firstName;
        employeeDetails.lastName = lastName;
        employeeDetails.email = email;
        employeeDetails.contact_Details = phoneNumber;
        employeeDetails.Address = address;
        await employeeDetails.save();

        return res.status(200).json({ message: "Successfully updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
