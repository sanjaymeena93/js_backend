const VALID_TOKEN = "mock_access_token_123";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token || token !== VALID_TOKEN) {
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized access: Invalid or missing token" 
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  VALID_TOKEN
};