const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth Failed',
      error: error,
    });
  }
};

module.exports = verifyToken;
