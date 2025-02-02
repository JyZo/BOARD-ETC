const bcryptjs = require("bcryptjs");
const { Resend } = require("resend");
require("dotenv").config();

const User = require("./user.model");
const { generatedAccessToken } = require("../utils/generatedAccessToken");
const { generatedRefreshToken } = require("../utils/generatedRefreshToken");
const generatedOTP = require("../utils/generatedOTP");

//사용자 등록
const registUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({
        message: "Already register email",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new User(payload);
    const save = await newUser.save();

    return res.json({
      message: "User register successfully",
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

//사용자 로그인
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not register",
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
      });
    }

    //패스워드 암복호화 비교
    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
      });
    }

    //엑세스 토큰, 리프레쉬 토큰 생성
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    //쿠키를 이용한 토큰 관리
    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

//사용자 로그아웃
const logoutUser = async (req, res) => {
  try {
    const userId = req.userId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    //쿠키에서 토큰 제거
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await User.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

//유저 정보 업데이트
const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(userId, {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: hashPassword }),
    });

    return res.json({
      message: "update successfully",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      user: user,
    });
  }
};

//패스워드 찾기
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
      });
    }

    //OTP 생성 및 만료시간 설정
    const otp = generatedOTP();
    const expiredTime = new Date() + 60 * 60 * 1000; //

    const otpUpdate = await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expiredTime).toISOString(),
    });

    //라이브러리 사용한 opt번호 메일 전송 내꺼만 가능
    const resend = new Resend(process.env.RESEND_API);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verify email from Acme",
      html: `<p>${user.name} your otp [${otp}] </p>`,
    });

    if (error) {
      return console.error({ error });
    }

    return res.json({
      message: "Please check your email",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

//OTP 인증
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!email || !otp) {
      return res.status(400).json({
        message: "provide email, otp",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Email not available",
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid otp",
      });
    }

    return res.json({
      message: "OTP verified!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

//비밀번호 초기화
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    console.log(email);
    console.log(newPassword);
    console.log(confirmPassword);

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "provide newPassword, confirmPassword",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: error.message || error,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(500).json({
        message: "newPassword and confirmPassword",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const update = await User.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

//토큰 리프레쉬
const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; /// [ Bearer token]

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "token is expired",
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.json({
      message: "New Access token generated",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  registUser,
  loginUser,
  logoutUser,
  updateUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  refreshToken,
};
