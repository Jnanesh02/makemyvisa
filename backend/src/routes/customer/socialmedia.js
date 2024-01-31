const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");
const Customer = require("../../models/customerSchema");

router.get("/customer/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/customer/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: "/login",
  })
);

router.get("/customer/auth/login/success", (req, res) => {

  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  }
});

router.get("/customer/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// router.get("/customer/auth/logout", (req, res) => {
//   req.logout();
//   res.redirect(process.env.FRONTEND_URL);
// });

router.get("/customer/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  "/customer/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: "/login/failed",
  })
);


router.get("/customer/auth/linkedin", passport.authenticate("linkedin"));

router.get("/customer/auth/linkedin/callback", async (req, res) => {
  try {
    const { code } = req.query;
    const client_id = "786klmvnz0ks2y";
    const client_secret = "0e9gzMlcID9fBeeS";
    const redirect_uri =`${process.env.BACKEND_URL}/customer/auth/linkedin/callback`;

    // Exchange authorization code for access token
    const accessTokenUrl = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`;
    const {
      data: { access_token },
    } = await axios.post(accessTokenUrl);

    if (!access_token) {
      console.error("Access token not found");
      return res.status(400).json({ message: "Access token not found" });
    }

    // Fetch user information using the access token
    const userInfoUrl = "https://api.linkedin.com/v2/userinfo";
    const { data: user_info } = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    const existingUser = await Customer.findOne({
      $or: [
        { email: user_info?.email },
        { "social_media.linkedinId": user_info.sub },
      ],
    });
    
    if (existingUser) {
      if (existingUser.first_name === "") {
        existingUser.first_name = user_info.given_name;
      }
      if (existingUser.last_name === "") {
        existingUser.last_name = user_info.family_name;
      }
      // User already exists, update the Google account information
      existingUser.social_media.linkedinId = user_info.sub;
      await existingUser.save();
      // res.status(200).json({ message: existingUser_id });
      res.redirect('http://localhost:3001/dashboard?userId=' + existingUser._id);
    } else {
      // User does not exist, create a new user account
      const newCustomer = new Customer({
        first_name: user_info.given_Name,
        last_name: user_info.family_name,
        email: user_info.email,
        social_media: {
          linkedinId: user_info.sub,
        },
        phone_number: "",
      });

      await newCustomer.save();

      // res.status(200).json({ message:  newCustomer});
      res.redirect('http://localhost:3001/dashboard?userId=' + newCustomer._id);

    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
router.get("/login", (req, res) => {
  res.status(401).json({
    message: "Login failed",
  });
});

module.exports = router;
