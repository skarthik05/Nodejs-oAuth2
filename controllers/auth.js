const { getGoogleAuthURL, getGoogleUser } = require("../utils/oauthHandler");

const googleLogin = async (req, res) => {
  try {
    return res.redirect(getGoogleAuthURL());
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong!",
      },
    });
  }
};

const googleCallback = async (req, res) => {
  try {
    const googleUser = await getGoogleUser(req.query);
    let { email, name } = googleUser;
    //db operations
    res.status(200).json({
      msg: "User login successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
};

module.exports = { googleLogin, googleCallback };
