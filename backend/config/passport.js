const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const { google } = require("googleapis");
const passport = require("passport");
const { OpenAI } = require("openai");

const Customer = require("../src/models/customerSchema");
const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});
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

passport.use(
  new YoutubeV3Strategy(
    {
      clientID:
        "739497392240-i92aop6sbd9mo44tk2a8u3397shp30ag.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        "http://localhost:3000/makemyvisa/customer/auth/youtube/callback",
      scope: [
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/youtube.force-ssl",
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      // Access user's channel details
      const channelId = profile.id;

      // Create a youtube object using OAuth2 tokens
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      const youtube = google.youtube({ version: "v3", auth });

      // Make requests to get user's activities

      // Fetch user's channel details
      youtube.channels.list(
        {
          part: "snippet,contentDetails,statistics",
          id: channelId,
        },
        (err, channelResponse) => {
          if (err) {
            return done(err);
          }

          console.log("User Channel Details:", channelResponse.data);

          // Fetch user's video comments
          youtube.commentThreads.list(
            {
              part: "snippet",
              allThreadsRelatedToChannelId: channelId,
            },
            (err, commentsResponse) => {
              if (err) {
                return done(err);
              }

              const comments = commentsResponse.data.items;

              // Iterate through each comment thread
              comments.forEach(async (comment) => {
                try {
                  // Extract topLevelComment from the snippet
                  const topLevelComment =
                    comment.snippet.topLevelComment.snippet.textDisplay;

                  // Log or process the topLevelComment as needed
                  // Pass the comment to ChatGPT for a short response
                  const chatGPTResponse = await getChatGPTResponse(
                    topLevelComment
                  );

                  // Check if the ChatGPT response is not empty
                  if (chatGPTResponse.trim() !== "") {
                    // Insert the reply using youtube.commentThreads.insert
                    const replyResponse = youtube.commentThreads.insert({
                      auth: auth,
                      part: "snippet",
                      resource: {
                        snippet: {
                          channelId:
                            comment.snippet.topLevelComment.snippet
                              .authorChannelId.value,
                          videoId: comment.snippet.videoId,
                          topLevelComment: {
                            snippet: {
                              textOriginal: chatGPTResponse,
                            },
                          },
                        },
                      },
                    });
                  }
                } catch (error) {
                  console.error(
                    "Error replying to YouTube comment:",
                    error.message
                  );
                }
              });
              // Fetch user's liked videos
              youtube.videos.list(
                {
                  part: "snippet",
                  myRating: "like",
                },
                (err, likedVideosResponse) => {
                  if (err) {
                    return done(err);
                  }

                  console.log("User Liked Videos:", likedVideosResponse.data);

                  // You can add more API requests based on your requirements

                  // Call done() to finish the authentication process
                  done(null, profile);
                }
              );
            }
          );
        }
      );
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Function to interact with ChatGPT and get a short response
async function getChatGPTResponse(comment) {
  const prompt = `User Comment: ${comment}`;
  try {
    const response = await openai.completions.create({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 50,
    });

    if (response && response.choices && response.choices.length > 0) {
      return response.choices[0].text.trim();
    } else {
      console.error("Invalid response format from OpenAI API");
      return "Error: Invalid response format";
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error calling OpenAI API";
  }
}
