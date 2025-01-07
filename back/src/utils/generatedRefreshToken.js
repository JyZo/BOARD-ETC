const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

//리프레쉬 토큰 생성
const generatedRefreshToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  const updateRefreshTokenUser = await User.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    }
  );

  return token;
};

module.exports = {
  generatedRefreshToken,
};
