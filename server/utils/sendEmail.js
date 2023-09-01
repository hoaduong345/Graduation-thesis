const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


const SendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      db: process.env.DATABASE_URL = "mysql://root:@localhost:3306/buyzzle",
      host: process.env.HOST = "smtp.gmail.com",
      service: process.env.SERVICE = "gmail",
      post: Number(process.env.EMAIL_PORT = 587),
      secure: Boolean(process.env.SECURE = true),
      auth: {
        user: process.env.USER = "vanhoa284@gmail.com",
        pass: process.env.PASS = "rzuylxxihnemvbzm",
      },
    });
    await transporter.sendMail({
      from: process.env.USER = "vanhoa284@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent Successfully");
    next();
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
module.exports = SendEmail;
