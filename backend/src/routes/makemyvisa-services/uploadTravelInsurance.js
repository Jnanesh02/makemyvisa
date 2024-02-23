const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const travelInsuranceModel = require("../../models/travelInsurancemodel");

aws.config({
    accessKeyId: 'ASIAU6GD3PUE4FZLQYDU',
    secretAccessKey: 'CcneUpzC9OHzC42XRKuJ8y7Uy7mC3CBGH0ST9dfR',
    region: 'ap-south-1'
});
const s3 =  AWS.S3();

router.post('/api/upload', upload.single('files'), async (req, res) => {
    try {
        const uploadedFiles = [];
        const userId = req.body.userId; // Assuming userId is sent in the request body

            const params = {
                Bucket: 'makemyvisa-private-assets',
                Key: `${userId}-${Date.now()}-${file.originalname}`,
                Body: file.buffer
            };

            const uploadResult = await s3.upload(params).promise();
            const newFile = new travelInsuranceModel({
                filename: file.originalname,
                url: uploadResult.Location
            });
            await newFile.save();
            uploadedFiles.push({
                filename: file.originalname,
                url: uploadResult.Location
            });
        

        res.json({ message: 'Upload successful', data: uploadedFiles });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed' });
    }
});