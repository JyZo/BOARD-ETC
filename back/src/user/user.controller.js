const bcryptjs = require("bcryptjs");
const { Resend } = require("resend");
require("dotenv").config();

const User = require("./user.model");

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

    if (!process.env.RESEND_API) {
      console.log("Provide RESEND_API in side the .env file");
    }

    const resend = new Resend(process.env.RESEND_API);

    const sendEmail = async (sendTo, subject, html) => {
      try {
        const { data, error } = await resend.emails.send({
          from: "JyZo <qwer@qwer.com>",
          to: sendTo,
          subject: subject,
          html: html,
        });

        if (error) {
          return console.error({ error });
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from JyZo",
      html: `<p>Dear ${name}</p>    
                    <p>Thank you for registering Binkeyit.</p>   
                    <a href=${VerifyEmailUrl} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block"> Verify Email</a> `,
    });

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

module.exports = {
  registUser,
};
