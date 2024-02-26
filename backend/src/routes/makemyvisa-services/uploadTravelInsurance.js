const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const travelInsuranceModel = require("../../models/travelInsurancemodel");
const multer = require("multer");
const upload = multer();
const s3 = new aws.S3();

router.post("/api/upload", upload.single("fileUpload"), async (req, res) => {
  try {
    // aws.config.update({
    //   accessKeyId: process.env.AWS_ACCESS_KEY,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   region: process.env.AWS_REGION,
    // });
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { countryName } = req.body;
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
        countriesApplicable: countryName,
      });
      await newFile.save();
      return res.status(200).json({ message: "Upload successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }c
});
router.get("/api/files/:countryName", async (req, res) => {
    try {
      const countryName = req.params.countryName;
      const documents = await travelInsuranceModel.find({countriesApplicable: countryName}).exec();
      const combinedData = documents.map((document)=>({
        ...document,
        url: `${process.env.Public_Url}/${document.key}`,
      }));
     
        return res.status(200).json(combinedData);
  
    } catch (error) {
      console.error("Error retrieving files:", error);
      res.status(500).json({ message: "Error retrieving files" });
    }
  });
module.exports = router;
