const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2({
  clientId: '224789670568-395udpl9qmhc90rr0vo6hh6uko52qnls.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'http://localhost:4500/auth/google/callback',
});

module.exports = oauth2Client;