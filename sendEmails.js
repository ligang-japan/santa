const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});
// send mail with defined transport object
let sendEmails = async (mailOptions) => await transporter.sendMail(mailOptions
);

module.exports = sendEmails;


