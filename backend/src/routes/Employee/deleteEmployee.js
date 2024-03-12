const express = require("express");
const router = express.Router();
const Employee = require("../../models/employeeSchema");
const mongoose = require("mongoose");
const { isAdmin } = require("../../middleware/authenication");

router.delete("/employee/delete/:id", async (req, res) => {
  const object_id = req.params.id;
  try {
    const existingEmployee = await Employee.findById(object_id);

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const db = mongoose.connection;
    const connection = db.collection(`${existingEmployee.department}s`);
    const employeeObjectId = new mongoose.Types.ObjectId(object_id);
    const result = await connection.findOneAndDelete({ _id: employeeObjectId });

    if (!result) {
      return res
        .status(500)
        .json({ message: "Deletion failed. Please try again." });
    }
    await Employee.findByIdAndDelete({ _id: object_id });
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
