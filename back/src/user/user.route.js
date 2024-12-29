const express = require("express");
const User = require("./user.model");

const { registUser } = require("./user.controller");

const router = express.Router();

//regist User
router.post("/userregist", registUser);

module.exports = router;
