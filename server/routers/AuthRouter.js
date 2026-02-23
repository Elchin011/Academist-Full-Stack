const express = require("express");
const router = express.Router();
const { AuthRegister, AuthLogin, changePassword } = require("../controllers/AuthController");
const { authProtectMiddleware } = require("../middleware/authProtectMiddleware");

router.post("/login", AuthLogin);
router.post("/register", AuthRegister);
router.put("/change-password", authProtectMiddleware, changePassword);

module.exports = router;