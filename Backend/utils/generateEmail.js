require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const GenerateEmail = ({
  email,
  subject,
  message,
  html,
  callback = () => {},
}) => {
  const options = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: subject,
    text: message,
    html: html,
  };
  transporter.sendMail(options, callback);
};

module.exports = { GenerateEmail };
