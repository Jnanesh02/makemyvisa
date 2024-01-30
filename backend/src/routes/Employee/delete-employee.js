const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const { createRoleBasedModel } = require("../../models/createRoleBasedModel");
const {isAdmin} = require("../../middleware/authenication");

router.delete("/employee/delete/:id",async(req,res)=>{
   const object_id=req.params.id;
   try {
      const existingEmployee = await Employee.findById(object_id);
      console.log(existingEmployee);
      
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      
      const oldCollectionModel = createRoleBasedModel(existingEmployee.role);
      console.log(oldCollectionModel);
      
      await oldCollectionModel.deleteOne({ _id: object_id });
      await Employee.deleteOne({ _id: object_id });
      res.status(200).json({ message: "successfully deleted" });


   } catch (error) {
      res.status(500).json({ message: error.message });

   }
});
module.exports = router;