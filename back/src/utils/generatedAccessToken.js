const jwt = require("jsonwebtoken");

//엑세스 토큰 생성 및 만료시간 세팅
const generatedAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "5h",
  });

  return token;
};

module.exports = {
  generatedAccessToken,
};
