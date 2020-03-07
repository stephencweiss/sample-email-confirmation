const { CLIENT_ORIGIN } = require("../../config");

const confirmation = {
  email: id => ({
    subject: "Please Confirm Your Email",
    html: `
    <a href='${CLIENT_ORIGIN}/confirm/${id}'>Click To Confirm!</a>`,
    text: `If the link doesn't work, copy and past this link into your browser: ${CLIENT_ORIGIN}/confirm/${id}`
  })
};

module.exports = { confirmation }
