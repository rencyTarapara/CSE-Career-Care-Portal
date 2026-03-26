const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'User role not found, authorization denied' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied. Requires one of roles: ${allowedRoles.join(', ')}` });
    }

    next();
  };
};

module.exports = roleMiddleware;
