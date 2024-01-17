const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const Admin = require("../../models/adminSchema");
const OperationTeam = require("../../models/operationTeamSchema");
const {isAdmin} = require("../../middleware/authenication");

router.delete("/delete/:id",isAdmin,async(req,res)=>{
   const object_id=req.params.id;
   try {
      const existingEmployee = await Employee.findById({_id : object_id});
      switch (existingEmployee.role) {
         case "admin":
            await Admin.findByIdAndDelete({_id : object_id });
           break;
         case "operation":
            await OperationTeam.findByIdAndDelete({
            _id : object_id,
           });
           break;
       }
       await Employee.findByIdAndDelete({_id : object_id})
       res.status(200).json({ message: "successfully deleted" });

   } catch (error) {
      res.status(500).json({ message: error.message });

   }
});
module.exports = router;