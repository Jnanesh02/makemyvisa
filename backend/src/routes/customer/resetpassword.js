const express = require('express');
const router = express.Router();
const customer = require("../../models/customerSchema");
const bcrypt = require("bcrypt");

router.post("/resetpassword/:object_id", async (req, res) => {
  try {
    const { password } = req.body;
    const objectId = req.params.object_id; // Extracting object_id from the route parameters

    // Use objectId to find the user in the database
    const existingUser = await customer.findOne({ _id: objectId });
    const resetPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    existingUser.password = resetPassword;
      await existingUser.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
