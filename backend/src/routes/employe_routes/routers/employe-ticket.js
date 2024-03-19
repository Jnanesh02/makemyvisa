const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
router.get("/employeeticket", async (req, res) => {
  try {
    const { employe_id, departmentName } = req.query;
    const db = mongoose.connection;
    const collection = db.collection(departmentName);
    const object_Id = new mongoose.Types.ObjectId(employe_id);
    const results = await collection.findOne({ _id: object_Id });
    if (!results) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
