const express = require("express");
const User = require("./user.model");

const { registUser, loginUser, logoutUser } = require("./user.controller");
const auth = require("../middleware/auth");

const router = express.Router();

//regist User
router.post("/userregist", registUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);

module.exports = router;
