const express = require("express");
const router = express.Router();
const countryServiceSchema = require("../models/countryServiceModel");
router.post("/create/newCountry",async(req,res)=>{
  try {
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