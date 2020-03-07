const nodemailer = require("nodemailer");

const credentials = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW
  }
};

const transporter = nodemailer.createTransport(credentials);

async function sendEmail(to, content) {
  const contacts = {
    from: process.env.MAIL_USER,
    to
  };
  const email = { ...contacts, ...content };
  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(`Error sending email ->`, error);
  }
}

module.exports = { send: sendEmail };
