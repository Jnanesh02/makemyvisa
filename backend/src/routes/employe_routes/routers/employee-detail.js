const express = require("express");
const router = express.Router();
const Employee = require("../../../models/employeeSchema");

router.get("/employee/getEmployedetail/:id",async(req,res)=>{
    const object_id = req.params.id;
    try {
        const existingEmployee = await Employee.findById({_id:object_id});
        if(!existingEmployee){
            res.status(201).json({message:"UserId not Found"});
        }
        res.status(200).json({message: existingEmployee});
    } catch (error) {
        res.status(500).json({message: "Internal Error"});
    }
});
module.exports= router;