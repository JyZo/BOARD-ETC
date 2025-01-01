const express = require("express");
const User = require("./user.model");

const {
  registUser,
  loginUser,
  logoutUser,
  updateUser,
  forgotPassword,
  resetPassword,
  verifyOTP,
  refreshToken,
} = require("./user.controller");
const auth = require("../middleware/auth");

const router = express.Router();

//regist User
router.post("/userregist", registUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.put("/userupdate", auth, updateUser);
router.put("/forgotpassword", forgotPassword);
router.put("/verifyotp", verifyOTP);
router.put("/resetpassword", resetPassword);
router.post("/refresh-token", refreshToken);

module.exports = router;
