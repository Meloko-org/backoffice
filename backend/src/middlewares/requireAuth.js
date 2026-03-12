const User = require("../models/User");

async function requireAuth(req, res, next) {

  const { userId } = req.auth();

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ clerkUUID: userId }).populate("role");

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;

  next();
}

module.exports = requireAuth;
