const { userProfile } = require('../db/database');
const { VALID_TOKEN } = require('../helpers/authMiddleware');

const login = (req, res) => {
  const { email, password } = req.body;
  if (email === "demo@jstack.co" && password === "Demo@123") {
    return res.json({
      success: true,
      data: {
        accessToken: VALID_TOKEN,
        user: userProfile
      }
    });
  }
  return res.status(401).json({ success: false, message: "Invalid email or password" });
};

const getProfile = (req, res) => {
  res.json({ success: true, data: userProfile });
};

module.exports = {
  login,
  getProfile
};