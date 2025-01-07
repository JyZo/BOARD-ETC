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

//사용자 등록
router.post("/userregist", registUser);

// 로그인
router.post("/login", loginUser);

// 로그아웃
router.get("/logout", auth, logoutUser);

//사용자 정보 업데이트
router.put("/userupdate", auth, updateUser);

//비밀번호 찾기
router.put("/forgotpassword", forgotPassword);

//OTP 인증
router.put("/verifyotp", verifyOTP);

//비밀번호 변경
router.put("/resetpassword", resetPassword);

//토큰 초기화
router.post("/refresh-token", refreshToken);

module.exports = router;
