function requireRole(...allowedRoles) {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // console.log("role :", req.user.role.name)

    if (!allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();
  };
}

module.exports = requireRole;