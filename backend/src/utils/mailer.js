const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendLowWaterLevelAlert = async (toEmail, username) => {
  await transporter.sendMail({
    from: `"Mizu Care" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "【水が少ないです】",
    text: `${username}さん、ペットの水がほとんどなくなっています。早めの給水をおすすめします。`,
  });
};

module.exports = { sendLowWaterLevelAlert };
