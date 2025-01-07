//랜덤 OTP 생성
const generatedOTP = () => {
  return Math.floor(Math.random() * 900000) + 100000; /// 100000 to 999999
};
module.exports = generatedOTP;
