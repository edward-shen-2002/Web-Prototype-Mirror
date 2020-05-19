import nodemailer from "nodemailer";

import { mailConfig } from "../config/mail";
import { FRONTEND_SERVER } from "../constants/rest";


// Check your messages at https://ethereal.email/ on the test email account
// Credentials are present on mailConfig
const transporter = nodemailer.createTransport(mailConfig);

export const sendVerficationEmail = (id, username, email) => {
  let message = {
    from: "Sender Name <sender@example.com>",
    to: "Recipient <recipient@example.com>",
    subject: "Web-prototype Email Verification",
    text: `Hello ${username}! Activate your account here by going to this url: ${FRONTEND_SERVER}/verification/${id}`,
    html: `<p><b>Hello ${username}</b> Activate your account here by going to this url: <a>${FRONTEND_SERVER}/verification/${id}</a></p>`
  };

  return transporter.sendMail(message).then((info) => ({ message: `Preview URL: ${nodemailer.getTestMessageUrl(info)}` }));
};