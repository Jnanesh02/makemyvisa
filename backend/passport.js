// passport.js
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const Customer = require("./src/models/customerSchema");


const LINKEDIN_CLIENT_ID = "786klmvnz0ks2y";
const LINKEDIN_CLIENT_SECRET = "0e9gzMlcID9fBeeS";


// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/makemyvisa/customer/auth/google/callback`,
      scope: ['profile', 'email'],
    },
    async function(accessToken, refreshToken, profile, done) {
    console.log("success");
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
          return done(null, existingUser._id);
        } else {
          // User does not exist, create a new user account
          const newCustomer = new Customer({
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails ? profile.emails[0].value : null,
            social_media: {
              googleId: profile.id,
            },
            phone_number: "000000000",
          });

          await newCustomer.save();
          return done(null, newCustomer._id);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// LinkedIn Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/makemyvisa/customer/auth/linkedin/callback",
      scope: ['openid', 'profile', 'email'],
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

// // Facebook Strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:3000/makemyvisa/customer/auth/facebook/callback",
//       scope: ['public_profile', 'email'],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  // Serialize user by sending only necessary data
  done(null, user.toString()); // Convert ObjectId to string
});

passport.deserializeUser(async (id, done) => {
  try {
    const googleUser = await Customer.findById(id);

    // Send only specific data, for example, the user's email
    const serializedUser = {
      userid: googleUser._id,
      // Add other fields you want to include
    };

    done(null, serializedUser);
  } catch (error) {
    done(error, null);
  }
});


module.exports = passport;
