const express = require("express");
const router = express.Router();
const { authProtectMiddleware , adminOnlyMiddleware } = require("../middleware/authProtectMiddleware");

router.get("/", authProtectMiddleware, adminOnlyMiddleware, (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.email}` });
});

module.exports = router;
