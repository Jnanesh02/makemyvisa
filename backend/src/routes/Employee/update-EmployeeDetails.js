const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const Admin = require("../../models/adminSchema");
const OperationTeam = require("../../models/operationTeamSchema");
router.put("/update/:id", async (req, res) => {
    const object_id = req.params.id
    const { firstName, lastName, email, phoneNumber, role, status } = req.body;
  try {
    const existingEmployee = await Employee.findById({ _id: object_id })
    if (!existingEmployee) {
        return res.status(400).json({ message: "User not Found" });
    }
    if (existingEmployee.role !== role) {
        switch (existingEmployee.role) {
            case "admin":
                await Admin.findByIdAndDelete(object_id)
                break;
            case "operation":
                await OperationTeam.findByIdAndDelete(object_id)
                break;
            default:
                break;
        }
        existingEmployee.role = role;
        await existingEmployee.save();
        let newSchemaDocument;
        switch (existingEmployee.role) {
            case "admin":
                newSchemaDocument = await Admin.create(existingEmployee.toObject());                
                break;
                case "operation":
                    newSchemaDocument = await OperationTeam.create(existingEmployee.toObject());                
                    break;
            default:
                break;
        }
    }else{
         
        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.email = email;
        existingEmployee.phoneNumber= phoneNumber;
        existingEmployee.status= status;
        await existingEmployee.save();

        switch(existingEmployee.role){
            case "admin":
                await Admin.findByIdAndUpdate(object_id,{
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    status
                });
                case "operation":
                    await OperationTeam.findByIdAndUpdate(object_id, {
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        status
                    });
                    break;
        }
    }
    return res.status(200).json({message:"Succesfully updated"})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

});
module.exports = router