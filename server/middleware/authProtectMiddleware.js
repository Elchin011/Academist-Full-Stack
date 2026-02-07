const { getUserFromToken } = require("../utils/authUtils");


const authProtectMiddleware = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  console.log("Auth token received:", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const user = getUserFromToken(token);
  console.log("Decoded user from token:", user);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
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
