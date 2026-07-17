const express = require("express");
const Auth = require("../controller/authController");
const router = express.Router();
router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.post("/refresh", Auth.refresh);
router.post("/logout", Auth.logout);module.exports = router;