const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const Customer = require("../src/models/customerSchema");

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LinkedInStrategyID,
      clientSecret: process.env.LinkedInStrategySecret,
      callbackURL:
        "http://localhost:3000/makemyvisa/customer/auth/linkedin/callback",
      scope: ["openid", "profile", "email"],
      state: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      req.session.accessToken = accessToken;
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "906469634154062",
      clientSecret: "2e3fac2faa368e4c5f9fdf90a9c77fb0",
      callbackURL:
        "http://localhost:3000/makemyvisa/customer/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
      enableProof: true,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GoogleStrategyID,
      clientSecret: process.env.GoogleStrategySecret,
      callbackURL:
        "http://localhost:3000/makemyvisa/customer/auth/google/callback",
      scope: ["profile", "email"],
    },
    // Process Google authentication, create or update user in the database4
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database based on their Google ID
        const existingUser = await Customer.findOne({
          $or: [
            { email: profile.emails ? profile.emails[0].value : null },
            { "social_media.googleId": profile.id },
          ],
        });

        if (existingUser) {
          // User already exists, update the Google account information
          existingUser.social_media.googleId = profile.id;
          await existingUser.save();
          return done(null, existingUser);
        } else {
          // User does not exist, create a new user account
          const newCustomer = new Customer({
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails ? profile.emails[0].value : null,
            social_media: {
              googleId: profile.id,
            },
            phone_number: "default_value_or_handle_appropriately",
          });

          await newCustomer.save();
          return done(null, newCustomer);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


