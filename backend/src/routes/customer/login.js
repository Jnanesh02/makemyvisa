const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customer = require("../../models/customerSchema");
// const session = require("express-session");
router.post("/customer/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await customer.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    req.session.userId = existingUser._id;
    const token = jwt.sign(
      {
        id: existingUser._id,
        
      },
      "your-secret-key",
      { expiresIn: "7000" }
    );
    res.json({ message: { message: "login successful", token: token } });
    // return res.json({ existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/customer/dashboard", (req, res) => {

  if (!req.session.userId) {
    return res.json({ message: "unauthourised" });
  }
  return res.json({ message: "welcome to dashboard" });
});

module.exports = router;
