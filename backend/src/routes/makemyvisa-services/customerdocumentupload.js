const express = require("express");
const router = express.Router();
const generatePresignedUrls = require("../../helper/generatepresignedurl");
router.get("/getPresignalUrl", async (req, res) => {
  try {
    const { numDocuments, customerId ,document} = req.query; // Request both numDocuments and customerId
    if (!numDocuments || !customerId ) {
      return res
        .status(400)
        .json({
          error: "Missing required parameters: numDocuments and customerId",
        });
    }
    const urls = await generatePresignedUrls(numDocuments, customerId,document);
    res.status(200).json({ message: urls });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;