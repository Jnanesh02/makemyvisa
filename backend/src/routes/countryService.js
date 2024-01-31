const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const countryServiceSchema = require("../models/countryServiceModel");
 const storage= multer.diskStorage({
    destination:(req,res,cb)=>{
        const uploadPath= path.join(__dirname,"../../../../makemyvisa/frontend/src/assets/countriesImages/");
        cb(null, uploadPath);
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
 })
 const upload = multer({ storage: storage });
router.post("/create/newCountry",upload.single('image'),async(req,res)=>{
     try {
        const {countryName,description,image,serviceNames}=req.body;
        const existingCountry = await countryServiceSchema.findOne({countryName:countryName });
        if(existingCountry){
            return res.status(409).json({message: "Country already exits"});
        }
        const newCountry = new countryServiceSchema({countryName,description});
        if (image) {
            newCountry.image = req.file.filename
        }
        if(serviceNames && Array.isArray(serviceNames)){
            serviceNames.forEach(({serviceName}) =>{
                newCountry.serviceTypes.push({serviceName});
            })
        }
        await newCountry.save();
        return res.status(200).json({message:newCountry});

     } catch (error) {
        return res.status(500).json({message:error.message});
     }
});

router.get("/employee/getcountries",async(req,res)=>{
try {
    const getAllCountriesServices = await countryServiceSchema.find();
    return res.status(200).json({message:getAllCountriesServices});
} catch (error) {
    return res.status(500).json({message:error.message});
}
})
module.exports = router;