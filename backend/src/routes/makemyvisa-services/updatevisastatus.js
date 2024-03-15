const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/update/visastatus", async (req, res) => {
  try {
    const { objectId, status } = req.body;
    const db = mongoose.connection;
    const collection = db.collection("visastatuses");
    const object = new mongoose.Types.ObjectId(objectId);
    const results = await collection.findOneAndUpdate(
      { _id: object },
      {
        $set: {
          "data.formData.status": status,
          "data.documentUpload": "successfully uploaded document",
        },
      },
      { new: true }
    );
    if (!results) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
