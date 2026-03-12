function requireAdmin(req, res, next) {

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const roleName = req.user.role.name;

  if (roleName !== "admin" && roleName !== "super-admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
}

module.exports = requireAdmin;
