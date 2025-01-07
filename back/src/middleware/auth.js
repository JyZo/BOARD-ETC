const jwt = require("jsonwebtoken");

//사용자 토큰 미들웨어 토큰 인증
const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
      });
    }

    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "You have not login",
      error: true,
      success: false,
    });
  }
};

module.exports = auth;
