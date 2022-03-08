import nodemailer from "nodemailer";
var inLineCss = require("nodemailer-juice");

export const sendEmail = async (to: string, html: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "crispendev@gmail.com", // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
  });
  transporter.use("compile", inLineCss());
  await transporter.sendMail({
    from: '"Cloud Storage" <crispendev@gmail.com>', // sender address
    to,
    subject, // Subject line
    html: html,
    replyTo: "crispendev@gmail.com",
  });
};
