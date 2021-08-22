const jwt = require('jsonwebtoken');

function isLoggedIn(req, res, next) {
  if (req.path.toString().includes('/login')) return next();
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Must be logged in' });
  try {
    const decoded = jwt.verify(token, 'jwtSecret');
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = isLoggedIn;
