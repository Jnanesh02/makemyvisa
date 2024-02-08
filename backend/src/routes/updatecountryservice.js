const express = require("express");
const path = require('path');
const router = express.Router();
const countryServiceSchema = require("../models/countryServiceModel");

 const multer = require('multer');
const fs = require('fs');
const countryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/countryImages');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});


const countryUpload = multer({ storage: countryStorage });
router.put("/updateCountry/:id", countryUpload.fields([{ name: 'countryImage' }, { name: 'flagImage' }]), async (req, res) => {
  try {
    const object_id = req.params.id;
    const { countryName, description, serviceTypes } = req.body; 
    const existingCountry = await countryServiceSchema.findById(object_id);
    if (!existingCountry) {
      return res.status(409).json({ message: "Country service does not exist" });
    }

    const updatedCountry = {
      countryName,
      description: description, 
      serviceTypes: JSON.parse(serviceTypes) 
    };

    // Check if new countryImage and flagImage are provided in the request
    if (req.files['countryImage'] && req.files['flagImage']) {
      updatedCountry.countryImagePath = req.files['countryImage'][0].filename;
      updatedCountry.flagImagePath = req.files['flagImage'][0].filename;
    }

    // Update existing country object with new values
    Object.assign(existingCountry, updatedCountry);

    // Save the updated country object
    await existingCountry.save();

    return res.status(200).json({ message: "Country updated successfully", data: existingCountry });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});
 module.exports = router;