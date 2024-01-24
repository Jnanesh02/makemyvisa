const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const { createRoleBasedModel } = require("../../models/createRoleBasedModel");
const {isAdmin} = require("../../middleware/authenication");

router.delete("/delete/:id",isAdmin,async(req,res)=>{
   const object_id=req.params.id;
   try {
      const existingEmployee = await Employee.findById({_id : object_id});
      const oldCollectionModel = createRoleBasedModel(existingEmployee.role);
      await oldCollectionModel.findByIdAndDelete(object_id);
       await existingEmployee.findByIdAndDelete({_id : object_id})
       res.status(200).json({ message: "successfully deleted" });

   } catch (error) {
      res.status(500).json({ message: error.message });

   }
});
module.exports = router;