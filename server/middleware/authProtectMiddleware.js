const { getUserFromToken } = require("../utils/authUtils");


const authProtectMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  console.log("Auth token received:", token);

  const user = getUserFromToken(token);
  console.log("Decoded user from token:", user);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.user = user;
  next();
};

const adminOnlyMiddleware = (req, res, next) => {

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }
  next();
};

module.exports = {
  authProtectMiddleware,
  adminOnlyMiddleware,
};
