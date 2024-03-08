const express = require('express');
const router = express.Router();
const visaDocName = require("../../models/visaDocumentNameSchema");

router.post("/employee/create/visaDocumentName", async (req, res) => {
  try {
    
    const { documentName,description } = req.body;
    
    // Check if a model with the specified role already exists
    const existingModel =await visaDocName.findOne({documentName: documentName});

    // If the model already exists, return an error
    if (existingModel) {
      return res.status(400).json({ error: `Role '${documentName}' already exists.` });
    }

    // If the model doesn't exist, create a new one
    const visaDocNameModel = new visaDocName({
        documentName:documentName,
        description:description,
    });
    await visaDocNameModel.save();

    res.status(201).json({ message: 'VisaDocumentName created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/employee/get/visaDocumentName", async (req, res) => {
    try {
  const uniqueVisaDoc = await visaDocName.find();
      res.status(200).json({ message: uniqueVisaDoc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
