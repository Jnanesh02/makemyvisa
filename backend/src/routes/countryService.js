const express = require("express");
const router = express.Router();
const countryServiceSchema = require("../models/countryServiceModel");
const multer = require('multer');

const countryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, './uploads/countryImages/');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});


const countryUpload = multer({ storage: countryStorage });
router.post("/create/newCountry", countryUpload.fields([{ name: 'CountryImage' }, { name: 'FlagImage' }]),async(req,res)=>{
  try {
    console.log(req.body,req.files);
    const { countryName, description, serviceTypes } = req.body;
    const existingCountry = await countryServiceSchema.findOne({
      countryName: countryName,
    });

    if (existingCountry) {
      return res.status(409).json({ message: "Country already exists" });
    }

    const newCountry = new countryServiceSchema({
      countryName,
      description,
      countryImagePath: req.files['CountryImage'][0].filename,
      flagImagePath: req.files['FlagImage'][0].filename,
      serviceTypes: [],
    });

    if (serviceTypes && Array.isArray(serviceTypes)) {
      serviceTypes.forEach(({ serviceName, description: serviceDescription, subServiceTypes }) => {
        const newServiceType = {
          serviceName,
          description: serviceDescription,
          subServiceTypes: [],
        };

        if (subServiceTypes && Array.isArray(subServiceTypes)) {
          subServiceTypes.forEach(({ subServiceName, subServiceDescription }) => {
            newServiceType.subServiceTypes.push({
              subServiceName,
              description: subServiceDescription,
            });
          });
        }

        newCountry.serviceTypes.push(newServiceType);
      });
    }

    await newCountry.save();
    return res.status(200).json({ message: newCountry });
  } catch (error) {
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