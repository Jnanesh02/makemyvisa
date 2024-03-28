const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const travelInsuranceModel = require("../../models/travelInsurancemodel");
const multer = require("multer");
const upload = multer();
const s3 = new aws.S3();

router.post("/api/upload", upload.single("fileUpload"), async (req, res) => {
  try {
   
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { insuranceName,duration,cost,countries} = req.body;
    if(!insuranceName && !duration && !cost && !countries) {
      return res.status(400).json({ message: "Missing required fields in request body" });
    }
    const file = req.file;
    const params = {
      Bucket: "makemyvisa-public-assets",
      Key: `${"TravelInsurance"}-${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };
    try {
      const uploadResult = await s3.upload(params).promise();
      const newFile = new travelInsuranceModel({
        filename: req.file.originalname,
        key:params.Key,
        insuranceName:insuranceName,
        duration:duration,
        cost:cost,
        countriesApplicable: countries.split(',').map((country) => country.trim()),
      });
      await newFile.save();
      return res.status(200).json({ message: "Upload successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
});
router.get("/allTravelInsurance",async(req, res)=>{
try {
  const InsuranceCollection = await travelInsuranceModel.find();
  res.status(200).json(InsuranceCollection);
} catch (error) {
  res.status(500).json({message: error.message});

}
});

router.delete('/delete/insurance/:id',async(req,res)=>{
try {
  const objectId = req.params.id;
 const insuranceDoc = await travelInsuranceModel.findById({_id: objectId});
 if(!insuranceDoc){
  return res.status(404).json({message:'Insurance not found'})
 }
const insuranceDocKey = insuranceDoc.key;
 await travelInsuranceModel.findByIdAndDelete({_id: objectId});
if(insuranceDocKey){
  console.log(insuranceDocKey);
  const params= {
    Bucket: "makemyvisa-public-assets",
    Key: insuranceDocKey,
  };
  await s3.deleteObject(params).promise()
  .then(() => console.log("Deletion successful"))
  .catch((error) => {
    if (error.code === 'NoSuchKey') {
      console.log("Object not found:", insuranceDocKey);
    } else if (error.code === 'AccessDenied') {
      console.error("Insufficient permissions to delete object:", insuranceDocKey);
    } else {
      console.error("Error deleting object:", insuranceDocKey, error);
    }
  });
  
}
 return res.status(200).json({message: 'deleted successfully'});
} catch (error) {
  return res.status(500).json({message:"Internal Server Error"});
}

});

// router.get("/api/files/:countryName", async (req, res) => {
//     try {
//       const countryName = req.params.countryName;
//       const documents = await travelInsuranceModel.find({countriesApplicable: countryName}).exec();
//       const combinedData = documents.map((document)=>({
//         ...document,
//         url: `${process.env.Public_Url}/${document.key}`,
//       }));
     
//         return res.status(200).json(combinedData);
  
//     } catch (error) {
//       console.error("Error retrieving files:", error);
//       res.status(500).json({ message: "Error retrieving files" });
//     }
//   });



router.get("/api/files/:countryName", async (req, res) => {
  try {
    const countryName = (req.params.countryName).replace(" ", "");
    console.log("CountryName",countryName);
    const documents = await travelInsuranceModel.find({countriesApplicable: countryName}).exec();
    // const combinedData = documents.map((document)=>({
    //   ...document,
    //   url: `${process.env.Public_Url}/${document.key}`,
    // }));
    // console.log("documents",documents);
      return res.status(200).json(documents);

  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).json({ message: "Error retrieving files" });
  }
});



module.exports = router;
