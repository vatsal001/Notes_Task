const express = require("express");
const router = express.Router();
const userAuth = require("../controller/User.controller");

router.post("/signup", userAuth.signup);
router.post("/login", userAuth.login);
router.post("/refresh", userAuth.refresh);

module.exports = router;
