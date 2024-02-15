const express = require("express");
const path = require('path');
const router = express.Router();
const countryServiceSchema = require("../../models/countryServiceModel");
const fs = require('fs');



router.delete('/deleteCountry/:id', async (req, res) => {
    const imageId = req.params.id;
  
    
  
    try {
      const deletedImage = await countryServiceSchema.findByIdAndDelete(imageId);
  
  
      if (!deletedImage) {
        return res.status(404).json({ success: false, message: 'Image not found' });
      }
  
      // Delete image files from the uploads directory
      fs.unlinkSync(path.join(__dirname, `../../../uploads/countryImages/${deletedImage.countryImagePath}`));
      fs.unlinkSync(path.join(__dirname, `../../../uploads/countryImages/${deletedImage.flagImagePath}`));
     
      res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image', error);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  });
  
  module.exports = router;