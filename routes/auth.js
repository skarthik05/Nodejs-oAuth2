const { googleLogin, googleCallback } = require("../controllers/auth");

const router = require("express").Router();

router.get("/google/url", googleLogin);
router.get("/google/callback", googleCallback);

module.exports = router;
