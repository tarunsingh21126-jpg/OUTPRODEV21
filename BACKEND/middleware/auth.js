const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (...roles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');

      if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      const token = authHeader.split(' ').filter(Boolean)[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'Token is not valid' });
      }

      req.user = user;

      // 👇 ROLE CHECK
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = auth;