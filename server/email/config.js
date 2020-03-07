const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();
// console.log({env: process.env})

let testAccount;
let transporter;
async function createTransport() {
  testAccount = await nodemailer.createTestAccount();
  const credentials = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, //process.env.MAIL_USER,
      pass: testAccount.pass // process.env.MAIL_PW
    }
  };
  transporter = nodemailer.createTransport(credentials);
}
createTransport();

async function sendEmail(to, content) {
  const contacts = {
    from: testAccount.user, //process.env.MAIL_USER,
    to
  };
  const email = { ...contacts, ...content };
  try {
    let emailInfo = await transporter.sendMail(email);
    console.log(`Email successfully caught by Ethreal.\n Info -> `, emailInfo);
    console.log(`Preview URL -> `, nodemailer.getTestMessageUrl(emailInfo));
  } catch (error) {
    console.error(`Error sending email ->`, error);
    throw new Error(error);
  }
}

module.exports = { sendEmail };
