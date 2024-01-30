const express = require("express");
const router = express.Router();
const customer = require("../../models/customerSchema");
const bcrypt = require("bcrypt");
const validator = require("validator");

router.post("/customer/register", async (req, res) => {
  console.log(req.body);

  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      state,
      country,
      password,
    } = req.body;
    // Validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Weak password. It should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const existingUser = await customer.findOne({
      $or: [{ email: email }, { phone_number: phoneNumber }],
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email already exists." });
      }
      if (existingUser.phone_number === phoneNumber) {
        return res.status(409).json({ message: "Phone number already exists." });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new customer({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      state: state,
      country: country,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "Successfully registered" });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.post('/customer/questionnaires',async(req,res) => {
  try {
    const {email,questionnaire} = req.body;
    console.log(req.body);
    const existingUser = await customer.findOne({ email: email});
    if(!existingUser){
      return res.status(400).json({ message: "user not found" });
    }
    existingUser.questionnaires = questionnaire;
    
    await existingUser.save();
    return res.status(200).json({ message: "Successfully registered" });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
});
module.exports = router;
