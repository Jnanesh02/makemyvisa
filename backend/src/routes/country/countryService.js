const express = require("express");
const path = require('path');
const router = express.Router();
const countryServiceSchema = require("../../models/countryServiceModel");

const multer = require('multer');
const fs = require('fs');
const countryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../uploads/countryImages');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});


const countryUpload = multer({ storage: countryStorage });

router.post("/create/newCountry", countryUpload.fields([{ name: 'countryImagePath' }, { name: 'flagImagePath' }]), async (req, res) => {
  try {
    console.log("file:",req.files);
    console.log("body:",req.body);

    const { countryName, description, serviceTypes } = req.body; // Changed description to descriptions
    const existingCountry = await countryServiceSchema.findOne({
      countryName: countryName,
    });

    if (existingCountry) {
      return res.status(409).json({ message: "Country already exists" });
    }

    const newCountry = new countryServiceSchema({
      countryName,
      description: description, // Changed description to descriptions
      countryImagePath: req.files['countryImagePath'][0].filename,
      flagImagePath: req.files['flagImagePath'][0].filename,
      serviceTypes: JSON.parse(serviceTypes) // Parse serviceTypes string as JSON
    });

    if (newCountry.serviceTypes && Array.isArray(newCountry.serviceTypes)) {
      newCountry.serviceTypes = newCountry.serviceTypes.map(({ serviceName, description: serviceDescription, subServiceTypes }) => {
        const newServiceType = {
          serviceName,
          description: serviceDescription,
          subServiceTypes: subServiceTypes.map(({ subServiceName, description: subServiceDescription }) => ({ 
            subServiceName,
            description: subServiceDescription,
          }))
        };
        return newServiceType;
      });
    }

    await newCountry.save();
    return res.status(200).json({ message: "New country created successfully", data: newCountry });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});
router.get("/getcountries", async (req, res) => {
    try {
      const getAllCountriesServices = await countryServiceSchema.find();
      
      if (getAllCountriesServices.length === 0) {
        return res.status(200).json({ message: "No countries found" });
      }
  
      return res.status(200).json({ message: getAllCountriesServices });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;