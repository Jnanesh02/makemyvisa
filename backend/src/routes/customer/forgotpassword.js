const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const customer = require("../../models/customerSchema");
router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await customer.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (
      existingUser.password === "" ||
      existingUser.password === undefined ||
      existingUser.password === null
    ) {
      if (
        existingUser.social_media.googleId !== "" ||
        existingUser.social_media.linkedinId !== ""
      ) {
        return res
          .status(400)
          .json({ message: "Previously logged-in with socialMedia" });
      }
    }
    // const resetLink =
    //   "https://4f14-2406-b400-d5-e534-1d42-f4a5-faee-8d9e.ngrok-free.app";
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "manihari800@gmail.com",
    //     pass: "nbhm mpcb rsxh xvye",
    //   },
    // });
    // const mailOptions = {
    //   to: email,
    //   subject: "Password Reset",
    //   text: `Click the following link to reset your password:${resetLink}`,
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return res.status(500).json({ message: "Error sending email" });
    //   }
    //   res.json({ message: "Password reset email sent" });
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
