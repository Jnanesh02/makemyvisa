const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const Admin = require("../../models/adminSchema");
const OperationTeam = require("../../models/operationTeamSchema");
const bcrypt = require("bcrypt");

router.put("/updatePassword/:id", async (req, res) => {
    const object_id = req.params.id;
    const { password } = req.body;
    try {
        const existingEmployee = await Employee.findById({ _id: object_id });
        if (!existingEmployee) {
            res.status(201).json({ message: "employee id not found" })
        }
        const hashingPassword =await bcrypt.hash(password, 10)

        switch (existingEmployee.role) {
            case "admin":
                const adminDetails = await Admin.findById({ _id: existingEmployee._id });
                if (!adminDetails) {
                    return res.status(404).json({ message: "adminDetails details not found" });
                }
                adminDetails.password = hashingPassword
                await adminDetails.save();
                break;
            case "operation":
                const operationTeamDetails = await OperationTeam.findById({ _id: existingEmployee._id });
                if (!operationTeamDetails) {
                    return res.status(404).json({ message: "Operation Team details not found" });
                }
                operationTeamDetails.password = hashingPassword
                await operationTeamDetails.save();
                break;
        }
        existingEmployee.password = hashingPassword;
        await existingEmployee.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Error" });

    }
})
module.exports = router