const express = require('express');
const router = express.Router();
const Enquiry = require('../../models/enquirySchema');

router.post("/enquiries", async (req, res) => {
    try {
        const {
          name,
          email,
          phone_Number,
          subject,
          service_type,
          service_type_details,
          description,
        } = req.body;

        // Handle service details based on service_type
        let serviceTypeDetails = {};
        if (service_type === "visa") {
            serviceTypeDetails.visa = {
                visa_type: service_type_details.visa_type || "", 
            };
        } else if (service_type === "service") {
            serviceTypeDetails.service = {
                source: service_type_details.source || "", 
                destination: service_type_details.destination || "", 
            };
        } else {
            return res.status(400).json({ error: "Invalid service_type" });
        }

        // Create a new enquiry
        const newEnquiry = new Enquiry({
          name: name,
          email: email,
          phone_Number: phone_Number,
          subject: subject,
          service_type: service_type,
          service_type_details: serviceTypeDetails,
          description: description,
        });

        // Save the enquiry to the database
        await newEnquiry.save();

        res.status(201).json({ message: "Enquiry created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
