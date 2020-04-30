import nodemailer from "nodemailer";

import { mailConfig } from "../config/mail";
import { FRONTEND_SERVER } from "../constants/rest";


// Check your messages at https://ethereal.email/ on the test email account
// Credentials are present on mailConfig
const transporter = nodemailer.createTransport(mailConfig);

export const sendVerficationEmail = (id, username, email, registerInfo, code) => {
  let message = {
    from: "Sender Name <sender@example.com>",
    to: "Recipient <recipient@example.com>",
    subject: "Web-prototype Email Verification",
    text: `Hello ${username}! Activate your account here by going to this url: ${FRONTEND_SERVER}/verification/${id}`,
    html: `<p><b>${username}, </b> We have received a request to create a user account for the following role: <br/>
           ${registerInfo.submission} ${registerInfo.permission} <br/>
           from the following individual in your organization: <br/>
           Organization: ${registerInfo.organization} <br/>
           Name: $(registerInfo.program) $(registerInfo.submission) <br/>
           Tel: $(registerInfo.phone) <br/>
           Email: $(registerInfo.email) <br/>
           In order for us to process this access request, we require your approval/rejection through the links we provided. <br/>
           To approve this request, click the link below:<br>
           <a>${FRONTEND_SERVER}/verification/${id}/${code}</a>
           To reject this request, click the link below:<br>
           <a>${FRONTEND_SERVER}/verification/${id}/${code}</a>
          
           Thank you. </p>`
  };

  return transporter.sendMail(message).then((info) => ({ message: `Preview URL: ${nodemailer.getTestMessageUrl(info)}` }));
};