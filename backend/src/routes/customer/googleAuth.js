const express = require('express');
const router = express.Router();
const { OAuth2Client, auth } = require('google-auth-library');

const clientId = '118351285127-fqdijm4cfmj778ogq1toc4bhnkl065c2.apps.googleusercontent.com';
const clientSecret = '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';  // Replace with your actual client secret
const redirectUri = 'http://localhost:3000/makemyvisa/customer/auth/google/callback';

router.get('/googleauth', (req, res) => {
    try {
        console.log('Request received for Google authentication');
    
        const oauth2Client = new OAuth2Client({
          clientId: clientId,
          clientSecret: clientSecret,
          redirectUri: redirectUri,
        });
    
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'online',
          scope: ['profile', 'email'],
          prompt: 'consent',
        });
    console.log(authUrl);
        res.json({ authUrl });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});



module.exports = router;
