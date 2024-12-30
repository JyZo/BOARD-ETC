const bcryptjs = require("bcryptjs");
const { Resend } = require("resend");
require("dotenv").config();

const User = require("./user.model");
const { generatedAccessToken } = require("../utils/generatedAccessToken");
const { generatedRefreshToken } = require("../utils/generatedRefreshToken");

const registUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.json({
        message: "Already register email",
        error: true,
        success: false,
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

    // if (!process.env.RESEND_API) {
    //   console.log("Provide RESEND_API in side the .env file");
    // }

    // const resend = new Resend(process.env.RESEND_API);

    // const VerifyEmailUrl = `https://comic.naver.com/webtoon/list?titleId=131385`;

    // console.log(email);

    // const { data, error } = await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: email,
    //   subject: "Verify email from JyZo",
    //   html: `<p>Dear ${name}</p>
    //                 <p>Thank you for registering Binkeyit.</p>
    //                 <a href=${VerifyEmailUrl} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block"> Verify Email</a> `,
    // });

    // if (error) {
    //   return console.error({ error });
    // }

    // console.log(data);

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    console.log(accessToken);
    console.log(refreshToken);

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
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

const logoutUser = async (req, res) => {
  try {
    const userId = req.userId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await User.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
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
};
