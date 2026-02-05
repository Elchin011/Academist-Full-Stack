const jwt = require("jsonwebtoken");

const getUserFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
};

module.exports = { getUserFromToken };
