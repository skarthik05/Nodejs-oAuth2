const { google } = require("googleapis");
const axios = require("axios");
const config = require("../client_secret_971780076149-jah835s27ehcub80uamh063bnd2lkoom.apps.googleusercontent.com.json");
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  `${SERVER_ROOT_URI}/auth/google/callback`
);
function getGoogleAuthURL() {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
}

async function getGoogleUser({ code }) {
  const { tokens } = await oauth2Client.getToken(code);
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return googleUser;
}

module.exports = { getGoogleAuthURL, getGoogleUser };
