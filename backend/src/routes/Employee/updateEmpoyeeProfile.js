const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const Admin = require("../../models/adminSchema");
const OperationTeam = require("../../models/operationTeamSchema");
router.put("/updateprofile/:id", async (req, res) => {
    const object_id = req.params.id;
    try {
        const { firstName, lastName,phoneNumber, email,address } = req.body;
        const existingEmployee = await Employee.findById({_id:object_id});
        if(!existingEmployee){
            return res.status(201).json({message: "UserId not Found"});
        }
           
        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.email = email;
        existingEmployee.contact_Details=phoneNumber;
        existingEmployee.Address=address;
        await existingEmployee.save();
        let employeeDetails;
        switch(existingEmployee.role){
            case "admin":
                employeeDetails= await Admin.findById({_id:object_id});
                break;
                case "operation":
                 employeeDetails = await OperationTeam.findById({_id:object_id});
                    break;
        }
        employeeDetails.firstName =firstName;
        employeeDetails.lastName= lastName;
        employeeDetails.email=email;
        employeeDetails.contact_Details=phoneNumber;
        employeeDetails.Address = address;
        await employeeDetails.save();
        return res.status(200).json({message:"Succesfully updated"});

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});

    }
});
module.exports = router;